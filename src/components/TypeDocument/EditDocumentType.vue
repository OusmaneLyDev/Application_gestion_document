<template>
  <div class="edit-document-type-container">
    <div class="edit-form-card">
      <h2 class="form-title">Modifier le Type de Document</h2>
      <form @submit.prevent="updateDocumentType">
        <!-- Champ Nom -->
        <div class="mb-4">
          <label for="nom" class="form-label">Nom</label>
          <input
            id="nom"
            v-model="documentType.nom"
            class="form-control form-control-lg custom-input"
            placeholder="Entrez le nom du type de document"
            required
          />
        </div>

        <!-- Champ Description -->
        <div class="mb-4">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="documentType.description"
            class="form-control form-control-lg custom-input"
            placeholder="Entrez la description du type de document"
            rows="4"
            required
          ></textarea>
        </div>

        <!-- Boutons d'action -->
        <div class="button-group">
          <button type="submit" class="btn btn-success btn-lg me-2">
            <i class="bi bi-check-circle"></i> Enregistrer
          </button>
          <button type="button" class="btn btn-outline-secondary btn-lg" @click="cancelEdit">
            <i class="bi bi-x-circle"></i> Annuler
          </button>
        </div>

        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="alert alert-danger mt-4">
          {{ errorMessage }}
        </div>

        <!-- Message de succès -->
        <div v-if="successMessage" class="alert alert-success mt-4">
          {{ successMessage }}
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
  name: 'EditDocumentType',
  setup() {
    const documentStore = useDocumentStore();
    const route = useRoute();
    const router = useRouter();

    const documentType = ref({
      nom: '',
      description: '',
    });
    const errorMessage = ref('');
    const successMessage = ref('');

    // Fonction pour récupérer le type de document à modifier
    const fetchDocumentType = async () => {
      try {
        const documentTypeId = route.params.id;
        const docType = await documentStore.getDocumentTypeById(documentTypeId);
        documentType.value = docType;
      } catch (error) {
        errorMessage.value = 'Erreur lors du chargement du type de document. Veuillez réessayer.';
      }
    };

    // Fonction pour mettre à jour le type de document
    const updateDocumentType = async () => {
      try {
        await documentStore.updateDocumentType(documentType.value);
        successMessage.value = 'Le type de document a été mis à jour avec succès.';
        setTimeout(() => {
          router.push({ name: 'DocumentTypeList' });
        }, 1500);
      } catch (error) {
        // Gérer l'erreur de manière plus détaillée
        if (error.response?.data?.error === 'ForeignKeyConstraintError') {
          errorMessage.value = "Impossible de modifier ce type de document car il est utilisé par d'autres données.";
        } else {
          errorMessage.value = error.response?.data?.message || 'Erreur lors de la mise à jour du type de document.';
        }
      }
    };

    // Fonction pour annuler la modification
    const cancelEdit = () => {
      const shouldCancel = confirm("Vous avez des modifications non enregistrées. Voulez-vous vraiment annuler ?");
      if (shouldCancel) {
        router.push({ name: 'DocumentTypeList' });
      }
    };

    onMounted(fetchDocumentType);

    return {
      documentType,
      errorMessage,
      successMessage,
      updateDocumentType,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
/* Conteneur principal */
.edit-document-type-container {
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
