<template>
  <v-container fluid>
    <v-card class="mt-2">
      <v-toolbar color="#1f52c1" dense>
        <v-toolbar-title class="subtitle-1">Cultures admin.</v-toolbar-title>
      </v-toolbar>
      <v-tabs color="success">
        <v-tab>Hydroponic</v-tab>
        <v-tab>Soil</v-tab>
        <v-tab>Misc</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <cultureData :key="componentKey" @updateList="refresh"></cultureData>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <cultureData :key="componentKey" @updateList="refresh"></cultureData>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.</p>
              <p
                class="mb-0"
              >Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-container>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="100">
          <v-container class="green--text text-uppercase">
            <span>Success</span>
          </v-container>
          <div>
            <span>Request update</span>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </v-container>
  </v-container>
</template>
<script>
import cultureData from "@/components/Admin/cultureDataTable.vue";
export default {
  name: "AdminCulture",
  components: { cultureData },
  data() {
    return {
      sheet: false,
      componentKey: 0
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    refresh: function() {
      this.componentKey += 1;
      this.sheet = !this.sheet;
    }
  },
  created: function() {}
};
</script>
<style scoped>
</style>
