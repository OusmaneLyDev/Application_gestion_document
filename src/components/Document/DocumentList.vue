<template>
    <div class="document-list">
      <div v-if="loading">Chargement...</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="alertMessage" class="alert alert-info" role="alert">
        {{ alertMessage }}
      </div>
  
      <div v-else>
        <!-- Bouton pour ajouter un document -->
        <div class="mb-3">
          <button class="btn btn-primary" @click="addDocument">
            <i class="fas fa-plus-circle"></i> Ajouter un Document
          </button>
        </div>
  
        <!-- Tableau des documents -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Date de Dépôt</th>
              <th>Type de Document</th>
              <th>Statut du Document</th>
              <th>Actions</th>
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
                <i 
                  @click="deleteDocument(document.id)" 
                  class="fas fa-trash text-danger action-icon" 
                  title="Supprimer"
                ></i>
              </td>
            </tr>   
            <tr v-if="documents.length === 0">
              <td colspan="7" class="text-center">Aucun document trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed, onMounted } from 'vue'; // Retirez ref ici
import { useDocumentStore } from '@/stores/useDocumentStore';
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

// Fonction pour ajouter un document
const addDocument = () => {
  router.push({ name: 'AddDocument' });
};

// Fonction pour supprimer un document
const deleteDocument = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
    await documentStore.deleteDocument(id);
  }
};
</script>

  
  <style scoped>
  .document-list {
    width: 100%;
    margin-top: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .table th, .table td {
    padding: 12px;
  }
  
  .table th:nth-child(7), .table td:nth-child(7) {
    width: 140px;
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
  </style>
  