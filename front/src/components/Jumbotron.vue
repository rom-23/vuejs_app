<template>
  <v-container>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <v-img
            :src="require('@/assets/copy_of_full_green3x.png')"
            max-height="60"
            contain
            aspect-ratio="1"
          ></v-img>
          <v-row class="pt-5 mt-5 px-5">
            <p class="grey--text subtitle-2 text-center">
              Different sections of the app specialize in plants, types of flower beds
              or raised beds, and tasks such as watering, fertilizing, or harvesting.
              Document your plant development from seed to full grown plant, track the
              condition of the soil and duration of sunlight, and keep a running narrative
              of your garden with up-to-date photos.
            </p>
          </v-row>

          <v-row align="center" justify="center" class="px-5 mt-5">
            <v-card max-width="300" class="mx-auto">
              <v-system-bar lights-out></v-system-bar>
              <v-carousel
                :continuous="false"
                :show-arrows="true"
                hide-delimiter-background
                height="200"
              >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="body-1">{{ slide }} Slide</div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Cultures slide</v-list-item-title>
                    <v-list-item-subtitle>Some reports of cultures</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <v-img
              :src="require('@/assets/Plant-Grow-Seedling-Sunshine-.jpg')"
              max-height="210"
              contain
              aspect-ratio="1"
            ></v-img>
            <v-card max-width="300" class="mx-auto">
              <v-system-bar lights-out></v-system-bar>
              <v-carousel
                :continuous="false"
                :show-arrows="true"
                hide-delimiter-background
                height="200"
              >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="body-1">{{ slide }} Slide</div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Strains slide</v-list-item-title>
                    <v-list-item-subtitle>Some pictures of favorites</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-row>
          <v-divider class="mt-10"></v-divider>
          <v-row class="pt-5 mt-5 px-10">
            <p
              class="grey--text subtitle-2 text-center"
            >The GrowUp app is essentially a complete grow journal, helping you schedule and itemize tasks like watering and nutrient additions. It works to manage the details of the growing environment, keep accurate notes with photographic evidence on the daily developments in your crop, and even log information about mother plants and their clones</p>
          </v-row>
          <v-row class="pa-5 justify-center">
            <router-link tag="a" exact :to="{name: 'new'}">
              <v-btn class="mx-0 text-lowercase">Start a new culture</v-btn>
            </router-link>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <div class="grey--text title-2 mb-3">Check out our newest features</div>
          <v-row>
            <v-col>
              <v-img :src="require('@/assets/icongrowing-program.jpg')"></v-img>
            </v-col>
            <v-col>
              <v-img :src="require('@/assets/icongrowing-program.jpg')"></v-img>
            </v-col>
          </v-row>
          <v-row class="justify-center mt-5 mb-8">
            <v-btn class="mx-0 text-lowercase">See more</v-btn>
          </v-row>

          <v-divider class="my-5"></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
export default {
  name: "Jumbotron",
  components: {},
  data() {
    return {
      colors: [
        "teal lighten-2",
        "primary",
        "yellow darken-4",
        "red lighten-2",
        "orange darken-1"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
