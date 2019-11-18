<template>
  <v-container fluid>
    <alertMe ref="alertMe"></alertMe>
    <v-data-table :headers="headers" :items="all_phec" sort-by="measure_date" class="elevation-1">
      <template v-slot:top>
        <v-toolbar class="elevation-2" dense>
          <v-toolbar-title class="body-1 green--text">Ph / Ec Table of measures</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="success" small dark class="mb-2 text-lowercase" v-on="on">options</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.measure_date" label="measure_date"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.measure_ec" label="measure_ec"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.measure_ph" label="measure_ph"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
      <template v-slot:no-data>
        <span class="orange--text">No data for this culture</span>
      </template>
    </v-data-table>
    <v-container>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="100">
          <v-container>
            <v-row class="justify-center">
              <span class="green--text text-uppercase">Success</span>
            </v-row>
            <v-row class="justify-center">
              <span>Ph and Ec deleted</span>
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
export default {
  name: "MeasuresDatatable",
  components: { alertMe },
  data() {
    return {
      sheet: false,
      idculture: "",
      all_phec: [],
      dialog: false,
      headers: [
        {
          text: "id",
          align: "left",
          sortable: true,
          value: "idmeasure"
        },
        {
          text: "Measure date",
          align: "left",
          sortable: true,
          value: "measure_date"
        },
        {
          text: "PH value",
          value: "measure_ph"
        },
        {
          text: "EC value",
          value: "measure_ec"
        },
        {
          text: "Actions",
          value: "action",
          sortable: false
        }
      ],
      all_phec: [],
      editedIndex: -1,
      editedItem: {
        idmeasure: 0,
        measure_date: "",
        measure_ph: 0,
        measure_ec: 0
      },
      defaultItem: {
        idmeasure: 0,
        measure_date: "",
        measure_ph: 0,
        measure_ec: 0
      }
    };
  },
  computed: {
    formTitle: function() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog: function(val) {
      val || this.close();
    }
  },
  methods: {
    // Alert message method
    alertDialog(message) {
      this.$refs.alertMe
        .open("Error", message, {
          color: "red"
        })
        .then(cancel => {});
    },
    editItem: function(item) {
      this.editedIndex = this.all_phec.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem: function(item) {
      const index = this.all_phec.indexOf(item);
      const id = item.idmeasure;
      Api()
        .delete("measure/delete/" + id)
        .then(response => {
          this.sheet = !this.sheet;
        })
        .then(() => this.all_phec.splice(index, 1))
        .catch(error => this.alertDialog(" Error message from API : " + error));
    },

    close: function() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save: function() {
      if (this.editedIndex > -1) {
        Object.assign(this.all_phec[this.editedIndex], this.editedItem);
      } else {
        this.all_phec.push(this.editedItem);
      }
      this.close();
    }
  },
  created: function() {
    this.idculture = this.$route.params.idculture;
    Api()
      .get("measure/byculture/" + this.idculture)
      .then(response => (this.all_phec = response.data.result))
      .catch(
        error => (this.all_phec = `Error! Could not reach the API. ${error}`)
      );
  }
};
</script>
<style scoped>
span {
  display: block;
  text-align: left;
}
</style>
