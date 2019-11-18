<template>
  <v-container>
    <v-container>
      <first></first>
    </v-container>
    <v-container class="mt-4">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>
<script>
import first from "@/components/Jumbotron.vue";

export default {
  name: "MainAdmin",
  components: { first },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
