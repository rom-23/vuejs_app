<template>
  <v-container>
    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">
            <v-img :src="require('@/assets/copy_of_full_green3x.png')" width="140"></v-img>
          </v-list-item-title>
          <v-list-item-subtitle
            class="grey--text body-1 pt-3"
          >Graphs and statistics to help you track your garden's progress</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn color="grey body-2" text>Share</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Stats",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  created: function() {}
};
</script>
<style scoped>
</style>
