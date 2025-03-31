<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import vi from 'element-plus/dist/locale/vi.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import cn from 'element-plus/dist/locale/zh-cn.mjs'
import { getLanguage, setLanguage } from "@/utils/cookies";
export default {
  name: "HeaderComponent",
  data() {
    return {
      searchQuery: '',
      curElLang: "", // current Lang i18n for Element plus
      curLang: "", //current lang i18n for system
      genres: [
        { name: this.$t('Hành động'), path: 'hanh-dong' },
        { name: this.$t('Cổ trang'), path: 'co-trang' },
        { name: this.$t('Chiến tranh'), path: 'chien-tranh' },
        { name: this.$t('Tình cảm'), path: 'tinh-cam' },
        { name: this.$t('Hài hước'), path: 'hai-huoc' },
        { name: this.$t('Âm nhạc'), path: 'am-nhac' },
        { name: this.$t('Học đường'), path: 'hoc-duong' }
      ],
      countries: [
        { name: this.$t('Trung Quốc'), path: 'trung-quoc' },
        { name: this.$t('Hàn Quốc'), path: 'han-quoc' },
        { name: this.$t('Nhật Bản'), path: 'nhat-ban' },
        { name: this.$t('Thái Lan'), path: 'thai-lan' },
        { name: this.$t('Ấn Độ'), path: 'an-do' },
        { name: this.$t('Anh'), path: 'anh' }
      ],
      languages: [
        { name: "Tiếng việt", title: "vi-VN" },
        { name: "English", title: "en-US" },
        { name: "中国", title: "zh-CN" },
      ]
    };
  },
  methods: {
    searchMovie() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: "SearchMovie", query: { keyword: this.searchQuery } });
      }
    },
    changeLanguage(keyLang) {
        this.curLang = keyLang;
        this.ChangeLang();
    },
    ChangeLang() {
        switch (this.curLang) {
            case "en-US": 
              this.curElLang = en; 
              break;
            case "vi-VN": 
              this.curElLang = vi; 
              break;
            case "zh-CN": 
              this.curElLang = cn; 
              break;
            default:
                this.curElLang = vi;
                break;
        }
        if (this.curLang) {
            this.$i18n.locale = this.curLang
            // Cookie
            setLanguage(this.curLang)
            // i18n store
            this.$store.state.curi18n.curLang = this.curLang
            this.$store.state.curi18n.curElLang = this.curElLang
        }

    },
    InitLang() {
        let currLang = getLanguage();
        this.curLang = currLang ? currLang : "vi-VN";
        this.ChangeLang();
    },
  },
  created() {
    this.InitLang(); // Initialize language when the component is created
  },
};
</script>

<style scoped>
.custom-navbar {
  background: linear-gradient(to right, #242424, #444);
  padding: 10px 20px;
}

.logo {
  height: 40px;
}

.search-form {
  margin-right: 15px;
}

@media (max-width: 768px) {
  .search-form {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
