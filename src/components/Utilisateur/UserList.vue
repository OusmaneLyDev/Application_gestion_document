<template>
  <div class="document-list">
    <div v-if="loading">Chargement...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="alertMessage" class="alert alert-info" role="alert">
      {{ alertMessage }}
    </div>

    <div v-else>
      <div class="mb-3 d-flex justify-content-between">
        <h4>Liste des Utilisateurs</h4>
        <button class="btn btn-primary" @click="addUser">
          <i class="fas fa-user-plus"></i> Ajouter
        </button>
      </div>

      <!-- Tableau des utilisateurs -->
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date de création</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.date_creation) }}</td>
            <td>
              <router-link 
                :to="{ name: 'ModifierUtilisateur', params: { id: user.id } }" 
                title="Modifier"
              >
                <i class="fas fa-edit text-warning action-icon"></i>
              </router-link>
              <router-link 
                :to="{ name: 'DetailsUtilisateur', params: { id: user.id } }" 
                title="Voir"
              >
                <i class="fas fa-eye text-info action-icon"></i>
              </router-link>
              <button 
                class="delete-button" 
                @click="deleteUser(user.id)" 
                title="Supprimer"
              >
                <i class="fas fa-trash-alt text-danger"></i>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

// Initialisation du store et du router
const userStore = useUserStore();
const router = useRouter();

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
  router.push({ name: 'AddUser' });
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      await userStore.deleteUser(id);
      await userStore.fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      alert('Erreur lors de la suppression de l\'utilisateur.');
    }
  }
};
</script>

<style scoped>
.document-list {
  width: 80%;
  margin-top: 20px;
  margin-left: 250px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: #f8f9fa;
}

/* .table th, .table td {
  padding: 12px;
  text-align: center;
} */

.actions-column {
  width: 150px;
}

/* Styles pour les icônes CRUD */
.action-icon {
  cursor: pointer;
  margin: 0 5px;
  font-size: 1.2rem;
  transition: color 0.3s ease-in-out;
}

.action-icon.text-warning:hover {
  color: orange; /* Couleur pour l'édition */
}

.action-icon.text-info:hover {
  color: #17a2b8; /* Couleur pour la vue */
}

.action-icon.text-danger:hover {
  color: darkred; /* Couleur pour la suppression */
}

/* Bouton pour suppression */
.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: red;
  transition: color 0.3s ease-in-out;
}

.delete-button:hover {
  color: darkred;
}

.error {
  color: red;
  font-weight: bold;
}

/* Ajuster le bouton d'ajout pour un meilleur alignement */
.mb-3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary {
  font-size: 1rem;
  padding: 8px 15px;
}

</style>
