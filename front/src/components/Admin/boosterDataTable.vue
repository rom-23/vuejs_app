<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row>
      <v-container>
        <alertMe ref="alertMe"></alertMe>
        <v-data-table :headers="headers" :items="Allboosters" class="elevation-5">
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title class="subtitle-2 orange--text">Boosters</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn class="mb-2 text-lowercase" v-on="on">Add booster</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.idbooster" label="idbooster"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.booster_name" label="booster_name"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.booster_dose" label="booster_dose"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.boosterdesc" label="boosterdesc"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="editedItem.booster_date"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.booster_date"
                                label="date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.booster_date" no-title>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(editedItem.booster_date)"
                              >OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>

                    <v-btn color="blue darken-1" text @click="confirmSaveDialog(editedItem)">Save</v-btn>

                    <v-btn color="blue darken-1" text @click="editItem(editedItem)">Update</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editBooster(item)">edit</v-icon>
            <v-icon small @click="confirmDialog(item)">delete</v-icon>
          </template>
          <template v-slot:no-data>
            <span class="orange--text caption">No data</span>
          </template>
        </v-data-table>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Api from "@/api.js";
import alertMe from "@/components/AlertDialog.vue";
export default {
  name: "boosterDataTable",
  components: {
    alertMe
  },

  data() {
    return {
      menu: false,
      Allboosters: [],
      dialog: false,
      headers: [
        {
          text: "id",
          align: "left",
          sortable: false,
          value: "idbooster"
        },
        {
          text: "Name",
          value: "booster_name"
        },

        {
          text: "ml / L",
          value: "booster_dose"
        },
        {
          text: "Description",
          value: "boosterdesc"
        },
        {
          text: "Buy on",
          value: "booster_date"
        },
        {
          text: "Actions",
          value: "action",
          sortable: false
        }
      ],
      editedIndex: -1,
      editedItem: {
        idbooster: "",
        booster_name: "",

        booster_dose: "",
        boosterdesc: "",
        booster_date: new Date().toISOString().substr(0, 10)
      },
      defaultItem: {
        idbooster: "",
        booster_name: "",

        booster_dose: "",
        boosterdesc: "",
        booster_date: ""
      }
    };
  },
  computed: {
    formTitle: function() {
      return this.editedIndex === -1 ? "Add booster" : "Edit booster";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    // Open Update form dialog and display data to update
    editBooster(item) {
      this.editedIndex = this.Allboosters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // Update on Database
    editItem(editedItem) {
      Api()
        .put("booster/update/" + editedItem.idbooster, editedItem)
        .then(response => {
          if (response.data.status == "success") {
            this.Allboosters = response.data.result;
            this.$emit("updateList");
          } else if (response.data.status == "error") {
            this.alertDialog(
              " Error message from API : " + response.data.message
            );
          } else {
            this.alertDialog(response.data.error);
          }
        });
    },

    deleteItem(item) {
      // line on the table
      const indexLine = this.Allboosters.indexOf(item);
      // idbooster of the line
      const index = item.idbooster;
      Api()
        .delete("booster/delete/" + index)
        .then(response => this.$emit("updateList"))
        .then(response => (this.Allboosters = response.data.result))
        .catch(
          error =>
            (this.Allboosters = `Error! Could not reach the API. ${error}`)
        );
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 200);
    },
    // Confirm SAVE
    confirmSaveDialog(editedItem) {
      this.$refs.alertMe
        .open("Save Fertilizer", "Do you want to save this fertilizer ? ", {
          color: "success"
        })
        .then(confirm => {
          this.save(editedItem);
        });
    },
    // Confirm DELETE
    confirmDialog(item) {
      this.$refs.alertMe
        .open(
          "Delete Booster",
          "Are you sure you want to delete this id ? " + item.idbooster,
          {
            color: "orange"
          }
        )
        .then(confirm => {
          this.deleteItem(item);
        });
    },
    // Alert message method
    alertDialog(message) {
      this.$refs.alertMe
        .open("Error", message, {
          color: "red"
        })
        .then(cancel => {});
    },
    save(editedItem) {
      Api()
        .post("booster/create/", editedItem)
        .then(response => {
          if (response.data.status == "success") {
            console.log(response.data.result);
            this.$emit("updateList");
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
          this.Allboosters = `${error}., Could not reach the API.`;
          this.alertDialog(this.Allboosters);
        });
      this.close();
    }
  },
  created: function() {
    Api()
      .get("booster")
      .then(response => (this.Allboosters = response.data.result))
      .catch(
        error => (this.Allboosters = `Error! Could not reach the API. ${error}`)
      );
  }
};
</script>
<style scoped>
span {
  color: #00887b;
  font-size: 16px;
}

a:hover {
  text-decoration: none;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
