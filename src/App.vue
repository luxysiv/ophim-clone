<template>
  <v-theme-provider class="pa-10" :theme="theme" with-background>
    <v-app id="app" :style="{ color: theme === 'dark' ? 'white' : 'black' }">
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      theme: localStorage.getItem('theme') || 'dark'
    }
  },
   provide() {
    return {
      currentTheme: () => this.theme,
      setTheme: this.setTheme
    }
  },
  watch: {
    theme(newVal) {
      localStorage.setItem('theme', newVal)
    }
  },
  methods: {
    setTheme(newTheme) {
      this.theme = newTheme
    }
  }
}
</script>

<style>
#app {
  font-family: "Roboto Medium",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
