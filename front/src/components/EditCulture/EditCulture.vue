<template>
  <v-container fluid>
    <v-card class="mx-auto pb-8">
      <v-toolbar color="#229e60" dense>
        <v-icon small>dashboard</v-icon>
        <v-toolbar-title class="subtitle-2 ml-4">Culture dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row class="pa-5">
        <v-col>
          <v-card max-width="250" elevation="5">
            <v-card-text>
              <v-toolbar color="#c9593a" dense>
                <span style="color:rgb(231, 231, 231);">Culture profile : {{idculture}}</span>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list-item two-line dense>
                <v-list-item-content v-for="culture in Allcultures" :key="culture.idculture">
                  <v-list-item-title>Status : {{culture.culture_state}}</v-list-item-title>
                  <v-list-item-title class="pt-2">Culture name :</v-list-item-title>
                  <v-list-item-subtitle class="pb-2">{{culture.culture_name}}</v-list-item-subtitle>
                  <v-list-item-title>Culture start date :</v-list-item-title>
                  <v-list-item-subtitle class="pb-2">{{culture.culture_start_date}}</v-list-item-subtitle>
                  <v-list-item-title>Culture type :</v-list-item-title>
                  <v-list-item-subtitle class="pb-2">{{culture.culture_type}}</v-list-item-subtitle>
                  <v-list-item-title>Comments :</v-list-item-title>
                  <v-list-item-subtitle>{{culture.culture_comment}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn icon tag="button">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'expand_less' : 'add' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col>
          <v-card max-width="250" elevation="5">
            <v-card-text>
              <v-toolbar color="#0277BD" dense>
                <span style="color:rgb(231, 231, 231);">Culture Strains</span>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list-item two-line dense>
                <v-list-item-content>
                  <v-list-item-title>Culture strains</v-list-item-title>
                  <v-list-item-content
                    v-for="strainculture in Allstrain"
                    :key="strainculture.id"
                    class="#6d6c6c--text caption"
                  >{{strainculture.strain_type}} : {{strainculture.strain_quantity}} {{strainculture.strain_base}}(s) of {{strainculture.strain_name}}</v-list-item-content>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn icon tag="button">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon @click="show2 = !show2">
                <v-icon>{{ show2 ? 'expand_less' : 'add' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show2">
                <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col>
          <v-card max-width="250" elevation="5">
            <v-card-text>
              <v-toolbar color="#ad4861" dense>
                <span style="color:rgb(231, 231, 231);">Fertilizes / Boosters</span>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list-item two-line dense>
                <v-list-item-content>
                  <v-list-item-title class="pb-2">Fertilizers</v-list-item-title>
                  <v-list-item-subtitle
                    v-for="juiceculture in Alljuice"
                    :key="juiceculture.idjuice"
                  >
                    <span>{{juiceculture.juice_name}} for {{juiceculture.juice_type}}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line dense>
                <v-list-item-content>
                  <v-list-item-title class="pb-2">Boosters</v-list-item-title>
                  <v-list-item-subtitle
                    v-for="boosterculture in Allbooster"
                    :key="boosterculture.idbooster"
                  >
                    <span>{{boosterculture.booster_name}}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn icon tag="button">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon @click="show3 = !show3">
                <v-icon>{{ show3 ? 'expand_less' : 'add' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show3">
                <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col>
          <v-card max-width="250" elevation="5">
            <v-card-text>
              <v-toolbar color="#4756aa" dense>
                <span style="color:rgb(231, 231, 231);">Culture Cycle</span>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list-item two-line dense>
                <v-list-item-content>
                  <v-list-item-title class="pb-2">Cycles</v-list-item-title>
                  <v-list-item-subtitle
                    v-for="cycleculture in Allcycle"
                    :key="cycleculture.idcycle"
                  >
                    <span>{{cycleculture.cycle_name}} on {{cycleculture.culture_cycle_date}}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn icon tag="button">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon @click="show4 = !show4">
                <v-icon>{{ show4 ? 'expand_less' : 'add' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show4">
                <v-card-text>
                  <v-timeline align-top class="grey--text caption">
                    <v-timeline-item small color="green">timeline item</v-timeline-item>
                    <v-timeline-item small color="green" class="text-right">timeline item</v-timeline-item>
                    <v-timeline-item small color="green">timeline item</v-timeline-item>
                  </v-timeline>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="mb-7"></v-divider>
      <v-row>
        <v-card class="mx-auto" max-width="344" outlined elevation="2">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4 orange--text">Ph an Ec update</div>
              <v-list-item-subtitle>Edit the ph and ec values, update the boosters doses</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <router-link tag="a" exact :to="{name: 'measure'}">
              <v-btn class="text-lowercase">Edit</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto" max-width="344" outlined elevation="2">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4 orange--text">Charts and tables</div>
              <v-list-item-subtitle>Create and display charts for your culture, and display the results on sortable tables</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <router-link tag="a" exact :to="{name: 'charts'}">
              <v-btn class="text-lowercase">Charts</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-row>
      <router-view></router-view>
    </v-card>
  </v-container>
</template>
<script>
import Api from "@/api.js";
export default {
  name: "EditCulture",
  components: {},
  data() {
    return {
      show: false,
      show2: false,
      show3: false,
      show4: false,
      idculture: "",
      Allcultures: [],
      Allstrain: [],
      Alljuice: [],
      Allbooster: [],
      Allcycle: []
    };
  },
  mounted() {},
  computed: {},
  watch: {
    "$route.params.idculture": function(idculture) {
      this.idculture = this.$route.params.idculture;
      this.getCulture(this.idculture);
    }
  },
  methods: {
    getCulture: function() {
      Api()
        .get("culture/" + this.idculture)
        .then(response => {
          if (response.data.status == "success") {
            this.Allcultures = response.data.result;
          } else if (response.data.status == "error") {
            this.Allcultures = `Error! Could not reach the API. ${response.date.message}`;
          } else {
            this.Allcultures = `Error! Could not reach the API. ${response.date.error}`;
          }
        })
        .catch(
          error =>
            (this.Allcultures = `Error! Could not reach the API. ${error}`)
        );
      Api()
        .get("strain/byculture/" + this.idculture)
        .then(response => {
          if (response.data.status == "success") {
            this.Allstrain = response.data.result;
          } else if (response.data.status == "error") {
            this.Allstrain = `Error! Could not reach the API. ${response.date.message}`;
          } else {
            this.Allstrain = `Error! Could not reach the API. ${response.date.error}`;
          }
        })
        .catch(
          error => (this.Allstrain = `Error! Could not reach the API. ${error}`)
        );
      Api()
        .get("juice/byculture/" + this.idculture)
        .then(response => {
          if (response.data.status == "success") {
            this.Alljuice = response.data.result;
          } else if (response.data.status == "error") {
            this.Alljuice = `Error! Could not reach the API. ${response.date.message}`;
          } else {
            this.Alljuice = `Error! Could not reach the API. ${response.date.error}`;
          }
        })
        .catch(
          error => (this.Alljuice = `Error! Could not reach the API. ${error}`)
        );
      Api()
        .get("booster/byculture/" + this.idculture)
        .then(response => {
          if (response.data.status == "success") {
            this.Allbooster = response.data.result;
          } else if (response.data.status == "error") {
            this.Allbooster = `Error! Could not reach the API. ${response.date.message}`;
          } else {
            this.Allbooster = `Error! Could not reach the API. ${response.date.error}`;
          }
        })
        .catch(
          error =>
            (this.Allbooster = `Error! Could not reach the API. ${error}`)
        );
      Api()
        .get("culture/culturecycle/" + this.idculture)
        .then(response => {
          if (response.data.status == "success") {
            this.Allcycle = response.data.result;
          } else if (response.data.status == "error") {
            this.Allcycle = `Error! Could not reach the API. ${response.date.message}`;
          } else {
            this.Allcycle = `Error! Could not reach the API. ${response.date.error}`;
          }
        })
        .catch(
          error => (this.Allcycle = `Error! Could not reach the API. ${error}`)
        );
    }
  },
  created: function() {
    this.idculture = this.$route.params.idculture;
    this.getCulture(this.idculture);
  }
};
</script>
<style scoped>
button {
  background-color: #363636;
}
button:hover {
  background-color: #363636;
  border: 0.5px solid grey;
}

a {
  text-decoration: none;
}
</style>
