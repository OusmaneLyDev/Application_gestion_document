<template>
  <div class="document-list">
    <div v-if="loading">Chargement...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="alertMessage" class="alert alert-info" role="alert">
      {{ alertMessage }}
    </div>

    <div v-else>
      <div class="mb-3 d-flex justify-content-between">
        <h4>Liste des Types de Documents</h4>
        <button class="btn btn-primary" @click="addDocumentType">
          <i class="fas fa-plus"></i> Ajouter
        </button>
      </div>

      <!-- Tableau des types de documents -->
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
          <tr v-for="type in documentTypes" :key="type.id">
            <td>{{ type.id }}</td>
            <td>{{ type.nom }}</td>
            <td>{{ type.description }}</td>
            <td>
              <router-link 
                :to="{ name: 'EditDocumentType', params: { id: type.id } }" 
                title="Modifier"
              >
                <i class="fas fa-edit text-warning action-icon"></i>
              </router-link>
              <router-link 
                :to="{ name: 'DocumentTypeDetails', params: { id: type.id } }" 
                title="Voir"
              >
                <i class="fas fa-eye text-info action-icon"></i>
              </router-link>
              <button 
                class="delete-button" 
                @click="deleteDocumentType(type.id)" 
                title="Supprimer"
              >
                <i class="fas fa-trash-alt text-danger"></i>
              </button>
            </td>
          </tr>
          <tr v-if="documentTypes.length === 0">
            <td colspan="4" class="text-center">Aucun type de document trouvé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useDocumentTypeStore } from '@/stores/documentTypeStore';
import { useRouter } from 'vue-router';

const documentTypeStore = useDocumentTypeStore();
const router = useRouter();

// Fetch data on component mount
onMounted(() => {
  documentTypeStore.fetchTypes();
});

// Computed properties
const documentTypes = computed(() => documentTypeStore.types);
const errorMessage = computed(() => documentTypeStore.errorMessage);
const loading = computed(() => documentTypeStore.loading);
const alertMessage = computed(() => documentTypeStore.alertMessage);

// Functions for adding and deleting document types
const addDocumentType = () => {
  router.push({ name: 'AddDocumentType' });
};

const deleteDocumentType = async (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce type de document ?")) {
    try {
      await documentTypeStore.deleteType(id);
      documentTypeStore.setAlertMessage("Type de document supprimé avec succès !");
      await documentTypeStore.fetchTypes();
    } catch (error) {
      documentTypeStore.setErrorMessage("Erreur lors de la suppression du type de document.");
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
  padding: 12px;
  text-align: left;
}

.actions-column {
  width: 150px;
}

/* Style pour les icônes CRUD */
.action-icon {
  cursor: pointer;
  margin: 0 5px;
  font-size: 1.2rem; /* Taille unifiée des icônes */
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
