<template>
<van-config-provider :theme="theme">
  <van-switch v-model="checked"  @change="changeTheme"  active-color="#dcdee0" inactive-color="#630202">
  <template #node>
      <div class="icon-wrapper">
        <img 
          :src="checked ? require('@/assets/iconsun.png') : require('@/assets/iconMoon.png')" 
          alt="icon" 
          class="custom-icon"
        />
      </div>
    </template>
</van-switch>
<van-divider></van-divider>
<audio ref="backgroundMusic" :src="musicSrc" autoplay loop></audio>
<img src="@/assets/biu.jpg" alt="">
<van-highlight :keywords="keywords" source-string="Trang đang được phát triển, vì vậy hãy chú ý theo dõi" />
</van-config-provider>

</template>

<script>
export default {
  name: "SettingPage",
  data(){
    return{
      checked:  localStorage.getItem("theme") === "light",
      musicSrc: require("../assets/music.mp3")
    }
  },
  created(){
    
  },
  methods: {
    changeTheme() {
      const newTheme = this.checked ? "light" : "dark";
      this.$emit("update-theme", newTheme);
      location.reload()
    },
  },
  watch: {
    checked(newVal) {
      this.theme = newVal ? "light" : "dark";
      localStorage.setItem('theme', this.theme)
    },
  },
  computed:{
    
  }
};
</script>

<style scoped>
  .custom-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

 
</style>