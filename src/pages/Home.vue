<template>
  <default-layout>
    <template #default>
      <div class="container mt-4">
        <h2>DANH SÁCH PHIM MỚI NHẤT</h2>
        <b-row>
          <b-col v-for="item in listMovie" :key="item" cols="6" md="3" class="text-center">
            <b-skeleton
              v-if="isLoading"
              height="150px"
              width="150px"
            ></b-skeleton>
            <b-img
              v-else
              :src="`${imageMove}${item.poster_url}`"
              alt="Loaded image"
              width="150"
              height="150"
              style="margin: 10px;"
            ></b-img>
            <!-- <p>{{imageMove}}{{item.poster_url}}</p> -->
          </b-col>
        </b-row>
      </div>
    </template>
  </default-layout>
</template>

<script>
import {ListmovieNew} from '@/model/api'
// import axios from "axios";
export default {
  name: "HomePage",
  data() {
    return {
      isLoading: true,
      page: 1,
      imageMove: '',
      listMovie: [],
    };
  },
  mounted() {
    ListmovieNew({page : this.page},
    (result) => {
      if(result.status == true){
        this.listMovie = result.items
        this.imageMove = result.pathImage
        this.isLoading = false
        console.log(this.imageMove)
      }
      console.log(result)
    },
    (err)=> {
      console.log(err);
    })
  },
};
</script>
