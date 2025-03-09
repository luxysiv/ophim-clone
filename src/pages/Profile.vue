<template>
  <div class="content">
    <div class="header_content">
      <van-image
        round
        fit=cover
        width="10rem"
        height="10rem"
        :src="require('@/assets/avt.jpg')"
      />
      <br>
      <van-highlight :keywords="keywords" source-string="Mình là Nguyễn Dương, Chào mừng bạn đến với website của mình" />
    </div>
    <div class="section_content">
      <van-row justify="center">
        <van-col span="24">
          <van-button color="linear-gradient(to right, #3b5998, #4267b2)" type="primary" size="large" url="https://www.facebook.com/duongitbg01"> 
           <img src="@/assets/facebook.png" alt="Facebook" style="width: 20px; height: 16px; margin-right: 5px;" />
            Facebook
          </van-button>
        </van-col>
      </van-row>
      <van-row justify="center">
        <van-col span="24">
          <van-button color="linear-gradient(to right, #BC2A8D, #CD486B)" type="primary" size="large" url="https://www.instagram.com/duongbg01">
          <img src="@/assets/instagram.png" alt="Facebook" style="width: 16px; height: 16px; margin-right: 5px;" />
          Instagram
          </van-button>
        </van-col>
      </van-row>
      <van-row justify="center">
        <van-col span="24">
          <van-button color="linear-gradient(to right, #cd201f, #F40083)" type="primary" size="large" url="https://youtu.be/f0gi7UG1L0w">
          <img src="@/assets/youtube.png" alt="Facebook" style="width: 20px; height: 20px;  margin-right: 5px;" />
          Youtube
          </van-button>
        </van-col>
      </van-row>
      <van-row justify="center">
        <van-col span="24">
          <van-button color="linear-gradient(to right, #14120D, #0078FF)" type="primary" size="large" url="https://www.tiktok.com/@duonghh01">
            <img src="@/assets/tiktok.png" alt="Facebook" style="width: 20px; height: 20px; margin-right: 5px;" />
            Tiktok
            </van-button>
        </van-col>
      </van-row>
      <van-row justify="center">
        <van-col span="24">
          <van-button color="linear-gradient(to right, #00405d, #6C73A5)" type="primary" size="large" url="https://github.com/Duong01/Duong01">
          <img src="@/assets/github.png" alt="Facebook" style="width: 20px; height: 20px; margin-right: 5px;" />
          Github
          </van-button>
        </van-col>
      </van-row>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data(){
    return{
      
    }
  }
};
</script>

<style scoped>
.van-row {
  padding: 30px 10px;
}
.notice-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>