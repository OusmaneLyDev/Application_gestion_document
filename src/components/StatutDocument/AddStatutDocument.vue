<template>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div> Chargement...
    </div>
    <div v-else class="edit-document-container">
      <div class="edit-form-card">
        <h2 class="form-title">Ajouter un Statut de Document</h2>
        <form @submit.prevent="addStatut">
          <div class="mb-4">
            <label for="nom" class="form-label">Nom du Statut</label>
            <input
              type="text"
              id="nom"
              v-model="statut.nom"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez le nom du statut"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="statut.description"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez la description du statut"
              required
            ></textarea>
          </div>
  
          <div class="button-group">
            <button type="submit" class="btn btn-primary btn-lg">
              <i class="bi bi-plus-circle"></i> Ajouter
            </button>
            <button class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useDocumentStatusStore } from '@/stores/documentStatusStore';
  import { useRouter } from 'vue-router';
  
  const statut = ref({
    nom: '',
    description: '',
  });
  const documentStatusStore = useDocumentStatusStore();
  const router = useRouter();
  const loading = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  
  // Ajouter un nouveau statut
  const addStatut = async () => {
    try {
      await documentStatusStore.ajouterStatut(statut.value);
      alert('Statut ajouté avec succès !');
      
      // Force le rechargement de la liste des statuts après ajout
      await documentStatusStore.fetchStatuts(true); 
  
      // Redirection vers la liste des statuts
      router.push('/statut-document');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du statut :', error);
      alert('Erreur lors de l\'ajout du statut.');
    }
  };
  
  const goBack = () => {
    router.push('/statut-document');
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Style du formulaire */
  .edit-document-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* Suppression de l'arrière-plan en dégradé */
    background: none;
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

  .custom-input input,
  .custom-input textarea {
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
</style>
