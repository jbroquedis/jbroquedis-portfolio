// App.vue - Main application component

<template>
  <ambient-terrain />
</template>

<script>
import AmbientTerrain from './components/AmbientTerrain.vue';

export default {
  name: 'App',
  components: {
    AmbientTerrain
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>