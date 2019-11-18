<template>
  <v-container fluid>
    <v-row justify="center">
      <h1 class="grey--text body-1 pb-5">Strains admin.</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pt-3">
      <v-col cols="12" align="right">
        <v-btn color="text-lowercase" @click="showForm()" v-show="!isvisible">Add new strain</v-btn>
        <alertMe ref="alertMe"></alertMe>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-card v-show="isvisible" elevation="8" class="pb-5" max-width="800">
        <v-toolbar color="#1f52c1" dense elevation="3">
          <v-toolbar-title class="subtitle-1">Add a new culture</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center pt-3">
          <v-col cols="3">
            <v-text-field v-model="strain_name" label="Name" required></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="strain_date"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="strain_date"
                  label="Start date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="strain_date" no-title>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(strain_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="idstraintype" label="Type" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="thc_ratio" label="Thc ratio" required></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="3" sm="3" md="3">
            <v-text-field v-model="strain_genetic" label="Genetic" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="strain_bloom" label="Bloom time" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="strain_origin" label="Origin" required></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="6" sm="6" md="6">
            <v-textarea
              background-color="#474545"
              v-model="strain_desc"
              required
              placeholder="Strain description"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-btn color="text-lowercase" class="mr-2" @click="confirmDialog()">Save</v-btn>
          <v-btn color="text-lowercase" @click="closeForm()">Cancel</v-btn>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-col>
        <StrainCards :key="componentKey" @updateList="refresh"></StrainCards>
      </v-col>
    </v-row>
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
import StrainCards from "@/components/Admin/StrainCards.vue";
import alertMe from "@/components/AlertDialog.vue";
import Api from "@/api.js";
export default {
  name: "Adminstrain",
  components: {
    StrainCards,
    alertMe
  },

  data() {
    return {
      menu: false,
      sheet: false,
      componentKey: 0,
      strain_name: "",
      strain_desc: "",
      strain_date: new Date().toISOString().substr(0, 10),
      strain_genetic: "",
      idstraintype: "",
      thc_ratio: "",
      strain_bloom: "",
      strain_origin: "",
      isvisible: "",
      newstrain: []
    };
  },
  mounted: function() {},
  computed: {},
  methods: {
    refresh: function() {
      this.componentKey += 1;
      this.sheet = !this.sheet;
    },
    save_strain() {
      Api()
        .post("strain/create/", {
          strain_name: this.strain_name,
          strain_desc: this.strain_desc,
          strain_date: this.strain_date,
          strain_genetic: this.strain_genetic,
          idstraintype: this.idstraintype,
          thc_ratio: this.thc_ratio,
          strain_bloom: this.strain_bloom,
          strain_origin: this.strain_origin
        })
        .then(response => {
          if (response.data.status == "success") {
            this.newstrain = response.data.result;
            this.refresh();
          } else if (response.data.status == "error") {
            this.alertDialog(
              " Error message from API : " + response.data.message
            );
          } else {
            this.alertDialog(
              " Error message from API : " + response.data.error
            );
          }
        })
        .catch(error => {
          this.newstrain = `${error}., Could not reach the API.`;
          this.alertDialog(this.newstrain);
        });
      this.showForm();
    },
    // Alert message for API error
    alertDialog(message) {
      this.$refs.alertMe
        .open("Error", message, {
          color: "red"
        })
        .then(cancel => {});
    },
    // Confirm dialog method
    confirmDialog() {
      this.$refs.alertMe
        .open("Save Strain", "Save the strain ? ", {
          color: "#56ce98"
        })
        .then(alertMe => {
          this.save_strain();
        });
    },
    showForm() {
      this.isvisible = !this.isvisible;
    },
    closeForm() {
      this.isvisible = !this.isvisible;
    }
  },

  created: function() {}
};
</script>
<style scoped>
</style>
