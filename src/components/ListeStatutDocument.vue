<template>
  <div class="document-list">
    <div v-if="loading">Chargement...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="alertMessage" class="alert alert-info" role="alert">
      {{ alertMessage }}
    </div>

    <div v-else>
      <div class="mb-3 d-flex justify-content-between">
        <h4>Liste des Statuts de Documents</h4>
        <button class="btn btn-primary" @click="goToAddStatut">
          <i class="fas fa-plus"></i> Ajouter
        </button>
      </div>

      <!-- Tableau des statuts -->
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="statut in statuts" :key="statut.id">
            <td>{{ statut.id }}</td>
            <td>{{ statut.nom }}</td>
            <td>{{ statut.description }}</td>
            <td>
              <router-link 
                :to="{ name: 'EditDocumentStatus', params: { id: statut.id } }" 
                title="Modifier"
              >
                <i class="fas fa-edit text-warning action-icon"></i>
              </router-link>
              <router-link 
                :to="{ name: 'DocumentStatusDetails', params: { id: statut.id } }" 
                title="Voir"
              >
                <i class="fas fa-eye text-info action-icon"></i>
              </router-link>
              <button 
                class="delete-button" 
                @click="deleteStatut(statut.id)" 
                title="Supprimer"
              >
                <i class="fas fa-trash-alt text-danger"></i>
              </button>
            </td>
          </tr>
          <tr v-if="statuts.length === 0">
            <td colspan="4" class="text-center">Aucun statut trouvé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useDocumentStatusStore } from '../stores/documentStatusStore';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'StatutDocumentList',
    setup() {
      const documentStatusStore = useDocumentStatusStore();
      const router = useRouter();
      const statuts = computed(() => documentStatusStore.statuts);
  
      onMounted(() => {
        documentStatusStore.fetchStatuts();
      });
  
      const deleteStatut = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce statut ?')) {
          try {
            await documentStatusStore.supprimerStatut(id);
            await documentStatusStore.fetchStatuts();
          } catch (error) {
            console.error('Erreur lors de la suppression du statut:', error);
          }
        }
      };
  
      const goToAddStatut = () => {
        router.push({ name: 'AddStatut' });
      };
  
      return {
        statuts,
        deleteStatut,
        goToAddStatut,
      };
    },
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
  padding: 12px;
  text-align: left;
}

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
