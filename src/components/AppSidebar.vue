<template>
    <div>
      
  
      <!-- Sidebar sans arrière-plan, affichant uniquement les composants -->
      <nav
        :class="['sb-sidenav', { 'sidebar-collapsed': !isSidebarOpen }]"
        id="sidenavAccordion"
      >
        <div class="sb-sidenav-menu">
          <div class="nav">
            <!-- Bouton "Menu" placé sous le bouton hamburger -->
            <a class="nav-link menu-btn" href="/homepage">
              <div class="sb-nav-link-icon"><i class="fas fa-home"></i></div>
              <span v-if="isSidebarOpen">Menu</span>
            </a>
  
            <!-- Lien vers le Dashboard -->
            <a class="nav-link" href="/dashboard">
              <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
              <span v-if="isSidebarOpen">Dashboard</span>
            </a>
  
            <!-- Lien vers la gestion des utilisateurs -->
            <a class="nav-link" href="/utilisateurs">
              <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
              <span v-if="isSidebarOpen">Utilisateurs</span>
            </a>
  
            <!-- Lien vers la gestion des types de documents -->
            <a class="nav-link" href="/Liste-type-document">
              <div class="sb-nav-link-icon"><i class="fas fa-file-alt"></i></div>
              <span v-if="isSidebarOpen">Types de Document</span>
            </a>
  
            <!-- Lien vers la gestion des statuts de documents -->
            <a class="nav-link" href="/statut-document">
              <div class="sb-nav-link-icon"><i class="fas fa-check-circle"></i></div>
              <span v-if="isSidebarOpen">Statuts de Document</span>
            </a>
  
            <!-- Lien vers la gestion des documents -->
            <a class="nav-link" href="/documents">
              <div class="sb-nav-link-icon"><i class="fas fa-file-alt"></i></div>
              <span v-if="isSidebarOpen">Documents</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSidebarOpen: true,
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Bouton hamburger descendu un peu plus */
  .menu-toggle {
    position: absolute;
    top: 50px; /* Ajustement pour abaisser encore plus le bouton hamburger */
    left: 15px;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    z-index: 10;
  }
  
  /* Bouton "Menu" placé sous le bouton hamburger */
  .menu-btn {
    color: #333;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-top: 60px; /* Maintient l'espacement sous le hamburger */
    padding: 10px 20px;
  }
  
  .sb-sidenav {
    position: absolute;
    top: 70px; /* Position ajustée de la sidebar */
    left: 0;
    height: calc(100% - 70px);
    width: 250px;
    padding-top: 20px;
    transition: width 0.3s ease;
  }
  
  .sidebar-collapsed {
    width: 80px;
  }
  
  .sb-sidenav-menu .nav {
    display: flex;
    flex-direction: column;
  }
  
  .sb-sidenav-menu .nav-link {
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: color 0.3s;
  }
  
  .sb-sidenav-menu .nav-link:hover {
    color: #007bff;
  }
  
  .sb-sidenav-menu .sb-nav-link-icon {
    margin-right: 10px;
  }
  
  .sidebar-collapsed .sb-sidenav-menu .sb-nav-link-icon {
    margin-right: 0;
  }
  
  .sidebar-collapsed .nav-link span {
    display: none;
  }
  </style>
  