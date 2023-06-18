<template>
  <div class="vhod-container">
    <h2 class="input-label">Введите сюда кадастровые номера:</h2>
    <input type="text" class="input-field" placeholder="23:43:0302015:5754;23:43:0302015:5754">
    <button class="generate-button" @click="generateResult">Генерация результата</button>
    <div v-if="isLoading" class="loader">
      <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loader" class="loader-image" />
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="result-container" v-if="result">
      <ResultDiv :properties="result" />
    </div>
  </div>
</template>


<script>
import ResultDiv from './ResultDiv.vue';

export default {
  components: {
    ResultDiv
  },
  data() {
    return {
      isLoading: false,
      result: null,
      error: null
    };
  },
  methods: {
    generateResult() {
      const inputField = document.querySelector('.input-field');
      const kadastrovyyKod = inputField.value;

      this.isLoading = true;
      this.result = null;
      this.error = null;

      fetch('http://46.229.215.8:8000/get_analys_by_cadstre_list', {
        method: 'POST',
        body: JSON.stringify({ kadastrovyyKod }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.isLoading = false;
          this.result = data;
        })
        .catch(error => {
          this.isLoading = false;
          this.error = 'Произошла ошибка. Пожалуйста, повторите попытку.';
          console.error(error);
        });
    },
    calculateChartWidth(value) {
      return `${value / 10}px`;
    }
  }
};
</script>



<style>
.generate-button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: linear-gradient(#303030, #454545, #303030);
  /* Update the gradient colors */
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #000000;
  background-color: #FFFFFF;
  margin-top: 10px;
  /* Update the text color to white */
}

.vhod-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  background: linear-gradient(#53193a, #4f173d, #340f28, #65184a); /* Update the gradient colors */
  background-size: 200% 200%;
  animation: gradientAnimation 10s infinite alternate;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

/* Стилизация полосы прокрутки для WebKit (Chrome, Safari) */
::-webkit-scrollbar {
  width: 10px; /* Ширина полосы прокрутки */
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Цвет фона полосы прокрутки */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* Цвет полосы прокрутки */
  border-radius: 5px; /* Радиус скругления полосы прокрутки */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Цвет полосы прокрутки при наведении курсора */
}

.result-container {
  margin-top: 20px;
  max-height: 70vh;
  /* Adjust this value to your preference */
  overflow: auto;
}

.input-label {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  color: #FFFFFF;
  /* Set the text color to white */
  text-align: center;
  margin-bottom: 10px;
}

.input-field {
  width: 400px;
  height: 50px;
  font-size: 1.5rem;
  color: #000000;
  border-radius: 4px;
  outline: none;
  /* Set the text color to white */
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  /* Update the background color to a darker shade */
  z-index: 999;
  transition: opacity 0.3s;
  animation: fadeIn 0.3s ease-in-out;
  /* Add fade-in animation */
}

.loader-image {
  width: 100px;
  height: 100px;
}

.result {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #FFFFFF;
  /* Set the text color to white */
}

.error-message {
  margin-top: 10px;
  color: red;
}

table {
  margin-top: 10px;
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
  color: #000000;
  /* Set the text color to white */
}</style>

