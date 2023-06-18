<template>
    <div class="wrapper">
        <div ref="mapContainer" style="height: 400px;"></div>
        <h1 class="label-point" v-if="!selectedPoint">Выберите точку на карте</h1>
        <div v-if="isLoading" class="loader">
            <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loader" class="loader-image" />
          </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        
        <div class="result-container" v-if="result">
          <ResultDiv  @generate-example="handleGenerateExample" :photoUrls="photoUrls" :properties="result" />
        </div>

    </div>
</template>

<script>
import ResultDiv from './ResultDiv.vue';

export default {
    components: {
        ResultDiv,
    },
    data() {
        return {
            selectedPoint: null,
            map: null,
            marker: null,
            isLoading: false,
            error: null,
            result: null,
            photoUrls: {},

        };
    },
    mounted() {
        window.initMap = this.initMap;
        if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
            document.head.appendChild(script);
        } else {
            this.initMap();
        }
    },
    methods: {
        handleGenerateExample(data) {
            let unique_id = data.unique_id;
            console.log(unique_id);
            this.isLoading = true;
            this.error = null;
            // получить фото с котиком
            let API_KEY = 'nAytUPMXhmmG1zdgySwsFW35YuVasrhQINRZrHxToPRqrATMAXZqkBRtEotA'
            fetch('http://46.229.215.8:8000/get_photo_url_by_prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "prompt": "Mall in city view from side of the road, ecobrutalism style.",
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let photoUrl = data
                    if (!this.photoUrls[unique_id]) {
                        this.photoUrls[unique_id] = [];
                    }
                    this.photoUrls[unique_id].push(photoUrl);
                    console.log(this.photoUrls);
                    // rerender result div
                    this.result = { ...this.result };
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                    this.error = 'Произошла ошибка при получении данных';
                }).finally(() => {
                    this.isLoading = false;
                });
        },
        initMap() {
            this.map = new window.google.maps.Map(this.$refs.mapContainer, {
                center: { lat: 45.0250652, lng: 38.9750814 },
                zoom: 13,
                styles: [
                    // Кастомные стили карты
                    {
                        featureType: "all",
                        elementType: "all",
                        stylers: [
                            { invert_lightness: true },
                            { saturation: -100 },
                            { lightness: 50 },
                            { gamma: 1 },
                        ],
                    },
                    {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }],
                    },
                ],
                streetViewControl: false,
            });

            this.map.addListener("click", (event) => {
                this.clearMap(); // Очистка карты
                this.selectedPoint = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                };
                this.marker = new window.google.maps.Marker({
                    position: this.selectedPoint,
                    map: this.map,
                });
                this.sendCoordinates(); // Отправка координат на сервер
            });
        },
        clearMap() {
            if (this.marker) {
                this.marker.setMap(null); // Удаление маркера
                this.marker = null;
            }
            // Удаление других элементов с карты
            // Например:
            this.map.data.forEach(feature => {
              this.map.data.remove(feature);
            });
            this.map.data.setStyle({}); // Сброс стилей объектов

            this.selectedPoint = null;
        },
        sendCoordinates() {
            if (this.selectedPoint) {
                // Очистка карты перед отправкой новых координат
                
                // Отправка запроса на сервер с выбранными координатами
                const { lat, lng } = this.selectedPoint;
                this.isLoading = true;
                this.error = null;
                this.result = null;
                console.log(`Отправка координат на сервер: lat=${lat}, lng=${lng}`);
                fetch('http://46.229.215.8:8000/get_analys_by_coords', {
                    method: 'POST',
                    body: JSON.stringify({
                        x: lat,
                        y: lng
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (!data || !data['scoring']) {
                            this.error = 'По этой точке нет данных. Пожалуйста, выберите другую точку.';
                            return;
                        }
                        this.isLoading = false;
                        this.result = {
                            '1': data
                        }
                    })
                    .catch(error => {
                        this.isLoading = false;
                        this.error = 'Произошла ошибка. Пожалуйста, повторите попытку.';
                        console.error(error);
                    }).finally(() => {
                        this.isLoading = false;
                        this.clearMap();
                    });
            }
        },

    },
};
</script>

<style scoped>
.wrapper {
    padding-top: 20px;
    width: 100%;
  height: 100vh;
  background: linear-gradient(#53193a, #4f173d, #340f28, #65184a);
  /* Update the gradient colors */
  background-size: 200% 200%;
  animation: gradientAnimation 10s infinite alternate;
  overflow: auto;
}

.result-container {
    margin-top: 20px;

}
.photo-galery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
}
.photo {
    width: 200px;
    height: 200px;
    margin: 10px;
    border-radius: 10px;
}
.label-point {
    color: white;
    text-align: center;
    margin-top: 20px;
}

</style>
