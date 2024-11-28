<template>
  <div class="document-details-container">
    <h1 class="text-center">Modifier le Document</h1>

    <!-- Message de succès ou d'erreur -->
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <!-- Formulaire de modification -->
    <form @submit.prevent="updateDocument">
      <div class="form-group">
        <label for="titre">Titre du Document</label>
        <input
          type="text"
          id="titre"
          v-model="document.titre"
          class="form-control"
          required
          placeholder="Entrez le titre"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="document.description"
          class="form-control"
          placeholder="Entrez la description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="type">Type de Document</label>
        <select
          id="type"
          v-model="document.id_TypeDocument"
          class="form-control"
          required
        >
          <option value="" disabled>Choisissez un type</option>
          <option v-for="type in documentTypes" :key="type.id" :value="type.id">
            {{ type.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="statut">Statut du Document</label>
        <select
          id="statut"
          v-model="document.id_StatutDocument"
          class="form-control"
          required
        >
          <option value="" disabled>Choisissez un statut</option>
          <option v-for="statut in documentStatuses" :key="statut.id" :value="statut.id">
            {{ statut.nom }}
          </option>
        </select>
      </div>

      <!-- Date de dépôt -->
      <div class="form-group">
        <label for="date_depot">Date de dépôt</label>
        <input
          type="date"
          id="date_depot"
          v-model="document.date_depot"
          class="form-control"
        />
      </div>

      <!-- Fichier téléchargeable -->
      <div class="form-group">
        <label for="file">Fichier (facultatif)</label>
        <input
          type="file"
          id="file"
          @change="handleFileChange"
          class="form-control"
        />
        <div v-if="document.fileUrl" class="mt-2">
          <a :href="document.fileUrl" download class="btn btn-link">Télécharger le fichier actuel</a>
        </div>
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-success">
          {{ isSubmitting ? 'Modification en cours...' : 'Enregistrer' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="goBack">
          Annuler
        </button>
      </div>
    </form>
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
const selectedFile = ref(null);

onMounted(() => {
  fetchDocumentDetails();
  fetchDocumentTypes();
  fetchDocumentStatuses();
});

const fetchDocumentDetails = async () => {
  try {
    await documentStore.fetchDocumentById(id);
    document.value = documentStore.selectedDocument;
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des détails du document.';
  }
};

const fetchDocumentTypes = async () => {
  try {
    await documentStore.fetchTypes();
    documentTypes.value = documentStore.types;
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des types de document.';
  }
};

const fetchDocumentStatuses = async () => {
  try {
    await documentStore.fetchStatuses();
    documentStatuses.value = documentStore.statuses;
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des statuts de document.';
  }
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const updateDocument = async () => {
  isSubmitting.value = true;
  const formData = new FormData();
  formData.append('titre', document.value.titre);
  formData.append('description', document.value.description || '');
  formData.append('id_TypeDocument', document.value.id_TypeDocument);
  formData.append('id_StatutDocument', document.value.id_StatutDocument);
  formData.append('date_depot', document.value.date_depot); // Date ajoutée ici

  if (selectedFile.value) {
    formData.append('file', selectedFile.value);
  }

  try {
    await documentStore.editDocument(id, formData);
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
input,
textarea,
select {
  font-size: 1rem;
  color: #333333;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
}
.button-group {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
}
.alert {
  margin-bottom: 20px;
}
</style>
