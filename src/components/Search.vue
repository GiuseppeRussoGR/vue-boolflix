<template>
  <b-row id="search" class="pt-5">
    <b-col cols="12" class="pt-3">
      <h2 class="text-light pt-3">Movies</h2>
      <div class="container-card d-flex flex-wrap align-items-center">
        <div v-for="(element,index) in movies" :key="index">
          <div class="single-card" v-if="element.poster_path !== null">
            <div class="element-card">
              <b-img width="150" :src="'https://image.tmdb.org/t/p/w342'+ element.poster_path"></b-img>
            </div>
          </div>
        </div>
      </div>
    </b-col>>
    <b-col cols="12">
      <h2 class="text-light">TV</h2>
      <div class="container-card d-flex flex-wrap align-items-center">
        <div v-for="(element,index) in tv" :key="index">
          <div class="single-card" v-if="element.poster_path !== null">
            <div class="element-card">
              <b-img width="150" :src="'https://image.tmdb.org/t/p/w342'+ element.poster_path"></b-img>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  props: {
    search: String,
    api: Object
  },
  data() {
    return {
      movies: [],
      tv: [],
    }
  },
  methods: {
    async APIcall() {
      if (this.search.length > 0) {
        const axios_response = await axios.get(this.api.APILink + '/search/multi',
            {
              params: {
                api_key: this.api.APIKey,
                language: 'it',
                query: this.search
              }
            });
        this.movies = axios_response.data.results.filter(element => {
          return element.media_type === 'movie';
        });
        this.tv = axios_response.data.results.filter(element => {
          return element.media_type === 'tv';
        });
      }
    },
  },
  watch: {
    $props: {
      handler() {
        this.APIcall();
      },
      deep: true,
      immediate: true,
    }
  }
}
</script>

