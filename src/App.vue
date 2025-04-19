<template>
  <v-app id="app">
    <v-main>
      <router-view />
      <el-backtop :right="100" :bottom="100" />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Roboto Medium",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #333;
}
</style>
