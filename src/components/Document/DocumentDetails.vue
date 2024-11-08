<template>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div> Chargement...
    </div>
    <div v-else>
      <div v-if="document" class="edit-document-container">
        <div class="edit-form-card">
          <h2 class="form-title">Détails du Document</h2>
          <div class="mb-4">
            <label for="titre" class="form-label">Titre</label>
            <p id="titre" class="form-control form-control-lg custom-input">{{ document.titre }}</p>
          </div>
  
          <div class="mb-4">
            <label for="description" class="form-label">Description</label>
            <p id="description" class="form-control form-control-lg custom-input">{{ document.description }}</p>
          </div>
  
          <div class="mb-4">
            <label for="type" class="form-label">Type de Document</label>
            <p id="type" class="form-control form-control-lg custom-input">{{ document.type_document }}</p>
          </div>
  
          <div class="mb-4">
            <label for="status" class="form-label">Statut du Document</label>
            <p id="status" class="form-control form-control-lg custom-input">{{ document.statut_document }}</p>
          </div>
  
          <div class="button-group">
            <button class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Fermer
            </button>
          </div>
        </div>
      </div>
      <div v-else class="no-document">
        <p>Document non trouvé.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDocumentStore } from '@/stores/useDocumentStore';
  
  const documentStore = useDocumentStore();
  const route = useRoute();
  const router = useRouter();
  const document = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
    const id = route.params.id;
    document.value = await documentStore.fetchDocumentById(id);
    loading.value = false;
  });
  
  const goBack = () => {
    router.push('/documents');
  };
  </script>
  
  <style scoped>
  /* Conteneur de chargement */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    font-size: 1.5rem;
    color: #34495e;
  }
  
  /* Animation du spinner */
  .spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Style des détails du document */
  .edit-document-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  .edit-form-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
  }
  
  .form-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 20px;
  }
  
  .custom-input {
    border: 2px solid #6a11cb;
    border-radius: 8px;
    padding: 10px;
    font-size: 1rem;
    background-color: #f0f0f0;
  }
  
  .custom-input p {
    margin: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .btn-outline-secondary {
    border: 2px solid #6c757d;
  }
  
  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
  }
  
  /* Message si aucun document n'est trouvé */
  .no-document {
    text-align: center;
    font-size: 1.3rem;
    color: #e74c3c;
    margin-top: 50px;
  }
  
  body {
    background-color: #ecf0f1;
  }
  </style>
  