<template>
    <div class="edit-document-container">
      <div class="edit-form-card">
        <h2 class="form-title">Modifier le Document</h2>
        <form @submit.prevent="updateDocument">
          <!-- Champ Titre -->
          <div class="mb-4">
            <label for="titre" class="form-label">Titre</label>
            <input
              id="titre"
              v-model="document.titre"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez le titre du document"
              required
            />
          </div>
  
          <!-- Champ Description -->
          <div class="mb-4">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="document.description"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez la description du document"
              rows="4"
              required
            ></textarea>
          </div>
  
          <!-- Champ Type de Document -->
          <div class="mb-4">
            <label for="type" class="form-label">Type de Document</label>
            <input
              id="type"
              v-model="document.typeDocument.nom"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez le type de document"
              required
            />
          </div>
  
          <!-- Champ Statut du Document -->
          <div class="mb-4">
            <label for="status" class="form-label">Statut du Document</label>
            <input
              id="status"
              v-model="document.statutDocument.nom"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez le statut du document"
              required
            />
          </div>
  
          <!-- Boutons d'action -->
          <div class="button-group">
            <button type="submit" class="btn btn-success btn-lg me-2">
              <i class="bi bi-check-circle"></i> Enregistrer
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Annuler
            </button>
          </div>
  
          <!-- Message d'erreur -->
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
  import { useDocumentStore } from '@/stores/useDocumentStore';
  
  export default {
    name: 'EditDocument',
    setup() {
      const documentStore = useDocumentStore();
      const route = useRoute();
      const router = useRouter();
  
      const document = ref({
        titre: '',
        description: '',
        typeDocument: { nom: '' },
        statutDocument: { nom: '' },
      });
      const errorMessage = ref('');
  
      const fetchDocument = async () => {
        try {
          const documentId = route.params.id;
          const doc = await documentStore.getDocumentById(documentId);
          document.value = doc;
        } catch (error) {
          errorMessage.value = 'Erreur lors du chargement du document';
        }
      };
  
      const updateDocument = async () => {
        try {
          await documentStore.updateDocument(document.value);
          router.push({ name: 'DocumentList' });
        } catch (error) {
          errorMessage.value = 'Erreur lors de la mise à jour du document';
        }
      };
  
      const goBack = () => {
        router.push({ name: 'DocumentList' });
      };
  
      onMounted(fetchDocument);
  
      return {
        document,
        errorMessage,
        updateDocument,
        goBack,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal */
  .edit-document-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  /* Carte de formulaire */
  .edit-form-card {
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
  
  /* Champ personnalisé */
  .custom-input {
    border: 2px solid #6a11cb;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .custom-input:focus {
    border-color: #2575fc;
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.5);
  }
  
  /* Groupe de boutons */
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  /* Bouton d'action */
  .btn-success {
    background-color: #28a745;
    border: none;
  }
  
  .btn-success:hover {
    background-color: #218838;
  }
  
  .btn-outline-secondary {
    border: 2px solid #6c757d;
  }
  
  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
  }
  
  /* Animation d'entrée */
  .edit-form-card {
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
  