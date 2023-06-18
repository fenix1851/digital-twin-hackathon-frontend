<template>
    <div>
        <div ref="mapContainer" style="height: 400px;"></div>
    </div>
</template>

<script>
export default {
    props: {
        points: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    mounted() {
        window.initMap = this.initMap.bind(this);
        this.initMap();
    },
    methods: {

        initMap() {
            const map = new window.google.maps.Map(this.$refs.mapContainer, {
                center: { lat: 45.0250652, lng: 38.9750814 },
                zoom: 13,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [
                            {
                                "invert_lightness": true
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 50
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ],
                streetViewControl: false,
            });
            map.addListener("click", (event) => {
                this.$emit('clickOnMap');
            });

            const markers = this.points.map((point) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: point.lat, lng: point.lng },
                    map,
                    title: point.name
                });

                const circle = new window.google.maps.Circle({
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 0.3,
                    strokeWeight: 2,
                    fillColor: '#FFFFFF',
                    fillOpacity: 0.15,
                    map,
                    center: { lat: point.lat, lng: point.lng },
                    radius: 750, // Radius in meters
                });

                return marker;
            });
        }
    }
};
</script>

<style scoped>
.mapContainer {
    height: 100%;
    width: 100%;
}
</style>
