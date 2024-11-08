<template>
    <div class="edit-document-status-container">
      <div class="edit-status-form-card">
        <h2 class="form-title">Modifier le Statut du Document</h2>
        <form @submit.prevent="updateStatutDocument">
          <div class="mb-4">
            <label for="statutDocument" class="form-label">Nom du Statut</label>
            <input
              id="statutDocument"
              v-model="statutDocument.nom"
              class="form-control form-control-lg custom-input"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="statutDocument.description"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez la description du statut"
              rows="4"
            ></textarea>
          </div>
  
          <div class="button-group">
            <button type="submit" class="btn btn-success btn-lg me-2">
              <i class="bi bi-check-circle"></i> Enregistrer
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Annuler
            </button>
          </div>
          
          <div v-if="errorMessage" class="alert alert-danger mt-4">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDocumentStatusStore } from '@/stores/documentStatusStore';
  
  export default {
    name: 'EditDocumentStatus',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const documentStatusStore = useDocumentStatusStore();
  
      const statutDocument = ref({
        id: null,
        nom: '',
        description: ''
      });
  
      const errorMessage = ref('');
  
      // Récupérer le statut document à modifier
      const fetchStatutDocument = async () => {
        const statutId = route.params.id;
        try {
          const status = await documentStatusStore.getStatutDocumentById(statutId);
          statutDocument.value = status;
        } catch (error) {
          errorMessage.value = 'Erreur lors du chargement des détails du statut du document';
        }
      };
  
      // Mettre à jour les informations du statut
      const updateStatutDocument = async () => {
        try {
          await documentStatusStore.updateStatutDocument(statutDocument.value);
          router.push({ name: 'DocumentStatusList' });
        } catch (error) {
          errorMessage.value = 'Erreur lors de la mise à jour du statut du document';
        }
      };
  
      // Revenir à la liste des statuts de documents
      const goBack = () => {
        router.push({ name: 'DocumentStatusList' });
      };
  
      onMounted(fetchStatutDocument);
  
      return {
        statutDocument,
        errorMessage,
        updateStatutDocument,
        goBack
      };
    }
  };
  </script>
  
  
  <style scoped>
  .edit-document-status-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  .edit-status-form-card {
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
    transition: all 0.3s ease;
  }
  
  .custom-input:focus {
    border-color: #2575fc;
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.5);
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
  
  .alert {
    text-align: center;
    font-weight: bold;
  }
  
  .edit-status-form-card {
    animation: fadeInUp 0.5s ease-in-out;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  