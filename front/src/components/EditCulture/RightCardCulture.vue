<template>
  <v-container>
    <v-card height="67" max-width="320" class="mx-auto mb-5" flat></v-card>
    <div class="flex-grow-1"></div>
    <v-card class="mx-auto" max-width="320">
      <v-card-title class="subtitle-1">
        <div class="overline mb-4">Global estimated values</div>
        <span class="grey--text subtitle-2">Stats and estimated values</span>
      </v-card-title>
      <v-card-actions>
        <v-row class="justify-start">
          <v-btn small class="text-lowercase mr-2 mb-1 ml-4">Options</v-btn>
        </v-row>

        <div class="flex-grow-1"></div>
        <v-btn icon @click="show = !show" color="green">
          <v-icon>{{ show ? 'expand_less' : 'add' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text>Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <v-card class="mx-auto mt-5" max-width="320" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Global culture data</div>
          <v-list-item-title
            class="green--text subtitle-2 mb-1"
          >Data from all relevant environmental</v-list-item-title>
          <p
            class="subtitle-2 grey--text pt-3 text-center"
          >Track and assign schedules for indwitch from veg to flower.</p>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions></v-card-actions>
    </v-card>
    <v-card class="mx-auto mt-5" max-width="320" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Global measures data</div>
          <v-list-item-title
            class="green--text subtitle-2 mb-1"
          >Data from all relevant environmental</v-list-item-title>
          <p
            class="subtitle-2 grey--text pt-3 text-center"
          >s within a room and between rooms as they switch from veg to flower.</p>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-row class="justify-start">
          <v-btn small class="text-lowercase mr-2 mb-1 ml-4">Options</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-container class="mt-5">
      <v-img
        :src="require('@/assets/grow-logo-green.png')"
        max-height="100"
        contain
        aspect-ratio="1"
      ></v-img>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "RightCardCulture",

  data() {
    return {
      show: false
    };
  },
  methods: {}
};
</script>
<style scoped>
</style>
