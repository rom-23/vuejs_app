<template>
  <v-container fluid>
    <v-card elevation="4">
      <v-toolbar color="#1f52c1" dense>
        <span style="color:rgb(231, 231, 231);">Search Admin.</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-select
          :items="cultures"
          color="#26A69A"
          name="selected"
          placeholder="Search"
          dense
          v-model="selected"
          @change="onSearchCulture(selected.idculture)"
          item-value="idculture"
          item-text="culture_name"
          return-object
        ></v-select>
      </v-container>

      <v-container>
        <template v-if="selected.idculture">
          <v-row>
            <ul>
              <li>Id culture :{{selected.idculture}}</li>
              <li>Name : {{selected.CultName}}</li>
              <li>{{selected.CultStartDate}}</li>
              <v-divider inset></v-divider>
              <li>{{selected.JuiceName}}</li>
              <v-divider inset></v-divider>
              <li
                v-for="strain in searchResult"
                :key="strain.idvarieties"
              >{{strain.quantity}} {{strain.origin}}(s) of {{strain.VarName}}</li>
            </ul>
          </v-row>
          <v-row align="center">
            <v-col align="center">
              <!-- <router-link
                :to="{name: 'editculture.profile', params: {idculture: selected.idculture}}"
              >
                <v-btn class="mx-2" fab dark small color="teal lighten-2">
                  <v-icon dark>edit</v-icon>
                </v-btn>
              </router-link>-->
              <v-btn class="mx-2" fab dark small color="teal lighten-2" @click="resetForm">
                <v-icon dark>mdi-cancel</v-icon>
              </v-btn>
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
  name: "SearchAdmin",

  data() {
    return {
      cultures: [],
      searchResult: [],
      selected: [],
      title2: ""
    };
  },
  methods: {
    resetForm() {
      this.searchResult = [];
      this.selected = [];
    },

    onSearchCulture(selected) {
      this.searchResult = [];
      Api()
        .get("culture/" + selected)
        .then(response => (this.cultures = response.data.result))
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
