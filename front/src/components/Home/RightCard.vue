<template>
  <v-container>
    <v-card height="67" max-width="320" class="mx-auto mb-5" flat></v-card>
    <div class="flex-grow-1"></div>
    <v-card class="mx-auto" max-width="320">
      <v-img :src="require('@/assets/8.jpg')" height="200px"></v-img>
      <v-card-title class="subtitle-1">
        <div>Feeding schedule</div>
        <span
          class="grey--text subtitle-2"
        >This organizer and tracking tool helps growers take total control of their operation, with the ability to record, chart and analyze an array of critical data (pH, temperature, feeds and more) and work on custom feeding schedule</span>
      </v-card-title>
      <v-card-actions>
        <v-btn text color="green">Explore</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="show = !show" color="green">
          <v-icon>{{ show ? 'expand_less' : 'add' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <v-card class="mx-auto mt-5" max-width="320" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title
            class="orange--text subtitle-2 mb-1"
          >Data from all relevant environmental</v-list-item-title>
          <p
            class="subtitle-2 grey--text pt-3 text-center"
          >Track and assign schedules for individual plants as they move from your cloner to the main veg room, between tables within a room and between rooms as they switch from veg to flower.</p>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-row class="justify-center">
          <v-btn class="text-lowercase mr-2 mb-2" color="success">Button</v-btn>
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
  name: "RightCard",

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
