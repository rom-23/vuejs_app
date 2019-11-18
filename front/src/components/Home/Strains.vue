<template>
  <v-container fluid>
    <v-card max-width="250" class="mx-auto" elevation="5">
      <v-toolbar color="#0e9e5f" dense>
        <span style="color:rgb(231, 231, 231);">Search strain</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-select
          :items="strains"
          color="#26A69A"
          name="selected"
          placeholder="Search"
          dense
          prepend-icon="eco"
          v-model="selected"
          @change="onSearchStrain(selected.idstrain)"
          item-value="idstrain"
          item-text="strain_name"
          return-object
        ></v-select>
      </v-container>

      <v-container>
        <template v-if="selected.idstrain">
          <v-row>
            <ul>
              <li>Id strain :{{selected.idstrain}}</li>
              <li>Name : {{selected.strain_name}}</li>
              <v-divider inset></v-divider>
            </ul>
          </v-row>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-row align="center" class="pt-5">
                <v-col align="end">
                  <v-btn icon color="green" tag="button" v-on="on">
                    <v-icon>zoom_in</v-icon>
                  </v-btn>
                  <v-btn icon color="green" tag="button">
                    <v-icon>cached</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <v-card>
              <v-card-title class="subtitle-2">Strains Description</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>Id strain :{{selected.idstrain}}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>Name : {{selected.strain_name}}</v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="green" text>Edit</v-btn>
                <v-btn color="green" text @click="close">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Api from "@/api.js";
export default {
  name: "Strains",
  data() {
    return {
      dialog: false,
      strains: [],
      selected: [],
      idstrain: ""
    };
  },
  watch: {
    dialog: function(val) {
      val || this.close();
    }
  },
  methods: {
    onSearchStrain(idstrain) {
      this.idstrain = idstrain;
    },
    resetForm() {
      this.selected = [];
    },
    close: function() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  },
  created() {
    let id = "";
    Api()
      .get("strain/" + id)
      .then(response => (this.strains = response.data.result))
      .catch(
        error => (this.strains = `Error! Could not reach the API. ${error}`)
      );
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
  font-size: 14px;

  list-style-type: none;
  text-align: left;
}
</style>
