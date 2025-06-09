<template>
  <v-theme-provider :theme="theme" with-background>
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
  mounted(){
    const loginTime = localStorage.getItem("loginTimestamp");
    if (loginTime) {
    const now = Date.now();
    const diff = now - Number(loginTime);
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff > oneDay) {
      localStorage.removeItem("name");
      localStorage.removeItem("loginTimestamp");
      // Nếu cần, xóa luôn thông tin trong Vuex store:
      this.$store.commit("setEmpInfor", null);
    }
  }
  },
  watch: {
    theme(newVal) {
      localStorage.setItem('theme', newVal)
    }
  },
  created() {
  const expireAt = localStorage.getItem("expireAt");
  const now = new Date().getTime();

  if (expireAt && now > parseInt(expireAt)) {
    // Đã hết hạn → xóa dữ liệu
    localStorage.removeItem("name");
    localStorage.removeItem("expireAt");
    this.$store.commit("setEmpInfor", null);

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
