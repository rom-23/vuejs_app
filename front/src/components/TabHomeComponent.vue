<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <v-tabs v-model="active" color="green" slider-color="green" class="pa-5">
          <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>
          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <v-card-text>
                {{ text }}
                <div class="text-xs-center mt-3">
                  <v-btn>next tab</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
      <v-flex xs6>
        <v-tabs v-model="active" color="green" slider-color="green" class="pa-5">
          <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>
          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <v-card-text>
                {{ text }}
                <div class="text-xs-center mt-3">
                  <v-btn>next tab</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "TabHomeComponent",
  components: {},
  data() {
    return {
      active: null,
      text:
        "GrowUp is the complete and most useful tool for plant growers. With logs, reminders, fertilizers, grow logs and more, you’ll surely succeed flawlessly from seed to harvest. This intuitive plant grower helper will make things truly easy and be your guidance and help throughout the whole harvest process. Ideal for cannabis growers.Make use of this amazing plant growing app and be proud of your plants"
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
