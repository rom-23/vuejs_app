<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row>
      <v-container>
        <alertMe ref="alertMe"></alertMe>
        <v-data-table :headers="headers" :items="Alljuices" class="elevation-5">
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title class="subtitle-2 orange--text">Fertilizers</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn class="mb-2 text-lowercase" v-on="on">Add fertilizer</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.idjuice" label="idjuice"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.juice_name" label="juice_name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.juice_origin" label="juice_origin"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.juice_dose" label="juice_dose"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="editedItem.juice_date"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.juice_date"
                                label="juice date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.juice_date" no-title>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(editedItem.juice_date)"
                              >OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.juice_type" label="juice_type"></v-text-field>
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
            <v-icon small class="mr-2" @click="editJuice(item)">edit</v-icon>
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
  name: "juiceDataTable",
  components: {
    alertMe
  },

  data() {
    return {
      menu: false,
      Alljuices: [],
      dialog: false,
      headers: [
        {
          text: "id",
          align: "left",
          sortable: false,
          value: "idjuice"
        },
        {
          text: "Name",
          value: "juice_name"
        },
        {
          text: "Origin",
          value: "juice_origin"
        },
        {
          text: "ml / L",
          value: "juice_dose"
        },
        {
          text: "Buy on",
          value: "juice_date"
        },
        {
          text: "Type",
          value: "juice_type"
        },
        {
          text: "Actions",
          value: "action",
          sortable: false
        }
      ],
      editedIndex: -1,
      editedItem: {
        idjuice: "",
        juice_name: "",
        juice_origin: "",
        juice_dose: "",
        juice_date: new Date().toISOString().substr(0, 10),
        juice_type: ""
      },
      defaultItem: {
        idjuice: "",
        juice_name: "",
        juice_origin: "",
        juice_dose: "",
        juice_date: "",
        juice_type: ""
      }
    };
  },
  computed: {
    formTitle: function() {
      return this.editedIndex === -1 ? "Add fertilizer" : "Edit fertilizer";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    // Open Update form dialog and display data to update
    editJuice(item) {
      this.editedIndex = this.Alljuices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // Update on Database
    editItem(editedItem) {
      Api()
        .put("juice/update/" + editedItem.idjuice, editedItem)
        .then(response => {
          if (response.data.status == "success") {
            this.Alljuices = response.data.result;
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
      const indexLine = this.Alljuices.indexOf(item);
      // idjuice of the line
      const index = item.idjuice;
      Api()
        .delete("juice/delete/" + index)
        .then(response => this.$emit("updateList"))
        .then(response => (this.Alljuices = response.data.result))
        .catch(
          error => (this.Alljuices = `Error! Could not reach the API. ${error}`)
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
          "Delete Fertilizer",
          "Are you sure you want to delete this id ? " + item.idjuice,
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
        .post("juice/create/", editedItem)
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
          this.Alljuices = `${error}., Could not reach the API.`;
          this.alertDialog(this.Alljuices);
        });
      this.close();
    }
  },
  created: function() {
    Api()
      .get("juice")
      .then(response => (this.Alljuices = response.data.result))
      .catch(
        error => (this.Alljuices = `Error! Could not reach the API. ${error}`)
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
