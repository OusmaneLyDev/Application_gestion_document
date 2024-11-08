<template>
    <div class="type-document-view">
      <h2>Détails du Type de Document</h2>
      <div v-if="type">
        <h3>{{ type.nom }}</h3>
        <p><strong>Description:</strong> {{ type.description }}</p>
        <button class="btn btn-warning" @click="goToEditType(type.id)">
          <i class="bi bi-pencil"></i> Modifier
        </button>
        <button class="btn btn-danger" @click="deleteType(type.id)">
          <i class="bi bi-trash"></i> Supprimer
        </button>
      </div>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <button class="btn btn-secondary" @click="goBack">Retour à la liste</button>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useDocumentTypeStore } from '../stores/documentTypeStore';
  
  export default {
    name: 'TypeDocumentView',
    setup() {
      const documentTypeStore = useDocumentTypeStore();
      const id = documentTypeStore.$route.params.id;
  
      onMounted(() => {
        documentTypeStore.fetchTypeById(id);
      });
  
      const type = computed(() => documentTypeStore.type);
      const errorMessage = computed(() => documentTypeStore.errorMessage);
  
      const goToEditType = (id) => {
        documentTypeStore.$router.push({ name: 'EditType', params: { id } });
      };
      
      const deleteType = (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce type de document ?")) {
          documentTypeStore.deleteType(id);
        }
      };
  
      const goBack = () => {
        documentTypeStore.$router.push({ name: 'ListeTypeDocument' });
      };
  
      return {
        type,
        errorMessage,
        goToEditType,
        deleteType,
        goBack,
      };
    }
  };
  </script>
  
  <style scoped>
  .type-document-view {
    width: 70%;
    margin: auto;
    margin-top: 20px;
  }
  
  .btn {
    margin-top: 20px;
  }
  </style>
  