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
          <button class="btn btn-outline-secondary btn-lg" @click="closeAndRedirect">
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
  
      const fetchDocumentStatus = async () => {
        const statutId = route.params.id;
        try {
          const status = await documentStatusStore.getStatutDocumentById(statutId);
          statutDocument.value = status;
        } catch (error) {
          console.error('Erreur lors du chargement des détails du statut du document', error);
        }
      };
  
      const closeAndRedirect = () => {
        router.push({ name: 'StatutDocument' });
      };
  
      onMounted(fetchDocumentStatus);
  
      return {
        statutDocument,
        closeAndRedirect
      };
    }
  };
  </script>
  
  <style scoped>
  /* Conteneur principal */
  .document-status-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: none;
    padding: 20px;
  }

  /* Carte du formulaire */
  .details-form-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
  }

  /* Titre du formulaire */
  .form-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 20px;
  }

  /* Champs d'entrée personnalisés */
  .custom-input {
    border: 2px solid #6a11cb;
    border-radius: 8px;
    padding: 10px;
    transition: all 0.3s ease;
    background-color: #f0f0f0;
  }

  .custom-input:focus {
    border-color: #3498db;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
  }

  /* Groupe de boutons */
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  /* Boutons */
  .btn-outline-secondary {
    border: 2px solid #6c757d;
    background-color: transparent;
    color: #6c757d;
    padding: 10px 20px;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
  }

  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
  }
</style>
