<template>
    <div class="container">
        <div v-for="(property, key) in properties" :key="key" class="property-card">
            <h3 class="property-address">{{ property.address }}</h3>

            <div v-if="property.scoring.commercial_percentage" class="property-commercial-points">
                <p>Коммерческие очки: {{ property.scoring.commercial_percentage }}</p>
                <procent-bar :percentage="property.scoring.commercial_percentage"></procent-bar>
            </div>

            <div v-if="property.scoring.social_percentage" class="property-social-points">
                <p>Социальные очки: {{ property.scoring.social_percentage }}</p>
                <procent-bar :percentage="property.scoring.social_percentage"></procent-bar>
            </div>

            <div v-if="property.scoring.suggest === 'Торговый центр'">
                <img src="https://www.pngall.com/wp-content/uploads/8/Silhouette-Shopping-Mall-PNG-Clipart.png"
                    alt="Торговый центр" class="suggest-icon" />
                <p class="suggest-description">
                    Рекомендуется размещение торгового центра, исходя из высокого уровня трафика и высокой социальной
                    активности в этом районе.
                </p>
            </div>
            <div v-if="property.scoring.suggest === 'Развлекательный центр'">
                <img src="https://cdn.icon-icons.com/icons2/2223/PNG/512/mall_shopping_mal_shopping_center_buildings_icon_134434.png"
                    alt="Развлекательный центр" class="suggest-icon" />
                <p class="suggest-description">
                    Рекомендуется размещение развлекательного центра, исходя из высокого уровня трафика и высокой социальной
                    активности в этом районе.
                </p>
            </div>
            <div v-if="property.scoring.suggest === 'Магазин'">
                <img src="https://cdn-icons-png.flaticon.com/512/209/209463.png" alt="Магазин" class="suggest-icon" />
                <p class="suggest-description">
                    Рекомендуется размещение магазина, исходя из умеренного уровня трафика и средней социальной активности в
                    этом районе.
                </p>
            </div>
            <div v-if="property.scoring.suggest === 'Кафе'">
                <img src="https://cdn-icons-png.flaticon.com/512/5690/5690089.png" alt="Кафе" class="suggest-icon" />
                <p class="suggest-description">
                    Рекомендуется размещение кафе, исходя из умеренного уровня трафика и средней социальной активности в
                    этом районе.
                </p>
            </div>
            <div v-if="property.scoring.suggest === 'Жилой дом'">
                <img src="https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png" alt="Жилой дом"
                    class="suggest-icon" />
                <p class="suggest-description">
                    Рекомендуется размещение жилого дома, исходя из низкого уровня трафика и высокой социальной активности в
                    этом районе.
                </p>
            </div>

            <DonutChart :values="[property.scoring.traffic_distribution.commercial_traffic, property.scoring.traffic_distribution.social_traffic]"  :labels="['Коммерческий трафик', 'Социальный трафик']"></DonutChart>

            <h3 class="nearby-objects-title">Ближайшие объекты:</h3>
            <table class="nearby-objects-table">
                <thead>
                    <tr>
                        <th>Тип объекта</th>
                        <th>Еженедельные посетители</th>
                        <th>Коммерческие очки</th>
                        <th>Социальные очки</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(object, type) in property.nearby_objects" :key="type">
                        <td>{{ type }}</td>
                        <td>{{ object.weekly_visitors }}</td>
                        <td>{{ object.commercial_points }}</td>
                        <td>{{ object.social_points }}</td>
                        <td>{{ object.count }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="property.coordinates" class="property-coordinates">
                <p>Широта: {{ property.coordinates.latitude }}</p>
                <p>Долгота: {{ property.coordinates.longitude }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProcentBar from './ProcentBar.vue';
import DonutChart from './DonutChart.vue';

export default {
    props: {
        properties: {
            type: Object,
            required: true,
        },
    },
    components: {
        ProcentBar,
        DonutChart,
    },
};
</script>

<style scoped>
.suggest-icon {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: #ecf0f1;
    background-color: rgba(85, 85, 85, 0.328);
    border-radius: 10px;
}

.property-card {
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
}

.property-address {
    font-size: 20px;
    margin-bottom: 10px;
    color: #ecf0f1;
}

.property-coordinates p {
    margin: 5px 0;
    color: #ecf0f1;
}

.nearby-objects-title {
    margin-top: 20px;
    font-size: 18px;
}

.nearby-objects-table {
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
}

.property-social-points {
    margin-top: 10px;
    margin-bottom: 5px;
}

.property-commercial-points {
    margin-top: 10px;
    margin-bottom: 5px;
}

.nearby-objects-table th,
.nearby-objects-table td {
    padding: 5px;
    border: 1px solid #ecf0f1;
    color: #ecf0f1;
}</style>
