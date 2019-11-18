<template>
  <div id="app">
    <v-app light>
      <v-navigation-drawer v-model="drawer" app clipped width="300" :key="componentKey">
        <v-img :src="require('@/assets/logo.png')" width="80" class="ml-4 mt-5 mb-6"></v-img>
        <router-view name="left"></router-view>
        <router-view name="left2"></router-view>
        <v-container class="mt-5">
          <v-img
            class="mx-auto"
            :src="require('@/assets/Transparent-background-you-grow-she-grows.png')"
            max-width="150"
          ></v-img>
        </v-container>
      </v-navigation-drawer>

      <v-app-bar app color="#0e9358" clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link tag="a" exact :to="{name: 'home'}">
            <v-btn
              color="transparent"
              class="text-lowercase"
              depressed
              @click="componentKey+=1"
            >GrowUp App</v-btn>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>perm_identity</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>https</v-icon>
        </v-btn>
        <router-link :to="{name: 'admin'}">
          <v-btn color="transparent" class="text-lowercase" depressed @click="componentKey+=1">Admin</v-btn>
        </router-link>
      </v-app-bar>

      <v-content>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs9>
              <router-view name="navbar"></router-view>
              <router-view name="main"></router-view>
            </v-flex>

            <v-flex>
              <router-view name="right"></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <!-- 
      <v-footer app padless height="50">
        <v-col class="text-center" cols="12">
          <span class="white--text subtitle-2">Copyright © GrowUp App 3.0</span>
        </v-col>
      </v-footer>-->
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  props: {},
  data: () => ({
    drawer: null,
    componentKey: 0
  })
};
</script>
<style scoped>
a {
  text-decoration: none;
}
#app {
  /* background-color: #2a2d2c; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
