<template>
  <div>
    <!-- Toggle Button -->
    <button class="btn btn-primary toggle-btn" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <nav
      :class="[
        'sb-sidenav',
        { 'sidebar-collapsed': !isSidebarOpen, 'sidebar-open': isSidebarOpen }
      ]"
      id="sidenavAccordion"
    >
      <div class="sb-sidenav-menu">
        <div class="nav">
          <router-link
            class="nav-link menu-btn"
            :class="{ active: isActive('/') }"
            to="/"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-home"></i></div>
            <span v-if="isSidebarOpen">Menu</span>
          </router-link>

          <router-link
            class="nav-link"
            :class="{ active: isActive('/dashboard') }"
            to="/dashboard"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
            <span v-if="isSidebarOpen">Dashboard</span>
          </router-link>

          <router-link
            class="nav-link"
            :class="{ active: isActive('/user-list') }"
            to="/user-list"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
            <span v-if="isSidebarOpen">Utilisateurs</span>
          </router-link>

          <router-link
            class="nav-link"
            :class="{ active: isActive('/liste-type-document') }"
            to="/liste-type-document"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-file-alt"></i></div>
            <span v-if="isSidebarOpen">Types de Document</span>
          </router-link>

          <router-link
            class="nav-link"
            :class="{ active: isActive('/statut-document') }"
            to="/statut-document"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-check-circle"></i></div>
            <span v-if="isSidebarOpen">Statuts de Document</span>
          </router-link>

          <router-link
            class="nav-link"
            :class="{ active: isActive('/documents') }"
            to="/documents"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-file-alt"></i></div>
            <span v-if="isSidebarOpen">Documents</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSidebarOpen: true, // État ouvert ou fermé du sidebar
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Bascule entre ouvert et fermé
    },
    isActive(route) {
      return this.$route.path === route; // Vérifie si le chemin est actif
    },
  },
};
</script>
<style scoped>
/* Sidebar */
.sb-sidenav {
  position: absolute;
  top: 70px;
  left: 0;
  height: calc(100% - 70px);
  width: 250px;
  padding-top: 20px;
  background-color: #343a40; /* Couleur sombre (bg-dark) */
  transition: width 0.3s ease, transform 0.3s ease;
  transform: translateX(0);
  z-index: 1000;
}

.sidebar-collapsed {
  width: 80px;
}

.sb-sidenav-menu .nav {
  display: flex;
  flex-direction: column;
}

.sb-sidenav-menu .nav-link {
  color: #dcdcdc;
  text-decoration: none;
  padding: 10px 20px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

/* Hover */
.sb-sidenav-menu .nav-link:hover {
  color: #fff;
  background-color: #007bff;
}

/* Active */
.sb-sidenav-menu .nav-link.active {
  color: #fff;
  background-color: #007bff;
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

/* Responsive Sidebar */
@media (max-width: 768px) {
  .sb-sidenav {
    transform: translateX(-100%);
  }
  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-collapsed {
    width: 0;
    overflow: hidden;
  }

  /* Toggle Button */
  .toggle-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1100;
    display: block;
  }
}
</style>
