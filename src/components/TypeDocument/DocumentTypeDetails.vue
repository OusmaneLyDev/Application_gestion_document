<template>
  <div class="detail-document-type-container">
    <div class="detail-form-card">
      <h2 class="form-title">Détails du Type de Document</h2>
      
      <!-- Affichage des détails -->
      <p v-if="documentType">
        <strong>Nom:</strong> {{ documentType.nom }}
      </p>
      <p v-if="documentType">
        <strong>Description:</strong> {{ documentType.description }}
      </p>

      <!-- Lien pour modifier le type de document -->
      <div class="button-group">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{ name: 'EditDocumentType', params: { id: documentType.id } }"
        >
          <i class="bi bi-pencil-square"></i> Modifier
        </router-link>
      </div>

      <!-- Message d'erreur en cas de problème -->
      <div v-if="errorMessage" class="alert alert-danger mt-4">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      documentType: null, // Initialisation à null pour éviter l'affichage prématuré
      errorMessage: null,
    };
  },
  mounted() {
    this.fetchDocumentType();
  },
  methods: {
    async fetchDocumentType() {
      try {
        const type = await this.$store.dispatch('getDocumentTypeById', this.id);
        this.documentType = type;
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération du type de document';
        console.error('Erreur lors de la récupération du type de document', error);
      }
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.detail-document-type-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  padding: 20px;
}

/* Carte des détails du type de document */
.detail-form-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
}

/* Titre de la carte */
.form-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 20px;
}

/* Groupes de boutons */
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Bouton Modifier */
.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Icone du bouton Modifier */
.btn-primary i {
  margin-right: 8px;
}

/* Message d'erreur */
.alert {
  margin-top: 20px;
}

/* Animation d'entrée */
.detail-form-card {
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
