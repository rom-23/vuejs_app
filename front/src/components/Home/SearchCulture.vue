<template>
  <v-container fluid>
    <v-card max-width="250" class="mx-auto" elevation="5">
      <v-toolbar color="#0e9e5f" dense>
        <span style="color:rgb(231, 231, 231);">Search culture</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container class="pb-0">
        <v-select
          :key="componentKey"
          :items="cultures"
          color="#26A69A"
          name="selected"
          prepend-icon="post_add"
          dense
          v-model="selected"
          @change="onSearchCulture(selected.idculture)"
          item-value="idculture"
          item-text="culture_name"
          return-object
        ></v-select>
      </v-container>
      <v-container class="mt-0 pt-0">
        <template v-if="selected.idculture">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Id culture : {{selected.idculture}}</v-list-item-subtitle>
              <v-list-item-subtitle>Name : {{selected.culture_name}}</v-list-item-subtitle>
              <v-list-item-subtitle class="pt-2">Start date : {{selected.culture_start_date}}</v-list-item-subtitle>
              <v-list-item-subtitle>Status : {{selected.culture_state}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-row align="center">
            <v-col align="end">
              <router-link
                v-if="cultures"
                tag="a"
                exact
                :to="{name: 'editculture', params: {idculture: selected.idculture}}"
              >
                <v-btn icon @click="renderMe()" color="green" tag="button">
                  <v-icon>zoom_in</v-icon>
                </v-btn>
                <!-- <v-btn small class="text-lowercase" @click="renderMe()">Edit</v-btn> -->
              </router-link>
              <v-btn icon @click="resetForm" color="green" tag="button">
                <v-icon>cached</v-icon>
              </v-btn>
              <!-- <v-btn small class="text-lowercase ml-4" @click="resetForm">reset</v-btn> -->
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import Api from "@/api.js";
export default {
  name: "SearchCulture",
  data() {
    return {
      cultures: [],
      searchResult: [],
      selected: [],
      componentKey: 0
    };
  },
  methods: {
    resetForm() {
      this.searchResult = [];
      this.selected = [];
    },
    renderMe() {
      this.componentKey += 1;
    },
    onSearchCulture(selected) {
      this.searchResult = [];
      Api()
        .get("culture/" + selected)
        .then(response => console.log(response.data.result))
        .catch(
          error => (this.cultures = `Error! Could not reach the API. ${error}`)
        );
    }
  },

  created() {
    Api()
      .get("culture")
      .then(response => (this.cultures = response.data.result))
      .catch(error => console.log(error));
  }
};
</script>
<style scoped>
a {
  padding: 10px;
  text-decoration: none;
}
button {
  background-color: #363636;
}
button:hover {
  background-color: #636161;
}
label,
p {
  font-size: 12px;
}
.v-select {
  font-size: 0.9em;
}
li {
  font-size: 12px;

  list-style-type: none;
  text-align: left;
}
</style>
