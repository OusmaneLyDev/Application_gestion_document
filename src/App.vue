<template>
  <div id="app" class="sb-nav-fixed">
    <UserNotification ref="notification" /> <!-- Utilisation du composant ici -->
    <AppNavbar @toggleSidebar="toggleSidebar" :utilisateur="utilisateur" />
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav" :class="{ 'd-none': !sidebarVisible }">
        <AppSidebar />
      </div>
      <div id="layoutSidenav_content">
        <main class="container-fluid px-4">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppSidebar from './components/AppSidebar.vue';
// import AppFooter from './components/AppFooter.vue';
import UserNotification from './components/UserNotification.vue'; 
import axios from 'axios'; // Importation d'axios pour les requêtes

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppSidebar,
    // AppFooter,
    UserNotification, 
  },
  data() {
    return {
      sidebarVisible: true,
      utilisateur: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    async fetchUtilisateur() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const response = await axios.get('http://localhost:3051/api/utilisateurs', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.utilisateur = response.data.utilisateur;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    },
  },
  created() {
    this.fetchUtilisateur(); 
  },
};
</script>

<style>
#app {
  background-color: white;
}
#layoutSidenav {
  display: flex;
}
#layoutSidenav_content {
  flex-grow: 1;
  overflow-x: hidden;
}
.d-none {
  display: none;
}
</style>
