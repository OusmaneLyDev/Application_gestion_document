<template>
    <div class="document-type-list">
      <!-- Affichage du message de chargement -->
      <div v-if="loading">Chargement...</div>
  
      <!-- Affichage du message d'erreur -->
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
      <!-- Affichage du message d'alerte -->
      <div v-if="alertMessage" class="alert alert-info" role="alert">
        {{ alertMessage }}
      </div>
  
      <div v-else>
        <!-- Bouton pour ajouter un type de document -->
        <h1 class="center-text">Liste des types de Document</h1>
        <div class="mb-3">
          <button class="btn btn-primary" @click="addDocumentType">
            <i class="fas fa-plus-circle"></i> Ajouter un Type de Document
          </button>
        </div>
  
        <!-- Tableau des types de documents -->
        <div class="table-container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom du Type</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Boucle pour afficher chaque type de document -->
              <tr v-for="type in documentTypes" :key="type.id">
                <td>{{ type.id }}</td>
                <td>{{ type.nom }}</td>
                <td>{{ type.description }}</td>
                <td>
                  <router-link 
                    :to="{ name: 'EditDocumentType', params: { id: type.id } }" 
                    title="Modifier"
                  >
                    <i class="fas fa-edit text-warning action-icon"></i>
                  </router-link>
                  <router-link 
                    :to="{ name: 'DocumentTypeDetails', params: { id: type.id } }" 
                    title="Voir"
                    >
                    <i class="fas fa-eye text-info action-icon"></i>
                    </router-link>

                  <!-- Bouton pour supprimer le type de document -->
                  <button 
                    class="delete-button" 
                    @click="deleteDocumentType(type.id)" 
                    title="Supprimer"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
              <!-- Message si aucun type de document n'est trouvé -->
              <tr v-if="documentTypes.length === 0">
                <td colspan="4" class="text-center">Aucun type de document trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useDocumentTypeStore } from '@/stores/documentTypeStore';
  import { useRouter } from 'vue-router';
  
  // Initialisation du store et du router
  const documentTypeStore = useDocumentTypeStore();
  const router = useRouter();
  
  // Récupération des données à l'initialisation du composant
  onMounted(() => {
    documentTypeStore.fetchTypes();
  });
  
  // Computed pour récupérer les valeurs du store
  const documentTypes = computed(() => documentTypeStore.types);
  const errorMessage = computed(() => documentTypeStore.errorMessage);
  const loading = computed(() => documentTypeStore.loading);
  const alertMessage = computed(() => documentTypeStore.alertMessage);
  
  // Fonction pour rediriger vers la page d'ajout d'un type de document
  const addDocumentType = () => {
    router.push({ name: 'AddDocumentType' });
  };
  
  // Fonction pour supprimer un type de document
  const deleteDocumentType = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce type de document ?")) {
      try {
        await documentTypeStore.deleteType(id);
        documentTypeStore.setAlertMessage("Type de document supprimé avec succès !");
        await documentTypeStore.fetchTypes();
      } catch (error) {
        documentTypeStore.setErrorMessage("Erreur lors de la suppression du type de document.");
      }
    }
  };
  </script>
  
  <style scoped>
  .document-type-list {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  .table-container {
    max-width: 800px;
    width: 100%;
  }
  
  .table {
    width: 120%;
    border-collapse: collapse;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .table th, .table td {
    padding: 12px;
  }
  
  .table th:nth-child(4), .table td:nth-child(4) {
    width: 140px;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  
  .alert {
    margin-bottom: 20px;
  }
  
  .action-icon {
    cursor: pointer;
    margin: 0 5px;
    font-size: 1.2rem;
    transition: color 0.3s;
  }
  
  .action-icon:hover {
    color: #0056b3;
  }
  
  .center-text {
    text-align: center;
  }
  
  .delete-button {
    background-color: transparent;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 1.2rem;
    transition: color 0.3s;
  }
  
  .delete-button:hover {
    color: darkred;
  }
  </style>
  