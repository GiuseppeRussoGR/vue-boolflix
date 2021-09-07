<template>
  <div>
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
        <carousel urlGenre="/genre/movie/list" :api="api" :movie_tv="trending.movie"></carousel>
      </b-col>
    </b-row>

    <b-row class="position-relative list-element w-100">
      <b-col cols="12" class="w-100 slider-card">
        <b-col cols="12">
          <div class="title-section">
            <h4>Le più popolari SerieTv su Boolflix</h4>
          </div>
        </b-col>
        <carousel urlGenre="/genre/tv/list" :api="api" :movie_tv="trending.tv"></carousel>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import carousel from "@/components/carousel";
import axios from "axios";

export default {
  name: "browser_list",
  props: {
    api: Object
  },
  components: {carousel},
  data() {
    return {
      trending: {
        movie: [],
        tv: []
      },
      jumboMovie: {
        img: '',
        name: '',
        overview: ''
      },
    }
  },
  methods: {
    async APIcall(url, name, variable) {
      const axios_response = await axios.get(this.api.APILink + url,
          {
            params: {
              api_key: this.api.APIKey,
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
  },
  async created() {
    await this.APIcall('/trending/all/day', '', 'trending');
    this.choosePoster();
  },
}
</script>

