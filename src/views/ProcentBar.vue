<template>
    <div class="progress-bar">
        <div class="progress-bar-background"></div>
        <div :style="progressBarStyle" class="progress-bar-fill"></div>
    </div>
</template>

<script>
export default {
    props: {
        percentage: {
            type: Number,
            required: true,
            validator: (value) => value >= 0 && value <= 100,
        },
    },
    computed: {
        progressBarStyle() {
            const percentage = this.percentage;
            const width = `${percentage}%`;

            const gradientStartColor = '#FFA500'; // Оранжевый (0%)
            const gradientEndColor = '#00FF00'; // Зеленый (100%)
            const gradientColors = `${gradientStartColor}, ${gradientEndColor}`;

            return {
                width,
                background: `linear-gradient(to right, ${gradientColors} ${width}, rgba(0, 0, 0, 0) ${width})`,
                borderRadius: '10px',
            };
        },
    },
};
</script>

<style scoped>
.progress-bar {
    width: 300px;
    height: 20px;
    position: relative;
    border-radius: 10px;
}

.progress-bar-background {
    width: 100%;
    height: 100%;
    background-color: rgba(113, 110, 110, 0.501);
    border-radius: 10px;
}

.progress-bar-fill {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
}
</style>
