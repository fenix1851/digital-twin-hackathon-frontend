<template>
    <div class="donut-chart">
        <div class="chart-container">
            <div class="chart-circle" :style="circleStyle"></div>
            <div class="chart-inner-circle"></div>
        </div>
        <div class="chart-labels">
            <div v-for="(value, index) in values" :key="index" class="chart-label">
                <div class="chart-color" :style="{ background: getColor(index) }"></div>
                <span>{{ getLabel(index) }} ({{ values[index] }})</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        values: {
            type: Array,
            required: true,
            validator: (value) => value.every((val) => val >= 0 && val <= 100),
        },
        labels: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        circleStyle() {
            const angles = this.calculateAngles();
            const gradients = this.createGradients(angles);

            return {
                background: `conic-gradient(${gradients})`,
            };
        },
    },
    methods: {
        calculateAngles() {
            const total = this.values.reduce((sum, value) => sum + value, 0);
            let startAngle = 0;

            return this.values.map((value) => {
                const angle = (value / total) * 360;
                const endAngle = startAngle + angle;
                const angles = `${startAngle}deg ${endAngle}deg`;
                startAngle = endAngle;
                return angles;
            });
        },
        createGradients(angles) {
            const gradients = [];

            for (let i = 0; i < this.values.length; i++) {
                const angle = angles[i];
                const color = this.getColor(i);
                gradients.push(`${color} ${angle}`);
            }

            return gradients.join(', ');
        },
        getColor(index) {
            const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#95a5a6'];
            return colors[index % colors.length];
        },
        getLabel(index) {
            if (index < this.labels.length) {
                return `${this.labels[index]}: `;
            }
            return `Value ${index + 1}: `;
        },
    },
};
</script>

<style scoped>
.donut-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.chart-container {
    position: relative;
    width: 200px;
    height: 200px;
}

.chart-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 50%;
}

.chart-inner-circle {
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    background: #fff;
    border-radius: 50%;
}

.chart-labels {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.chart-label {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.chart-color {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%;
}
</style>
