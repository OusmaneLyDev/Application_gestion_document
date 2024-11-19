<template>
  <div class="edit-document-container">
    <div class="edit-document-form-card">
      <button @click="goBack" class="close-button">X</button>
      <h2 class="form-title">Modifier le Document</h2>
      <form @submit.prevent="updateDocument">
        <div class="mb-4">
          <label for="titre" class="form-label">Titre du Document</label>
          <input
            type="text"
            id="titre"
            v-model="document.titre"
            class="form-control form-control-lg custom-input"
            required
            placeholder="Entrez le titre"
          />
        </div>

        <div class="mb-4">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="document.description"
            class="form-control form-control-lg custom-input"
            placeholder="Entrez la description"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="type" class="form-label">Type de Document</label>
          <select
            id="type"
            v-model="document.id_TypeDocument"
            class="form-control form-control-lg custom-input"
            required
          >
            <option value="" disabled>Choisissez un type</option>
            <option v-for="type in documentTypes" :key="type.id" :value="type.id">
              {{ type.nom }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="statut" class="form-label">Statut du Document</label>
          <select
            id="statut"
            v-model="document.id_StatutDocument"
            class="form-control form-control-lg custom-input"
            required
          >
            <option value="" disabled>Choisissez un statut</option>
            <option v-for="statut in documentStatuses" :key="statut.id" :value="statut.id">
              {{ statut.nom }}
            </option>
          </select>
        </div>

        <div v-if="successMessage" class="alert alert-success mt-4">{{ successMessage }}</div>
        <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div>

        <div class="button-group">
          <button type="submit" class="btn btn-success btn-lg me-2" :disabled="isSubmitting">
            <i class="bi bi-check-circle"></i> {{ isSubmitting ? 'Modification en cours...' : 'Enregistrer' }}
          </button>
          <button type="button" class="btn btn-outline-secondary btn-lg" @click="goBack">
            <i class="bi bi-x-circle"></i> Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/UseDocumentStore';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

// Utilisation du store Pinia
const documentStore = useDocumentStore();

const document = ref({});
const documentTypes = ref([]);
const documentStatuses = ref([]);
const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

onMounted(() => {
  fetchDocumentDetails();
  fetchDocumentTypes();
  fetchDocumentStatuses();
});

const fetchDocumentDetails = async () => {
  try {
    await documentStore.fetchDocumentById(id); // Utilisation de l'action du store
    document.value = documentStore.selectedDocument; // Récupération du document depuis le store
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des détails du document.';
  }
};

const fetchDocumentTypes = async () => {
  try {
    await documentStore.fetchTypes(); // Utilisation de l'action du store
    documentTypes.value = documentStore.types; // Récupération des types depuis le store
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des types de document.';
  }
};

const fetchDocumentStatuses = async () => {
  try {
    await documentStore.fetchStatuses(); // Utilisation de l'action du store
    documentStatuses.value = documentStore.statuses; // Récupération des statuts depuis le store
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des statuts de document.';
  }
};

const updateDocument = async () => {
  isSubmitting.value = true;
  try {
    await documentStore.editDocument(id, document.value); // Utilisation de l'action du store pour modifier le document
    successMessage.value = 'Document modifié avec succès.';
    setTimeout(() => router.push('/documents'), 2000);
  } catch (error) {
    errorMessage.value = 'Erreur lors de la modification du document.';
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push('/documents');
};
</script>

  
  <style scoped>
  .edit-document-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  .edit-document-form-card {
    position: relative;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
    animation: fadeInUp 0.5s ease-in-out;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .form-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .custom-input {
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .alert {
    margin-top: 20px;
  }
  </style>
  