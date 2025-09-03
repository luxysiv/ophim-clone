<template>
  <v-footer class="bg-grey-darken-4 text-white pa-8" height="auto">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <div class="text-h5 font-weight-bold">
            <span class="font-italic">Phim</span><span class="text-yellow-darken-2">360</span>
          </div>
          <p class="mt-2 text-body-2">
            <strong>Phim360</strong> - {{$t('Trang xem phim Online với giao diện hiện đại, thân thiện người dùng.')}}
            {{$t('Nguồn phim tổng hợp từ các website lớn với đa dạng thể loại và quốc gia.')}}
          </p>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>
      <v-row class="align-center">
        <v-col>
          <p class="text-caption">
            © 2025 Phim360.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterPage',
  data() {
    return {
    };
  },
  methods: {
    slugify(str) {
      return str.toLowerCase()
        .trim().replace(/\s+/g, '-');
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
  transition: transform 0.2s ease;
}

li:hover {
  transform: translateX(4px);
}

a,
.router-link-active,
.router-link-exact-active {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

a:hover,
.router-link:hover {
  color: #ffd54f;
  text-shadow: 0 0 5px rgba(255, 213, 79, 0.3);
}

.text-yellow-darken-2 {
  text-shadow: 0 0 6px rgba(255, 213, 79, 0.3);
}

h4 {
  font-size: 1.1rem;
  position: relative;
  margin-bottom: 1rem;
}

h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 2px;
  width: 30%;
  background-color: #ffd54f;
  border-radius: 2px;
}

.v-chip {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.v-chip:hover {
  background-color: #ffd54f !important;
  color: #000 !important;
  transform: scale(1.05);
}
</style>
