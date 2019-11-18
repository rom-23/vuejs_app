<template>
  <v-container>
    <v-container fluid>
      <alertMe ref="alertMe"></alertMe>
      <v-stepper v-model="e1" altLabels>
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" editable step="1" color="#62d17a">Start new</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" editable step="2" color="#f7c051">Choose strains</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable color="#f46e61">Confirm</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <!-- PART 1  -->
          <v-stepper-content step="1">
            <v-container>
              <v-card class="mb-5" elevation="5">
                <v-toolbar color="#0E9E5F" dense>
                  <v-toolbar-title class="subtitle-1">Select your params</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>view_module</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-container class="px-7">
                  <v-row align="center">
                    <v-col>
                      <v-text-field
                        autofocus
                        color="#26A69A"
                        label="Name of the culture"
                        placeholder="Enter name... "
                        v-model="culture_name"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="culture_start_date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            color="#26A69A"
                            v-model="culture_start_date"
                            label="Select starting date"
                            readonly
                            prepend-icon="date_range"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker showCurrent v-model="culture_start_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="success"
                            @click="$refs.menu.save(culture_start_date)"
                          >Ok</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="cultureType"
                        color="#26A69A"
                        name="selectedCultureType"
                        placeholder="Select substrate"
                        dense
                        v-model="selectedCultureType"
                        item-value="idculturetype"
                        item-text="culture_type"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="cycle"
                        color="#26A69A"
                        name="selectedCycle"
                        placeholder="Select first cycle"
                        dense
                        v-model="selectedCycle"
                        item-value="idcycle"
                        item-text="cycle_name"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="6">
                      <multiselect
                        v-model="selectedJuice"
                        :options="juice"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :hide-selected="true"
                        :preserve-search="true"
                        placeholder="Select multiple fertilizers "
                        label="juice_name"
                        track-by="juice_name"
                        @select="onSelectJuice"
                        @remove="onRemoveJuice"
                      ></multiselect>
                    </v-col>
                    <v-col cols="6">
                      <multiselect
                        v-model="selectedBoost"
                        :options="booster"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :hide-selected="true"
                        :preserve-search="true"
                        placeholder="Select multiple boosters "
                        label="booster_name"
                        track-by="booster_name"
                        @select="onSelect"
                        @remove="onRemove"
                      ></multiselect>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="4">
                      <v-textarea
                        label="Add comments ..."
                        color="#26A69A"
                        name="input-7-1"
                        v-model="culture_comment"
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <v-switch
                        color="#42a78f"
                        v-model="culture_type"
                        :label="`options: ${culture_type}`"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-btn color="success" @click="e1 = 2" class="text-lowercase">step 2 ></v-btn>
            </v-container>
          </v-stepper-content>
          <!-- PART 2  -->
          <v-stepper-content step="2">
            <v-container>
              <v-card class="mb-12" elevation="5">
                <v-toolbar color="#0e9e5f" dense>
                  <v-toolbar-title class="subtitle-1">Select your strains</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-container class="pa-5 ml-3">
                  <v-row align="center">
                    <v-col cols="4">
                      <v-select
                        :items="strain"
                        :hint="`bloom : ${selectedStrain.strain_bloom} days, thc : ${selectedStrain.thc_ratio} %, type : ${selectedStrain.idstraintype}`"
                        color="#26A69A"
                        name="selectedStrain"
                        placeholder="Strain"
                        dense
                        v-model="selectedStrain"
                        prepend-icon="eco"
                        item-value="idstrain"
                        item-text="strain_name"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-slider
                        class="ml-3"
                        color="green"
                        v-model="strain_quantity"
                        id="qte"
                        max="10"
                        thumb-color="#282828"
                        thumb-size="25"
                        label="Quantity"
                        step="1"
                        thumb-label="always"
                        ticks
                      ></v-slider>
                    </v-col>
                    <v-col cols="2">
                      <toggle-button
                        class="ml-3"
                        v-model="strain_base"
                        @change="onChangeEventHandler"
                        :value="true"
                        color="#42a577"
                        :sync="true"
                        :speed="100"
                        :width="100"
                        :height="25"
                        :font-size="12"
                        :labels="{checked: 'Seed', unchecked: 'Clone'}"
                      ></toggle-button>
                    </v-col>

                    <v-col cols="1"></v-col>
                    <v-col cols="2">
                      <v-btn class="text-lowercase" @click="addStrain">Add strain</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-card class="mx-auto mt-5 pa-3" elevation="8">
                      <v-list>
                        <p class="green--text">
                          <v-icon color="grey" class="mr-2">link</v-icon>Strains selected
                        </p>
                        <v-list-item-group>
                          <v-list-item
                            v-for="strainSelected in strainList"
                            :key="strainSelected.id"
                          >
                            <v-list-item-icon>
                              <v-icon
                                color="grey"
                                v-on:click="deleteTask(strainSelected)"
                              >delete_forever</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <div class="body-2">
                                <span>{{strainSelected.strain_quantity}} {{strainSelected.baseDisplay}}(s) of {{ strainSelected.description }}</span>
                              </div>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </v-row>
                </v-container>
              </v-card>
              <v-btn color="success" @click="e1 = 3" class="text-lowercase">Step3 ></v-btn>
            </v-container>
          </v-stepper-content>
          <!-- SAVE SULTURE  -->
          <v-stepper-content step="3">
            <v-container class="pa-5">
              <v-row class="d-flex justify-end pb-5">
                <v-bottom-sheet v-model="sheet">
                  <v-sheet class="text-center" height="200px">
                    <v-container class="green--text text-uppercase">
                      <span>Success</span>
                    </v-container>
                    <div>
                      <span>A new culture has been created with this id : {{idculture}}, you can edit it now</span>
                    </div>
                    <div>
                      <router-link :to="{name: 'editculture', params: {idculture: idculture}}">
                        <v-btn class="text-lowercase mt-6 success">Start to edit</v-btn>
                      </router-link>
                      <v-btn
                        class="text-lowercase mt-6 ml-4 success"
                        @click="sheet = !sheet"
                      >edit later</v-btn>
                    </div>
                  </v-sheet>
                </v-bottom-sheet>
                <v-btn v-if="!idculture" @click="saveCulture" class="text-lowercase">Save culture</v-btn>
                <router-link
                  v-if="idculture"
                  :to="{name: 'editculture', params: {idculture: idculture}}"
                >
                  <v-btn class="text-lowercase success">Start to edit</v-btn>
                </router-link>
              </v-row>
              <v-row>
                <v-col>
                  <v-card max-width="300" elevation="8">
                    <v-toolbar color="#0e9e5f" dense>
                      <span style="color:rgb(231, 231, 231);">Culture profile</span>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Culture name</v-list-item-title>
                        <v-list-item-subtitle>{{this.culture_name}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Culture start date</v-list-item-title>
                        <v-list-item-subtitle>{{this.culture_start_date}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Culture comments</v-list-item-title>
                        <v-list-item-subtitle>{{this.culture_comment}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Culture state</v-list-item-title>
                        <v-list-item-subtitle>{{this.culture_state}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Culture end date</v-list-item-title>
                        <v-list-item-subtitle>...{{this.culture_end_date}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Start cycle</v-list-item-title>
                        <v-list-item-subtitle>on {{this.culture_start_date}} in {{selectedCycle.cycle_name}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title>Culture type</v-list-item-title>
                        <v-list-item-subtitle>{{selectedCultureType.culture_type}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card max-width="300" elevation="8">
                    <v-toolbar color="#0e9e5f" dense>
                      <span style="color:rgb(231, 231, 231);">Fertilizers</span>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title class="pb-2">Fertilizers</v-list-item-title>
                        <v-list-item-subtitle v-for="fertil in juiceArrayName" :key="fertil.id">
                          <span>{{fertil}}</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title class="pb-2">Boosters</v-list-item-title>
                        <v-list-item-subtitle v-for="boost in boosterArrayName" :key="boost.id">
                          <span>{{boost}}</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title class="pb-2">Options</v-list-item-title>
                        <v-list-item-subtitle>{{this.culture_type}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card max-width="300" elevation="8">
                    <v-toolbar color="#0e9e5f" dense>
                      <span style="color:rgb(231, 231, 231);">Strains</span>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-title class="pb-2">Selected strains</v-list-item-title>
                        <v-list-item-subtitle v-for="strainSel in strainList" :key="strainSel.id">
                          <span>{{strainSel.strain_quantity}} {{strainSel.baseDisplay}} of {{strainSel.description}}</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
              <v-btn color="success" @click="e1 = 1" class="mt-5 text-lowercase">previous</v-btn>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-container>
</template>

<script>
import Api from "@/api.js";
import alertMe from "@/components/AlertDialog.vue";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Multiselect from "vue-multiselect";
import { ToggleButton } from "vue-js-toggle-button";
export default {
  name: "NewCulture",
  components: {
    alertMe,
    Multiselect,
    ToggleButton
  },
  data() {
    return {
      sheet: false,
      e1: 0,
      menu: false,
      idculture: "",
      juice: [],
      selectedJuice: null,
      idjuiceArray: [],
      booster: [],
      idboosterArray: [],
      selectedBoost: null,
      juiceArrayName: [],
      boosterArrayName: [],
      cycle: [],
      selectedCycle: [],

      cultureType: [],
      selectedCultureType: [],

      strain: [],
      selectedStrain: [],
      strain_quantity: 0,
      strain_base: true,
      strainSelected: [],
      strainList: [],
      strainListCounter: "",

      culture_type: true,
      culture_name: "",
      culture_start_date: new Date().toISOString().substr(0, 10),
      culture_comment: "",
      culture_state: "init",
      culture_end_date: "",
      idculturetype: ""
    };
  },
  methods: {
    // multiSelect booster functions
    onSelect: function(selectedBoost) {
      this.idboosterArray.push(selectedBoost.idbooster);
      this.boosterArrayName.push(selectedBoost.booster_name);
    },
    onRemove: function(selectedBoost) {
      this.idboosterArray = this.idboosterArray.filter(function(t) {
        return t !== selectedBoost.idbooster;
      });
      this.boosterArrayName = this.boosterArrayName.filter(function(t) {
        return t !== selectedBoost.booster_name;
      });
    },
    // multiSelect juice functions
    onSelectJuice: function(selectedJuice) {
      this.idjuiceArray.push(selectedJuice.idjuice);
      this.juiceArrayName.push(selectedJuice.juice_name);
    },
    onRemoveJuice: function(selectedJuice) {
      this.idjuiceArray = this.idjuiceArray.filter(function(t) {
        return t !== selectedJuice.idjuice;
      });
      this.juiceArrayName = this.juiceArrayName.filter(function(t) {
        return t !== selectedJuice.juice_name;
      });
    },
    // Toggle Button seed-clones
    onChangeEventHandler: function(value) {
      this.strain_base = value.value;
    },
    // add strain in Table strainList
    addStrain: function() {
      this.strainListCounter++;
      if (this.strain_base === true) {
        this.baseDisplay = "Seed";
      } else {
        this.baseDisplay = "Clone";
      }
      this.strainList.push({
        id: this.strainListCounter,
        idstrain: this.selectedStrain.idstrain,
        strain_base: this.strain_base,
        strain_quantity: this.strain_quantity,
        baseDisplay: this.baseDisplay,
        description: this.selectedStrain.strain_name
      });
    },
    // Delete a strain from strainList
    deleteTask: function(strainSelected) {
      this.strainList = this.strainList.filter(function(t) {
        return t.id !== strainSelected.id;
      });
    },
    //Selected strain Table edit
    switchMode: function(strainSelected) {
      strainSelected.isInEditMode = !strainSelected.isInEditMode;
    },
    // Alert message method
    alertDialog(message) {
      this.$refs.alertMe
        .open("Error", message, {
          color: "red"
        })
        .then(cancel => {});
    },
    saveCulture: function() {
      if (this.idjuiceArray.length === 0 || this.culture_name === "") {
        this.alertDialog(
          " The name of the culture or the fertilizers are needed ! "
        );
      } else if (this.strainList.length === 0) {
        this.alertDialog(" You need to select strains ! ");
      } else if (this.selectedCycle.length === 0) {
        this.alertDialog(" You need to select a cycle ! ");
      } else {
        let cultureObject = {
          culture_name: this.culture_name,
          culture_start_date: this.culture_start_date,
          culture_comment: this.culture_comment,
          culture_state: this.culture_state,
          culture_end_date: null,
          idculturetype: this.selectedCultureType.idculturetype
        };
        Api()
          .post("culture/create/", cultureObject)
          .then(response => {
            if (response.data.status == "success") {
              this.culturePanel = response.data;
              let idculture = response.data.result.insertId;
              // insert in culturecycle with new idculture
              Api()
                .post("culture/culturecycle/create/", {
                  idcycle: this.selectedCycle.idcycle,
                  idculture: idculture,
                  culture_cycle_date: this.culture_start_date
                })
                .then(response => {
                  if (response.data.status == "success") {
                    this.idculture = idculture;
                    // create an array with the new idculture and all idstrain selected, to insert to culturestrain
                    var new_cultureStrain = [];
                    for (let i = 0; i < this.strainList.length; i++) {
                      new_cultureStrain.push({
                        idstrain: this.strainList[i].idstrain,
                        idculture: idculture,
                        strain_base: this.strainList[i].baseDisplay,
                        strain_quantity: this.strainList[i].strain_quantity
                      });
                    }
                    Api()
                      .post("culture/cultureStrain/create/", {
                        new_cultureStrain
                      })
                      .then(response => {
                        if (response.data.status == "success") {
                        } else {
                          this.alertDialog(
                            " Error message from API : " + response.data.error,
                            response.data.error
                          );
                        }
                      })
                      .catch(error => {
                        this.alertDialog(" Error message from API : " + error);
                      });
                    // create an array with the new idculture and all idboosters selected, to insert to culturebooster
                    var new_cultureBooster = [];
                    for (let i = 0; i < this.idboosterArray.length; i++) {
                      new_cultureBooster.push({
                        idbooster: this.idboosterArray[i],
                        idculture: idculture
                      });
                    }
                    Api()
                      .post("culture/culturebooster/create/", {
                        new_cultureBooster
                      })
                      .then(response => {
                        if (response.data.status == "success") {
                        } else {
                          this.alertDialog(
                            " Error message from API : " + response.data.error,
                            response.data.error
                          );
                        }
                      })
                      .catch(error => {
                        this.alertDialog(" Error message from API : " + error);
                      });
                    // create an array with the new idculture and all idjuice selected, to insert to culturejuice
                    var new_cultureJuice = [];
                    for (let i = 0; i < this.idjuiceArray.length; i++) {
                      new_cultureJuice.push({
                        idjuice: this.idjuiceArray[i],
                        idculture: idculture
                      });
                    }
                    Api()
                      .post("culture/culturejuice/create/", {
                        new_cultureJuice
                      })
                      .then(response => {
                        if (response.data.status == "success") {
                        } else {
                          this.alertDialog(
                            " Error message from API : " + response.data.error,
                            response.data.error
                          );
                        }
                      })
                      .catch(error => {
                        this.alertDialog(" Error message from API : " + error);
                      });
                    this.sheet = !this.sheet;
                  } else {
                    this.alertDialog(
                      " Error message from API : " + response.data.message
                    );
                  }
                })
                .catch(error => {
                  this.alertDialog(" Error message from API : " + error);
                });
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
          .catch(error =>
            console.log("Error! Could not reach the API. " + error)
          );
      }
    }
  },
  created: function() {
    Api()
      .get("juice")
      .then(response => (this.juice = response.data.result))
      .catch(
        error => (this.juice = `Error! Could not reach the API. ${error}`)
      );
    Api()
      .get("booster")
      .then(response => (this.booster = response.data.result))
      .catch(
        error => (this.booster = `Error! Could not reach the API. ${error}`)
      );
    Api()
      .get("strain")
      .then(response => (this.strain = response.data.result))
      .catch(
        error => (this.strain = `Error! Could not reach the API. ${error}`)
      );
    Api()
      .get("culture/cycle")
      .then(response => (this.cycle = response.data.result))
      .catch(
        error => (this.cycle = `Error! Could not reach the API. ${error}`)
      );
    Api()
      .get("culture/type")
      .then(response => (this.cultureType = response.data.result))
      .catch(
        error => (this.cultureType = `Error! Could not reach the API. ${error}`)
      );
  }
};
</script>
<style >
a {
  text-decoration: none;
}
.multiselect__input {
  background-color: #424242;
}
.multiselect__select {
  background-color: #424242;
}
.multiselect__content {
  font-size: 13px;
  color: white;
  background-color: #424242;
}
.multiselect__tags {
  background-color: #424242;
  font-size: 13px;
}
.v-list-item--link:before:hover {
  background-color: #303030;
}

.multiselect__content-wrapper {
  background-color: #303030;
  position: relative;
}
.multiselect__option--highlight {
  background-color: #3b3b3b;
}
</style>
