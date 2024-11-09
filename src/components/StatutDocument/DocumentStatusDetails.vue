<template>
    <div class="document-status-details-container">
      <div class="details-form-card">
        <h2 class="form-title">Détails du Statut du Document</h2>
        
        <!-- Affichage des informations -->
        <div class="form-group">
          <label for="statutDocument" class="form-label">Statut du Document</label>
          <input
            id="statutDocument"
            v-model="statutDocument.nom"
            class="form-control form-control-lg custom-input"
            disabled
          />
        </div>
  
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="statutDocument.description"
            class="form-control form-control-lg custom-input"
            rows="4"
            disabled
          ></textarea>
        </div>
  
        <div class="button-group">
            <button class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Fermer
            </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDocumentStatusStore } from '@/stores/documentStatusStore';
  
  export default {
    name: 'DocumentStatusDetails',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const documentStatusStore = useDocumentStatusStore();
      
      const statutDocument = ref({
        nom: '',
        description: ''
      });
  
      // Récupérer les données du statut document via son id
      const fetchDocumentStatus = async () => {
        const statutId = route.params.id;
        try {
          const status = await documentStatusStore.getStatutDocumentById(statutId);
          statutDocument.value = status;
        } catch (error) {
          console.error('Erreur lors du chargement des détails du statut du document', error);
        }
      };
  
      // Fonction pour revenir à la liste des statuts de documents
      const goBack = () => {
        router.push({ name: 'DocumentStatusList' });
      };
  
      onMounted(fetchDocumentStatus);
  
      return {
        statutDocument,
        goBack
      };
    }
  };
  </script>
  
  <style scoped>
  .document-status-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  .details-form-card {
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
  </style>
  