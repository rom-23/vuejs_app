<template>
  <v-container fluid>
    <v-card class="mx-5 my-10" color="#303030">
      <v-card-text>
        <v-container>
          <alertMe ref="alertMe"></alertMe>
          <v-row class="align-center pl-5 pb-5 body-1 green--text">
            <p>
              <v-icon color="green">tune</v-icon>
              &nbsp;Edit the ph and ec values and update the boosters doses for culture {{idculture}}
            </p>
            <div class="flex-grow-1"></div>
            <router-link tag="a" exact :to="{name: 'editculture'}">
              <v-icon tag="a">close</v-icon>
            </router-link>
          </v-row>
          <v-row>
            <v-expansion-panels popout>
              <v-expansion-panel>
                <v-expansion-panel-header>Ph / Ec</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-divider class="pb-5"></v-divider>
                  <p
                    class="orange--text"
                  >Enter the ph and ec values for today or choose another date</p>
                  <v-row align="center" class="px-10">
                    <v-col>
                      <v-slider
                        v-model="measure_ph"
                        :rules="rules"
                        max="10"
                        thumb-color="#282828"
                        thumb-size="25"
                        label="Ph value"
                        step="0.1"
                        thumb-label="always"
                        ticks
                      ></v-slider>
                    </v-col>
                    <v-col>
                      <v-slider
                        v-model="measure_ec"
                        :rules="rules_ec"
                        max="3"
                        thumb-color="#282828"
                        thumb-size="25"
                        label="Ec value"
                        step="0.1"
                        thumb-label="always"
                        ticks
                      ></v-slider>
                    </v-col>
                    <v-col>
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="measure_date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="measure_date"
                            label="date"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="measure_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu2.save(measure_date)">Ok</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-container>
                      <v-btn color="#303030" class="text-lowercase mr-2" @click="saveMeasures">Save</v-btn>
                      <v-btn color="#303030" class="text-lowercase">Graphs</v-btn>
                    </v-container>
                    <v-container></v-container>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Boosters dose</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-divider class="pb-5"></v-divider>
                  <p
                    class="orange--text"
                  >Enter the dose for the specified booster for today or choose another date</p>

                  <v-row align="center">
                    <v-col>
                      <v-select
                        :items="boosters"
                        color="#26A69A"
                        name="selected"
                        placeholder="Boosters"
                        dense
                        v-model="selected"
                        item-value="idbooster"
                        item-text="booster_name"
                        return-object
                      ></v-select>
                    </v-col>

                    <v-col>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date_dose_booster"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date_dose_booster"
                            label="Select measures date"
                            prepend-icon="event"
                            color="#26A69A"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date_dose_booster" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(date_dose_booster)">Ok</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col>
                      <v-slider
                        v-model="dose_booster"
                        max="10"
                        thumb-color="#282828"
                        thumb-size="25"
                        label="ml /L"
                        step="0.1"
                        thumb-label="always"
                        ticks
                      ></v-slider>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-container>
                      <v-btn color="#303030" class="text-lowercase mr-2" @click="saveDose">Save</v-btn>
                      <v-btn color="#303030" class="text-lowercase" @click="goGraph">Graphs</v-btn>
                    </v-container>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Measures tables</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- <MeasuresDatatable :key="componentKey2"></MeasuresDatatable> -->
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Boosters doses tables</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- <MeasuresBoosterDatatable :key="componentKey"></MeasuresBoosterDatatable> -->
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-container>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="100">
          <v-container>
            <v-row class="justify-center">
              <span class="green--text text-uppercase">Success</span>
            </v-row>
            <v-row class="justify-center">
              <span>New values saved</span>
            </v-row>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
    </v-container>
  </v-container>
</template>
<script>
import Api from "@/api.js";
import alertMe from "@/components/AlertDialog.vue";
import ApexCharts from "apexcharts";
export default {
  name: "Graphs",
  components: { alertMe },

  data() {
    return {
      rules_ec: [v => v <= 1.6 || "Ec too high !"],
      rules: [v => v <= 6.8 || "Ph too high !"],
      sheet: false,
      componentKey: 0,
      componentKey2: 0,
      activetab: 1,
      idculture: "",
      selected: [],
      menu: false,
      menu2: false,
      measure_ph: "",
      date_dose_booster: new Date().toISOString().substr(0, 10),
      measure_date: new Date().toISOString().substr(0, 10),
      measure_ec: "",
      all_phec: [],
      all_dosageBoost: [],
      boosters: [],
      dose_booster: "",
      dialog: false,
      resultDose: [],
      resultDoseBooster: []
    };
  },

  methods: {
    forceRerender: function(datatable) {
      if (datatable === "phec") {
        this.componentKey2 += 1;
      } else {
        this.componentKey += 1;
      }
    },
    // Alert message method
    alertDialog(message) {
      this.$refs.alertMe
        .open("Error", message, {
          color: "red"
        })
        .then(cancel => {});
    },
    activeMe: function() {},
    saveMeasures: function() {
      this.resultDose = [];
      let datatable = "phec";
      let objectToSend = {
        measure_ph: this.measure_ph,
        measure_ec: this.measure_ec,
        measure_date: this.measure_date,
        idculture: parseInt(this.idculture)
      };
      Api()
        .post("measure/create/", objectToSend)
        .then(response => {
          if (response.data.status == "success") {
            this.forceRerender(datatable);
            this.sheet = !this.sheet;
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
          this.resultDose = `${error}, Could not reach the API.`;
          this.alertDialog(this.resultDose);
        });
    },
    goGraph: function() {},
    saveDose: function() {
      this.resultDose = [];
      let datatable = "booster";
      let objectToSend = {
        idculture: parseInt(this.idculture),
        idbooster: this.selected.idbooster,
        date_dose_booster: this.date_dose_booster,
        dose_booster: this.dose_booster
      };
      Api()
        .post("measureBooster/create/", objectToSend)
        .then(response => {
          if (response.data.status == "success") {
            this.forceRerender(datatable);
            this.sheet = !this.sheet;
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
          this.resultDoseBooster = `${error}., Could not reach the API.`;
          this.alertDialog(this.resultDoseBooster);
        });
    }
  },
  created: function() {
    this.idculture = this.$route.params.idculture;
    Api()
      .get("booster/byculture/" + this.idculture)
      .then(response => (this.boosters = response.data.result))
      .catch(
        error => (this.boosters = `Error! Could not reach the API. ${error}`)
      );
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  color: rgb(177, 115, 45);
}

span {
  display: block;
  text-align: left;
}
</style>
