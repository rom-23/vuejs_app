<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>
        <router-link tag="a" exact :to="{name: 'admin'}">
          <v-btn icon>
            <v-icon color="#2c8c61">home_work</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="nav">
        <ul>
          <router-link tag="a" exact :to="{name: 'adminstrain'}">Strains</router-link>
          <router-link tag="a" exact :to="{name: 'adminculture'}">Culture</router-link>
          <router-link tag="a" exact :to="{name: 'adminjuice'}">Juices / Boosters</router-link>
        </ul>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "NavBarAdmin",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.nav a:hover,
.nav a.router-link-active,
.nav a.router-link-exact-active {
  cursor: pointer;
  color: rgb(35, 151, 116);
}
a {
  text-decoration: none;
}
.nav a {
  padding: 1em;
  color: rgb(209, 209, 209);
  text-decoration: none;
  font-size: 15px;
}
.nav {
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
</style>