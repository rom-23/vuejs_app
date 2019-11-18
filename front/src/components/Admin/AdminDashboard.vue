<template>
  <v-container>
    <v-card class="mx-auto" max-width="344">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

      <card>
        <v-card-title class="body-1">Admin. Dashboard</v-card-title>
        <v-card-text>
          <span class="grey--text subtitle-1">all the datas here</span>
        </v-card-text>
      </card>

      <v-card-actions>
        <v-btn text color="success">Share</v-btn>

        <v-btn text color="success">Explore</v-btn>

        <div class="flex-grow-1"></div>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? '-' : '+' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AdminDashboard",

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
