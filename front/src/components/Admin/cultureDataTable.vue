<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row>
      <v-container>
        <alertMe ref="alertMe"></alertMe>
        <v-data-table :headers="headers" :items="Allcultures" class="elevation-6">
          <template v-slot:top>
            <v-toolbar class="elevation-1">
              <v-toolbar-title class="orange--text subtitle-2">Cultures List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn class="mb-2 text-lowercase" v-on="on">Add new</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.idculture" label="idculture"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.culture_name" label="culture_name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.culture_start_date"
                            label="culture_start_date"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.culture_comment"
                            label="culture_comment"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.culture_state" label="culture_state"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.culture_end_date"
                            label="culture_end_date"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.idculturetype" label="idculturetype"></v-text-field>
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
            <v-icon small class="mr-2" @click="editCulture(item)">edit</v-icon>
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
  name: "cultureDataTable",
  components: {
    alertMe
  },

  data() {
    return {
      Allcultures: [],
      dialog: false,
      headers: [
        {
          text: "id",
          align: "left",
          sortable: false,
          value: "idculture"
        },
        {
          text: "Name",
          value: "culture_name"
        },
        {
          text: "Start date",
          value: "culture_start_date"
        },
        {
          text: "Comments",
          value: "culture_comment"
        },
        {
          text: "State",
          value: "culture_state"
        },
        {
          text: "End date",
          value: "culture_end_date"
        },
        {
          text: "Type",
          value: "idculturetype"
        },
        {
          text: "Actions",
          value: "action",
          sortable: false
        }
      ],
      editedIndex: -1,
      editedItem: {
        idculture: "",
        culture_name: "",
        culture_start_date: "",
        culture_comment: "",
        culture_state: "",
        culture_end_date: "",
        idculturetype: ""
      },
      defaultItem: {
        idculture: "",
        culture_name: "",
        culture_start_date: "",
        culture_comment: "",
        culture_state: "",
        culture_end_date: "",
        idculturetype: ""
      }
    };
  },
  computed: {
    formTitle: function() {
      return this.editedIndex === -1 ? "Add culture" : "Edit culture";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    // Open Update form dialog and display data to update
    editCulture(item) {
      this.editedIndex = this.Allcultures.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // Update on Database
    editItem(editedItem) {
      Api()
        .put("culture/update/" + editedItem.idculture, editedItem)
        .then(response => {
          if (response.data.status == "success") {
            this.Allcultures = response.data.result;
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
      const indexLine = this.Allcultures.indexOf(item);
      // idculture of the line
      const index = item.idculture;
      Api()
        .delete("culture/delete/" + index)
        .then(response => this.$emit("updateList"))
        .then(response => (this.Allcultures = response.data.result))
        .catch(
          error =>
            (this.Allcultures = `Error! Could not reach the API. ${error}`)
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
        .open("Save Culture", "Do you want to save this culture ? ", {
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
          "Delete Culture",
          "Are you sure you want to delete this id ? " + item.idculture,
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
        .post("culture/create/", editedItem)
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
          this.Allcultures = `${error}., Could not reach the API.`;
          this.alertDialog(this.Allcultures);
        });
      this.close();
    }
  },
  created: function() {
    Api()
      .get("culture")
      .then(response => (this.Allcultures = response.data.result))
      .catch(
        error => (this.Allcultures = `Error! Could not reach the API. ${error}`)
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
