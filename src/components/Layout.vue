<template>
  <div>
    <!-- Header (Thanh điều hướng) -->
    <header>
      <header-component />
    </header>

    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar (Tuỳ chọn) -->
        <aside class="col-md-3">
          <sidebar-component />
        </aside>

        <!-- Main Content -->
        <main class="col-md-9">
          <slot />
        </main>
      </div>
    </div>

    <!-- Footer (Chân trang) -->
    <footer>
      <footer-component />
    </footer>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import SidebarComponent from '../components/Sidebar.vue'
import FooterComponent from '../components/Footer.vue'
export default {
  name: "LayoutPage",
  data() {
    return {};
  },
  components:{
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  }
};
</script>

<style scoped>
.container-fluid {
  margin-top: 20px;
}
</style>
