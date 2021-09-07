<template>
  <b-row id="search" class="pt-5">
    <b-col cols="12" class="pt-3">
      <h2 class="text-light pt-3">Movies</h2>
      <div class="container-card d-flex flex-wrap align-items-center">
        <div v-for="(element,index) in movies" :key="index">
          <div class="single-card" v-if="element.poster_path !== null">
            <div class="element-card">
              <b-img width="250" :src="'https://image.tmdb.org/t/p/w342'+ element.poster_path"></b-img>
            </div>
            <div class="info-card text-light">
              <div class="content_info d-flex flex-column justify-content-between align-items-center ">
                <div class="title text-center">{{ element.title }}</div>
                <div class="overview text-center p-3 mb-2">{{ element.overview }}</div>
                <div class="list-info d-flex flex-wrap justify-content-around align-items-center">
                  <div class="original_lang col-6 text-center pb-3">
                    <span class="title_section">Lingua Originale</span><br>{{ element.original_language }}
                  </div>
                  <div class="original_title col-6 text-center pb-3">
                    <span class="title_section">Titolo Originale</span><br>{{ element.original_title }}
                  </div>
                  <div class="relase_date col-6 text-center pb-3"><span
                      class="title_section">Uscito</span><br>{{ element.release_date }}
                  </div>
                  <div class="genre col-6 text-center pb-3"><span class="title_section">Generi</span>
                    <br>
                    <span v-for="(genres,index) in element.genre_ids" :key="index">
                    {{ findGenre(genres, 'movie') }}</span>
                  </div>
                  <div class="vote col-6 text-center pb-3"><span
                      class="title_section">Voto</span><br>{{ element.vote_average }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col cols="12" class="pt-3">
      <h2 class="text-light pt-3">Movies</h2>
      <div class="container-card d-flex flex-wrap align-items-center">
        <div v-for="(element,index) in tv" :key="index">
          <div class="single-card" v-if="element.poster_path !== null">
            <div class="element-card">
              <b-img width="250" :src="'https://image.tmdb.org/t/p/w342'+ element.poster_path"></b-img>
            </div>
            <div class="info-card text-light">
              <div class="content_info d-flex flex-column justify-content-between align-items-center ">
                <div class="title text-center">{{ element.name }}</div>
                <div class="overview text-center p-3 mb-2">{{ element.overview }}</div>
                <div class="list-info d-flex flex-wrap justify-content-around align-items-center">
                  <div class="original_lang col-6 text-center pb-3">
                    <span class="title_section">Lingua Originale</span><br>{{ element.original_language }}
                  </div>
                  <div class="original_title col-6 text-center pb-3">
                    <span class="title_section">Titolo Originale</span><br>{{ element.original_name }}
                  </div>
                  <div class="relase_date col-6 text-center pb-3"><span
                      class="title_section">Uscito</span><br>{{ element.first_air_date }}
                  </div>
                  <div class="genre col-6 text-center pb-3"><span class="title_section">Generi</span>
                    <br>
                    <span v-for="(genres,index) in element.genre_ids" :key="index">
                    {{ findGenre(genres, 'movie') }}</span>
                  </div>
                  <div class="vote col-6 text-center pb-3"><span
                      class="title_section">Voto</span><br>{{ element.vote_average }}
                  </div>
                </div>
              </div>
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
    api: Object,
    genre: Object
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
    findGenre(genre, typeElement) {
      let listGenre = [];
      this.genre[typeElement].forEach(element => {
        if (element.id === genre) {
          listGenre.push(element.name);
        }
      });
      return listGenre[0];
    }
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

