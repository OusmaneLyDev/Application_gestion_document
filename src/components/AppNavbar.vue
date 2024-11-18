<template>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand ps-3" href="/">GED Application</a>
  
      <button
        class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        @click="$emit('toggleSidebar')"
      >
        <i class="fas fa-bars"></i>
      </button>
  
      <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="btnNavbarSearch"
          />
          <button class="btn btn-primary" id="btnNavbarSearch" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>
  
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-user fa-fw"></i>
            <span v-if="isLoggedIn">{{ userName || 'Utilisateur' }}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Activity Log</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" v-if="isLoggedIn" href="#" @click="logout">Déconnexion</a>
              <a class="dropdown-item" v-else href="#" @click="login">Connexion</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "AppNavbar",
    data() {
      return {
        userName: '', 
      };
    },
    computed: {
      isLoggedIn() {
        return !!this.userName;
      },
    },
    created() {
      this.userName = localStorage.getItem('userName') || '';
    },
    methods: {
      login() {
        console.log("Utilisateur connecté");
        this.$router.push({ name: 'UserLogin' });
      },
      logout() {
        console.log("Utilisateur déconnecté");
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this.userName = '';
        this.$emit('logout'); 
        this.$router.push({ name: 'UserLogin' });
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    margin-bottom: 20px;
  }
  .nav-link {
    color: white !important;
  }
  .nav-link.active {
    font-weight: bold;
    border-bottom: 2px solid white;
  }
  </style>
  