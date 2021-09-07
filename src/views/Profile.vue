<template>
  <b-container fluid class="vh-100 overflow-hidden ps-0 pe-0" id="profile-choose">
    <b-row>
      <b-col cols="12" class="logo pt-3 ps-4">
        <b-img src="https://fontmeme.com/permalink/210429/a3c965c8ca506ff7278f69241bb6a691.png" alt="Logo" width="100"
               height="32.5">
        </b-img>
      </b-col>
    </b-row>
    <b-row class="h-100">
      <b-col cols="12" class="d-flex flex-column justify-content-center align-items-center">
        <div class="title-profile">
          <h1>Chi vuole guardare Netflix?</h1>
        </div>
        <div class="list-profile pt-3">
          <ul class="ps-0 text-center">
            <li class="profile-user text-center overflow-hidden" v-for="(profile,index) in profiles" :key="index">
              <router-link :to="{name: 'browse_list', params:{img_profile : profile.picture.large}}">
                <div class="profile-img-container overflow-hidden mb-3">
                  <b-img :src="profile.picture.large" alt="profile" fluid></b-img>
                </div>
                <span class="name-profile">
                  {{profile.name.first}}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Profile",
  data() {
    return {
      profiles: []
    }
  },
  mounted() {
    axios.get('https://randomuser.me/api/?inc=picture,name,login&results=4').then(response => {
      this.profiles = response.data.results;
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
