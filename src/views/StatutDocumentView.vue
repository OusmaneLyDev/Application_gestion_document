<template>
    <div class="container my-5">
      <h1 class="text-center mb-4">Détails du Statut de Document</h1>
      
      <div v-if="loading">Chargement...</div>
      <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
  
      <div v-else>
        <h3>{{ statut.nom }}</h3>
        <p>{{ statut.description }}</p>
        <button class="btn btn-warning" @click="editStatut(statut.id)">
          <i class="fas fa-edit"></i> Modifier
        </button>
        <button class="btn btn-danger" @click="deleteStatut(statut.id)">
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { useDocumentStatusStore } from '../stores/documentStatusStore';
  import { computed, onMounted } from 'vue';
  
  export default {
    name: "StatutDocumentView",
    setup() {
      const documentStatusStore = useDocumentStatusStore();
      const statutId = documentStatusStore.$router.currentRoute.value.params.id;
  
      onMounted(() => {
        documentStatusStore.fetchStatut(statutId);
      });
  
      return {
        statut: computed(() => documentStatusStore.statut),
        loading: computed(() => documentStatusStore.loading),
        errorMessage: computed(() => documentStatusStore.errorMessage),
        editStatut: (id) => {
          documentStatusStore.$router.push({ name: 'EditStatut', params: { id } });
        },
        deleteStatut: (id) => {
          if (confirm("Êtes-vous sûr de vouloir supprimer ce statut ?")) {
            documentStatusStore.deleteStatut(id);
          }
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
  }
  
  .btn {
    margin-right: 10px;
  }
  </style>
  