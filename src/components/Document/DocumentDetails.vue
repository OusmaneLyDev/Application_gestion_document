<template>
    <div class="document-details-container">
      <h1 class="text-center">Détails du Document</h1>
  
      <!-- Indicateur de chargement -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Chargement...</span>
        </div>
      </div>
  
      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  
      <!-- Détails du document -->
      <div v-if="document && !loading">
        <div class="form-group">
          <label>ID :</label>
          <p>{{ document.id }}</p>
        </div>
  
        <div class="form-group">
          <label>Titre :</label>
          <p>{{ document.titre }}</p>
        </div>
  
        <div class="form-group">
          <label>Description :</label>
          <p>{{ document.description || 'Aucune description disponible' }}</p>
        </div>
  
        <div class="form-group">
          <label>Date de Dépôt :</label>
          <p>{{ formatDate(document.date_depot) }}</p>
        </div>
  
        <div class="form-group">
          <label>Date de Validation :</label>
          <p>{{ formatDate(document.date_validation) || 'Non validé' }}</p>
        </div>
  
        <div class="form-group">
          <label>Utilisateur :</label>
          <p>{{ document.utilisateur.nom }} ({{ document.utilisateur.email }})</p>
        </div>
  
        <div class="form-group">
          <label>Type de Document :</label>
          <p>{{ document.typeDocument.nom }} - {{ document.typeDocument.description }}</p>
        </div>
  
        <div class="form-group">
          <label>Statut du Document :</label>
          <p>{{ document.statutDocument.nom }} - {{ document.statutDocument.description }}</p>
        </div>
  
        <button class="btn btn-secondary" @click="goBack">Retour</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDocumentStore } from '@/stores/UseDocumentStore';
  
  const documentStore = useDocumentStore();
  const route = useRoute();
  const router = useRouter();
  const id = route.params.id;
  
  const loading = computed(() => documentStore.loading);
  const errorMessage = computed(() => documentStore.alertMessage);
  const document = computed(() => documentStore.selectedDocument);
  
  // Récupérer les détails du document lors du montage du composant
  onMounted(() => {
    documentStore.fetchDocumentById(id);
  });
  
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Fonction pour retourner à la page précédente
  const goBack = () => {
    router.push('/documents');
  };
  </script>
  
  <style scoped>
  .document-details-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 30px;
    border: 2px solid #ececec;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
  .form-group {
    margin-bottom: 20px;
  }
  label {
    font-weight: 600;
    color: #4a4a4a;
  }
  p {
    font-size: 1rem;
    color: #333333;
  }
  .spinner-border {
    width: 3rem;
    height: 3rem;
    color: #007bff;
  }
  </style>
  