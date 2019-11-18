<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title class="nav">
        <router-link tag="a" exact :to="{name: 'home'}">
          <v-btn icon>
            <v-icon color="#2c8c61">home_work</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="nav">
        <ul>
          <router-link tag="a" exact :to="{name: 'new'}">Start to grow</router-link>
          <router-link tag="a" exact :to="{name: 'cutting'}">Cutting zone</router-link>
          <router-link tag="a" exact :to="{name: 'stats'}">Statistics</router-link>
          <router-link tag="a" exact :to="{name: 'calendar'}">Calendar</router-link>
          <router-link tag="a" exact :to="{name: 'journal'}">Grow journal</router-link>
          <router-link tag="a" exact :to="{name: 'gallery'}">Gallery</router-link>
        </ul>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
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
.nav a {
  padding: 1em;
  color: rgb(218, 218, 218);
  text-decoration: none;
  font-size: 15px;
}
.nav {
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
</style>