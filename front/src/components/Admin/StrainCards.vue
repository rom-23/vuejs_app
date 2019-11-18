<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page="page"
          :search="search"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <!-- Searching and sorting toobar -->
          <template v-slot:header>
            <v-toolbar>
              <v-text-field
                v-model="search"
                clearable
                flat
                hide-details
                label="Search"
                prepend-icon="search"
                class="grey--text body-1"
              ></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <div class="flex-grow-1"></div>
                <v-select
                  v-model="sortBy"
                  clearable
                  flat
                  hide-details
                  :items="keys"
                  prepend-icon="unfold_more"
                ></v-select>
                <div class="flex-grow-1"></div>
                <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn small depressed :value="false">
                    <v-icon>keyboard_arrow_up</v-icon>
                  </v-btn>
                  <v-btn small depressed :value="true">
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <alertMe ref="alertMe"></alertMe>
              <!-- Strains Cards Display -->
              <v-col v-for="item in props.items" :key="item.idstrain">
                <v-card elevation="9" min-width="300" max-width="350" class="mx-auto">
                  <v-card-title
                    class="orange--text subtitle-2 justify-center"
                  >{{ item.strain_name }}</v-card-title>
                  <v-divider></v-divider>

                  <v-list-item
                    two-line
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                    :color="sortBy === key ? `teal lighten-1` : `white`"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="white--text subtitle-2 pb-1">{{ key }}</v-list-item-title>
                      <v-list-item-content
                        class="align-end grey--text subtitle-2 pt-0 pb-0"
                      >{{ item[key]}}</v-list-item-content>
                    </v-list-item-content>
                  </v-list-item>

                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Edit strain</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.idstrain" label="idstrain"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.strain_name" label="strain_name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.strain_desc" label="strain_desc"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.strain_date" label="strain_date"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.strain_genetic"
                                label="strain_genetic"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.idstraintype" label="idstraintype"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.thc_ratio" label="thc_ratio"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.strain_bloom" label="strain_bloom"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.strain_origin"
                                label="strain_origin"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="updateStrain(editedItem)">Update</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <!-- button update a strain in database -->
                  <v-btn
                    class="mx-3 mb-4 mt-4"
                    fab
                    color="#1f52c1"
                    width="30"
                    height="30"
                    @click="editStrain(item)"
                  >
                    <v-icon small>edit</v-icon>
                  </v-btn>
                  <!-- button delete a strain in database -->
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    color="#1f52c1"
                    width="30"
                    height="30"
                    @click="confirmDialog(item.idstrain)"
                  >
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </template>
          <!-- footer du data-iterator -->
          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn dark text color="orange" class="ml-2" v-on="on">
                    {{ itemsPerPage }}
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <div class="flex-grow-1"></div>
              <span class="mr-4 grey--text subtitle-2">Page {{ page }} of {{ numberOfPages }}</span>
              <v-btn small class="mr-1" @click="formerPage">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
              <v-btn small class="ml-1" @click="nextPage">
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Api from "@/api.js";

import alertMe from "@/components/AlertDialog.vue";
export default {
  name: "StrainCards",
  components: {
    alertMe
  },
  data() {
    return {
      dialog: false,
      itemsPerPageArray: [3, 4, 6, 8, 12],
      search: "",
      sortDesc: true,
      page: 1,
      itemsPerPage: 12,
      sortBy: "idstrain",
      filter: {},
      keys: [
        "idstrain",
        "strain_name",
        "strain_desc",
        "strain_date",
        "strain_genetic",
        "idstraintype",
        "thc_ratio",
        "strain_bloom",
        "strain_origin"
      ],
      items: [],
      // Table for update Dialog Form
      editedIndex: -1,
      editedItem: {
        idstrain: "",
        strain_name: "",
        strain_desc: "",
        strain_date: "",
        strain_genetic: "",
        idstraintype: "",
        thc_ratio: "",
        strain_bloom: "",
        strain_origin: ""
      },
      defaultItem: {
        idstrain: "",
        strain_name: "",
        strain_desc: "",
        strain_date: "",
        strain_genetic: "",
        idstraintype: "",
        thc_ratio: "",
        strain_bloom: "",
        strain_origin: ""
      }
    };
  },
  mounted: function() {},
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    // Init data-iterator options
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `strain_name`);
    }
  },
  methods: {
    // Pagination of data-iterator
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    // Confirm method before to Delete strain
    confirmDialog(idstrain) {
      this.$refs.alertMe
        .open("Confirm", "Are you sure ? id n° " + idstrain, {
          color: "#f9a939"
        })
        .then(alertMe => {
          this.deleteStrain(idstrain);
        });
    },
    // Alert message for api error
    alertDialog(message) {
      this.$refs.alertMe
        .open("Error", message, {
          color: "red"
        })
        .then(cancel => {});
    },
    // Delete strain Method
    deleteStrain(idstrain) {
      Api()
        .delete("strain/delete/" + idstrain)
        .then(() => this.$emit("updateList"))
        .then(response => (this.items = response.data.result))
        .catch(
          error => (this.items = `Error! Could not reach the API. ${error}`)
        );
    },
    // Open Update form dialog and display data to update
    editStrain(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // Close Update form dialog
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 200);
    },
    // Update strain Method
    updateStrain(editedItem) {
      Api()
        .put("strain/update/" + editedItem.idstrain, editedItem)
        .then(response => {
          if (response.data.status == "success") {
            this.items = response.data.result;
            this.$emit("updateList");
          } else {
            this.alertDialog(response.data.error);
          }
        })
        .catch(
          error => (this.items = `Error! Could not reach the API. ${error}`)
        );
    }
  },
  // Init items from database , data-iterator will use items
  created: function() {
    Api()
      .get("strain")
      .then(response => (this.items = response.data.result))
      .catch(
        error => (this.items = `Error! Could not reach the API. ${error}`)
      );
  }
};
</script>
  <style scoped>
</style>
