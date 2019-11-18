<template>
  <v-container>
    <v-card class="mx-auto" elevation="24" max-width="80%">
      <v-carousel>
        <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
      </v-carousel>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Caroussel",
  components: {},
  data() {
    return {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      items: [
        {
          src: require("@/assets/morning-dew-3404821_1920.jpg")
        },
        {
          src: require("@/assets/8.jpg")
        },
        {
          src: require("@/assets/Plant-Grow-Seedling-Sunshine-.jpg")
        },
        {
          src: require("@/assets/plant-3117525_1920.jpg")
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
