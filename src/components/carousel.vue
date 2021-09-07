<template>
  <b-row id="carousel">
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(element, index) in movie_tv" :key="index">
        <div class="container-card">
          <b-img :src="'https://image.tmdb.org/t/p/w342'+ element.poster_path"></b-img>
          <div class="card-info">
            <b-row>
              <b-col cols="12">
                <div class="icon-card d-flex justify-content-between align-items-center">
                  <div class="left w-50 d-flex align-items-center justify-content-around">
                    <i class="far fa-play-circle"></i>
                    <i class="fas fa-plus-circle"></i>
                    <i class="far fa-thumbs-up"></i>
                    <i class="far fa-thumbs-up no-like"></i>
                  </div>
                  <div class="right">
                    <i class="fas fa-chevron-circle-down"></i>
                  </div>
                </div>
              </b-col>
              <b-col cols="12">
                <div class="text">
                  <span v-html="qualityGrade()">{{ qualityGrade() }}</span><span
                    class="title-element"> - {{ typeof element.title !== 'undefined' ? element.title : element.name }}</span>
                </div>
              </b-col>
              <b-col cols="12">
                <div class="genres">
                  <span v-for="(genres,index) in element.genre_ids" :key="index">
                    {{ FindGenre(genres) }} <span class="divisor"
                                                  v-if="index < element.genre_ids.length - 1"> - </span>
                  </span>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </b-row>
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import axios from "axios";

export default {
  name: "carousel",
  props: {
    movie_tv: Array,
    api: Object,
    urlGenre: String
  },
  data() {
    return {
      listGenres: [],
      filmGenres: [],
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        zoom: false,
        autoHeight: true,
        containerModifierClass: 'swiper-custom ',
        slidesOffsetAfter: 150,
        slidesOffsetBefore: 20,
        centerInsufficientSlides: true,
        breakpoints: {
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }
      },

    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    qualityGrade() {
      const random = Math.floor(Math.random() * 100);
      let classe = (random > 75) ? 'class = "green"' : (random > 40 && random < 75) ? 'class="yellow"' : 'class="red"';
      return '<span ' + classe + ' >%' + random + ' compatibilità</span>';
    },
    FindGenre(genre) {
      let listGenre = [];
      this.listGenres.forEach(element => {
        if (element.id === genre) {
          listGenre.push(element.name);
        }
      });
      return listGenre[0];
    },
    async getGeneres(url) {
      const listGenres = await axios.get(this.api.APILink + url,
          {
            params: {
              api_key: this.api.APIKey,
              language: 'it',
            }
          });
      this.listGenres = listGenres.data.genres;
    }
  },
  mounted() {
    this.getGeneres(this.urlGenre);
  }
}
</script>
