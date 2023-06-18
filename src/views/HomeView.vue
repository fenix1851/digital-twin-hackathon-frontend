<template>
  <div class="container">
    <div class="logo">
      <h1 class="logo-title">КОСМОС</h1>
    </div>
    <router-link to="/main" custom v-slot="{ navigate }">
      <button class="login-button" @click="navigate" role="link">
        Войти
      </button>
    </router-link>
  </div>
</template>
<script>
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(#d97bb1, #a8518c, #852d68, #65184a);
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

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-title {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
}

.login-button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #eaeaea;
  transform: scale(1.05);
  transition: background-color 0.3s, transform 0.3s;
}</style>