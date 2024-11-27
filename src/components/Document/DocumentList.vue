<template>
  <div class="document-list">
    <div v-if="loading">Chargement...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="alertMessage" class="alert alert-info" role="alert">
      {{ alertMessage }}
    </div>

    <div v-else>
      <div class="mb-3 d-flex justify-content-between">
        <h4>Liste des Documents</h4>
        <button class="btn btn-primary" @click="addDocument">
          <i class="fas fa-plus-circle"></i> Ajouter
        </button>
      </div>

      <!-- Tableau des documents -->
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Date de Dépôt</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Fichier</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="document in documents" :key="document.id">
            <td>{{ document.id }}</td>
            <td>{{ document.titre }}</td>
            <td>{{ document.description }}</td>
            <td>{{ formatDate(document.date_depot) }}</td>
            <td>{{ document.typeDocument.nom }}</td>
            <td>{{ document.statutDocument.nom }}</td>
            <td>
              <a 
                v-if="document.fichier" 
                :href="`http://127.0.0.1:3051/documents/${document.fichier}`" 
                target="_blank"
              >
                Télécharger
              </a>
            </td>
            <td>
              <router-link 
                :to="{ name: 'EditDocument', params: { id: document.id } }" 
                title="Modifier"
              >
                <i class="fas fa-edit text-warning action-icon"></i>
              </router-link>
              <router-link 
                :to="{ name: 'DocumentDetails', params: { id: document.id } }" 
                title="Voir"
              >
                <i class="fas fa-eye text-info action-icon"></i>
              </router-link>
              <button 
                class="delete-button" 
                @click="deleteDocument(document.id)" 
                title="Supprimer"
              >
                <i class="fas fa-trash-alt text-danger"></i>
              </button>
            </td>
          </tr>
          <tr v-if="documents.length === 0">
            <td colspan="8" class="text-center">Aucun document trouvé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useDocumentStore } from '@/stores/UseDocumentStore';
import { useRouter } from 'vue-router';

const documentStore = useDocumentStore();
const router = useRouter();

onMounted(() => {
  documentStore.fetchDocuments();
});

const documents = computed(() => documentStore.documents);
const errorMessage = computed(() => documentStore.errorMessage);
const loading = computed(() => documentStore.loading);
const alertMessage = computed(() => documentStore.alertMessage);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const addDocument = () => {
  router.push({ name: 'AddDocument' });
};

const deleteDocument = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
    try {
      await documentStore.deleteDocument(id);
      await documentStore.fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression du document:', error);
      alert('Erreur lors de la suppression du document.');
    }
  }
};
</script>

<style scoped>
.document-list {
  width: 130%;
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: #f8f9fa;
}

.table th, .table td {
  padding: 12px;
  text-align: center;
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
</style>
