<template>
  <b-container fluid id="browse" class="overflow-hidden">
    <b-row class="position-fixed w-100">
      <b-col cols="12" class="top-bar pt-3 ps-4 d-flex justify-content-between align-items-center"
             :class="{'bg-scroll' : windowTop > 1}">
        <b-img src="https://fontmeme.com/permalink/210429/a3c965c8ca506ff7278f69241bb6a691.png" alt="Logo" width="100"
               height="32.5">
        </b-img>
        <b-nav small class="flex-grow-1 ms-md-3 d-none d-md-flex">
          <b-nav-item @click="searchClicked = false; searched = ''"  :to="{name: menu.url}" v-for="(menu,index) in menus" :key="index">{{ menu.name }}</b-nav-item>
        </b-nav>
        <div class="icon d-flex justify-content-between align-items-center">
          <input type="search" placeholder="Cerca" class="me-3 search" @keyup.once="searched_route"
                 v-show="searchClicked" v-model="searched">
          <router-link v-if="searchClicked && searched !== ''" :to="{name: 'search'}" :disabled="searched ===''"><i
              class="fas fa-search pe-3"></i></router-link>
          <i class="fas fa-search pe-3" v-else @click="searchClicked = true"></i>
          <i class="far fa-bell"></i>
          <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
             <span>
               <b-img width="32" height="32" :src="img_profile"></b-img>
             </span>
            </template>
            <b-dropdown-item href="#">Menu</b-dropdown-item>
          </b-dropdown>
          <i class="fas fa-bars d-block d-md-none"></i>
        </div>
      </b-col>
    </b-row>

    <router-view :api="APIData" :genre="listGenres"></router-view>
    <router-view name="search" :genre="listGenres" :search="searched" :api="APIData"></router-view>

  </b-container>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "Browse",
  props: {
    img_profile: String
  },
  data() {
    return {
      APIData: {
        APIKey: '8c6a3bb62200554563f12c8dd420d32f',
        APILink: 'https://api.themoviedb.org/3',
        posterLink: 'https://image.tmdb.org/t/p/w342'
      },
      menus: [
        {
          name: 'Home',
          url: 'browse_list'
        }, {
          name: 'Serie TV',
          url: '#'
        }, {
          name: 'Film',
          url: '#'
        }, {
          name: 'Nuovi e popolari',
          url: '#'
        }, {
          name: 'La mia lista',
          url: '#'
        },
      ],
      windowTop: 0,
      searchClicked: false,
      searched: '',
      listGenres: {
        movie: [],
        tv: []
      }
    }
  },
  methods: {
    onScroll() {
      this.windowTop = window.top.scrollY/* or: e.target.documentElement.scrollTop */
    },
    searched_route() {
      router.push({name: 'search'})
    },
    async getGeneres(url, element) {
      const listGenres = await axios.get(this.APIData.APILink + url,
          {
            params: {
              api_key: this.APIData.APIKey,
              language: 'it',
            }
          });
      this.listGenres[element] = listGenres.data.genres;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.getGeneres('/genre/tv/list', 'tv');
    this.getGeneres('/genre/movie/list', 'movie');
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
}
</script>
