<template>
    <div class="user-list">
      <!-- Affichage du message de chargement -->
      <div v-if="loading">Chargement...</div>
  
      <!-- Affichage du message d'erreur -->
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
      <!-- Affichage du message d'alerte -->
      <div v-if="alertMessage" class="alert alert-info" role="alert">
        {{ alertMessage }}
      </div>
  
      <div v-else>
        
  
        <!-- Tableau des utilisateurs -->
        <div class="table-container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.nom }}</td>
                <td>{{ user.email }}</td>
                <td>{{ formatDate(user.date_creation) }}</td>
                <td>
                  <!-- Lien pour modifier l'utilisateur -->
                  <router-link
                    :to="{ name: 'ModifierUtilisateur', params: { id: user.id } }"
                    title="Modifier"
                  >
                    <i class="fas fa-edit text-warning action-icon"></i>
                  </router-link>
  
                  <!-- Lien pour voir les détails de l'utilisateur -->
                  <router-link
                    :to="{ name: 'DetailsUtilisateur', params: { id: user.id } }"
                    title="Voir"
                  >
                    <i class="fas fa-eye text-info action-icon"></i>
                  </router-link>
  
                  <!-- Bouton pour supprimer l'utilisateur -->
                  <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)" title="Supprimer">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="5" class="text-center">Aucun utilisateur trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  
  // Initialisation du store et du router
  const userStore = useUserStore();
  const router = useRouter();
  const selectedUser = ref({});
  
  // Computed pour récupérer les valeurs du store
  const users = computed(() => userStore.users);
  const errorMessage = computed(() => userStore.errorMessage);
  const loading = computed(() => userStore.loading);
  const alertMessage = computed(() => userStore.alertMessage);
  
  // Récupération des utilisateurs à l'initialisation
  onMounted(() => {
    userStore.fetchUsers();
  });
  
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Fonction pour rediriger vers la page d'ajout d'utilisateur
  const addUser = () => {
    router.push({ name: 'AjouterUtilisateur' });
  };
  
  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id) => {
  try {
    console.log('Deleting user with ID:', id);
    await userStore.deleteUser(id);
    console.log('User deleted successfully');
    errorMessage.value = '';  // Réinitialise le message d'erreur après succès
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    errorMessage.value = 'Erreur lors de la suppression de l\'utilisateur';
  }
};

  </script>
  
  <style scoped>
  .user-list {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  .table-container {
    max-width: 800px;
    width: 100%;
  }
  
  .table {
    width: 120%;
    border-collapse: collapse;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .table th, .table td {
    padding: 12px;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  
  .action-icon {
    cursor: pointer;
    margin: 0 5px;
    font-size: 1.2rem;
    transition: color 0.3s;
  }
  
  .action-icon:hover {
    color: #0056b3;
  }
  
  .btn-sm {
    padding: 5px 10px;
    font-size: 0.9rem;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
  </style>
  