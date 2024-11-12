<template>
  <div class="document-type-details-container">
    <div class="details-form-card">
      <h2 class="form-title">Détails du Type de Document</h2>

      <!-- Affichage des informations du type de document -->
      <div class="form-group">
        <label for="nom" class="form-label">Nom du Type de Document</label>
        <input
          id="nom"
          v-model="typeDocument.nom"
          class="form-control form-control-lg custom-input"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="typeDocument.description"
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
import { useDocumentTypeStore } from '@/stores/documentTypeStore';

export default {
  name: 'DocumentTypeDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const documentTypeStore = useDocumentTypeStore();

    const typeDocument = ref({
      nom: '',
      description: ''
    });

    // Fonction pour récupérer les détails du type de document via son ID
    const fetchDocumentType = async () => {
      const typeId = route.params.id;
      try {
        const type = await documentTypeStore.getDocumentTypeById(typeId);
        typeDocument.value = type;
      } catch (error) {
        console.error('Erreur lors du chargement des détails du type de document', error);
      }
    };

    const goBack = () => {
      router.push({ name: 'ListeTypeDocument' });
    };

    onMounted(fetchDocumentType);

    return {
      typeDocument,
      goBack
    };
  }
};
</script>

<style scoped>
.document-type-details-container {
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
