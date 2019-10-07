<template>
  <div id="app">
    <Logo />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from './components/Logo.vue';

export default Vue.extend({
  name: 'app',
  components: {
    Logo,
  },
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
