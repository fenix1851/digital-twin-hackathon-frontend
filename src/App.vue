<template>
  <router-view />
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  
}

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
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

.photo {
    transition: transform 0.5s;
    
}

.photo:hover {
    transform: scale(3.3);
    z-index: 1000;
}
</style>
