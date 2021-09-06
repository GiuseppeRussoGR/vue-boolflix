<template>
  <b-container fluid id="browse" class="overflow-hidden">
    <b-row class="position-fixed w-100" >
      <b-col cols="12" class="top-bar pt-3 ps-4 d-flex justify-content-between align-items-center" :class="{'bg-scroll' : windowTop > 1}">
        <b-img src="https://fontmeme.com/permalink/210429/a3c965c8ca506ff7278f69241bb6a691.png" alt="Logo" width="100"
               height="32.5">
        </b-img>
        <b-nav small class="flex-grow-1 ms-md-3">
          <b-nav-item v-for="(menu,index) in menus" :key="index">{{ menu.name }}</b-nav-item>
        </b-nav>
        <div class="icon d-flex justify-content-between align-items-center">
          <i class="fas fa-search pe-3"></i>
          <i class="far fa-bell"></i>
          <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
             <span>
               <b-img width="32" height="32" :src="img_profile"></b-img>
             </span>
            </template>
            <b-dropdown-item href="#">Menu</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12 pe-0 ps-0 vh-100">
        <div class="container-poster" v-if="jumboMovie.img !== ''">
          <b-img :src="jumboMovie.img" fluid></b-img>
          <div class="information-poster d-flex flex-column col-12 col-md-6">
            <div class="b-movie">
              <span>B</span>
              <span class="ps-2">Movie</span>
            </div>
            <div class="title pb-3">
              <h1>{{ jumboMovie.name }}</h1>
            </div>
            <div class="overview overflow-hidden col-9">
              {{ jumboMovie.overview }}
            </div>
            <div class="button pt-5">
              <b-button class="me-5 mb-3 mb-md-0">
                <span class="pe-3"><i class="fas fa-play"></i></span><span>Riproduci</span>
              </b-button>
              <b-button>
                <span class="pe-3"><i class="fas fa-info"></i></span><span>Altre info</span>
              </b-button>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="position-relative list-element w-100">
      <b-col cols="12" class="w-100 slider-card">
        <b-col cols="12">
          <div class="title-section">
            <h4>I più popolari Film su Boolflix</h4>
          </div>
        </b-col>
          <carousel urlGenre="/genre/movie/list" :api="APIData" :movie_tv="trending.movie"></carousel>
      </b-col>
    </b-row>

    <b-row class="position-relative list-element w-100">
      <b-col cols="12" class="w-100 slider-card">
        <b-col cols="12">
          <div class="title-section">
            <h4>Le più popolari SerieTv su Boolflix</h4>
          </div>
        </b-col>
        <carousel urlGenre="/genre/tv/list" :api="APIData" :movie_tv="trending.tv"></carousel>
      </b-col>
    </b-row>


  </b-container>
</template>

<script>
import axios from "axios";
import carousel from "@/components/carousel";

export default {
  name: "Browse",
  props: {
    img_profile: String
  },
  components: {carousel},
  data() {
    return {
      menus: [
        {
          name: 'Home',
          url: '#'
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
      APIData: {
        APIKey: '8c6a3bb62200554563f12c8dd420d32f',
        APILink: 'https://api.themoviedb.org/3',
        posterLink: 'https://image.tmdb.org/t/p/w342'
      },
      trending: {
        movie: [],
        tv: []
      },
      jumboMovie: {
        img: '',
        name: '',
        overview: ''
      },
      windowTop: 0,
    }
  },
  methods: {
    async APIcall(url, name, variable) {
      const axios_response = await axios.get(this.APIData.APILink + url,
          {
            params: {
              api_key: this.APIData.APIKey,
              language: 'it',
              query: name
            }
          });
      this[variable].movie = axios_response.data.results.filter(element => {
        return element.media_type === 'movie';
      });
      this[variable].tv = axios_response.data.results.filter(element => {
        return element.media_type === 'tv';
      });

    },
    choosePoster() {
      const movie = this.trending.movie[Math.floor(Math.random() * this.trending.movie.length)];
      this.jumboMovie.img = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
      this.jumboMovie.name = movie.title;
      this.jumboMovie.overview = movie.overview;
    },
    onScroll() {
      this.windowTop = window.top.scrollY/* or: e.target.documentElement.scrollTop */
    }
  },
  async created() {
    await this.APIcall('/trending/all/day', '', 'trending');
    this.choosePoster();
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
}
</script>
