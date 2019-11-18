import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/Home/Main.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/cutting',
      name: 'cutting',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/Cutting/Cutting.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/new',
      name: 'new',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/NewCulture/NewCulture.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/editculture/:idculture',
      name: 'editculture',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/EditCulture/EditCulture.vue'),
        right: () => import('./components/EditCulture/RightCardCulture.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
      children: [
        {
          path: 'editculture.measure',
          name: 'measure',
          component: () => import('./components/EditCulture/Measure.vue'),
        },
        {
          path: 'editculture.charts',
          name: 'charts',
          component: () => import('./components/EditCulture/Graphs.vue'),
        },
      ],
    },
    {
      path: '/calendar',
      name: 'calendar',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/Calendar.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/journal',
      name: 'journal',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/GrowJournal.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/gallery',
      name: 'gallery',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/Gallery.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/stats',
      name: 'stats',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/Stats.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/strainpage/:idstrain',
      name: 'strainpage',
      components: {
        navbar: () => import('./components/Home/NavBar.vue'),
        main: () => import('./components/StrainPage.vue'),
        right: () => import('./components/Home/RightCard.vue'),
        left: () => import('./components/Home/SearchCulture.vue'),
        left2: () => import('./components/Home/Strains.vue'),
      },
    },
    {
      path: '/admin',
      name: 'admin',
      components: {
        navbar: () => import('./components/Admin/NavBarAdmin.vue'),
        main: () => import('./components/Admin/MainAdmin.vue'),
        right: () => import('./components/Admin/AdminDashboard.vue'),
        left: () => import('./components/Admin/AdminSearch.vue'),
        // left2: () => import('./components/Strains.vue'),
      },
    },
    {
      path: '/adminculture',
      name: 'adminculture',
      components: {
        navbar: () => import('./components/Admin/NavBarAdmin.vue'),
        main: () => import('./components/Admin/AdminCulture.vue'),
        right: () => import('./components/Admin/AdminDashboard.vue'),
        left: () => import('./components/Admin/AdminSearch.vue'),
        // left2: () => import('./components/Strains.vue'),
      },
    },
    {
      path: '/adminjuice',
      name: 'adminjuice',
      components: {
        navbar: () => import('./components/Admin/NavBarAdmin.vue'),
        main: () => import('./components/Admin/AdminJuice.vue'),
        right: () => import('./components/Admin/AdminDashboard.vue'),
        left: () => import('./components/Admin/AdminSearch.vue'),
        // left2: () => import('./components/Strains.vue'),
      },
    },
    {
      path: '/adminstrain',
      name: 'adminstrain',
      components: {
        navbar: () => import('./components/Admin/NavBarAdmin.vue'),
        main: () => import('./components/Admin/AdminStrain.vue'),
        right: () => import('./components/Admin/AdminDashboard.vue'),
        left: () => import('./components/Admin/AdminSearch.vue'),
        // left2: () => import('./components/Strains.vue'),
      },
    },
  ],
});
