<template>
  <v-container>
    <Jumbotron></Jumbotron>

    <v-container>
      <TabHomeComponent></TabHomeComponent>
    </v-container>
    <v-container>
      <Caroussel></Caroussel>
    </v-container>
    <v-container class="mt-4">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>
<script>
import Jumbotron from "@/components/Jumbotron.vue";
import TabHomeComponent from "@/components/TabHomeComponent.vue";
import Caroussel from "@/components/Caroussel.vue";
export default {
  name: "Main",
  components: { Jumbotron, TabHomeComponent, Caroussel },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
