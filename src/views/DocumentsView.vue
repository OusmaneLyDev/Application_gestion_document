<template>
    <div class="container">
      <!-- <h1>Liste des Documents</h1> -->
      <!-- <button @click="goToAddDocument" class="add-document-btn">
        <i class="bi bi-file-earmark-plus"></i> Ajouter un document
      </button> -->
      <DocumentList :documents="documentStore.documents" />
      <div v-if="loading" class="loading">Chargement des documents...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import { useDocumentStore } from '@/stores/UseDocumentStore';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import DocumentList from '@/components/Document/DocumentList.vue';
  
  export default {
    name: 'DocumentsView',
    components: {
      DocumentList,
    },
    setup() {
      const documentStore = useDocumentStore();
      const router = useRouter();
      const loading = ref(false);
      const error = ref(null);
  
      const fetchAllData = async () => {
        loading.value = true;
        error.value = null;
        try {
          await Promise.all([
            documentStore.fetchDocuments(),
            documentStore.fetchTypes(),
            documentStore.fetchStatuses(),
          ]);
        } catch (err) {
          error.value = 'Erreur lors de la récupération des données : ' + (err.message || 'Erreur inconnue');
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(fetchAllData);
  
      const goToAddDocument = () => {
        router.push({ name: 'AddDocument' });
      };
  
      return {
        goToAddDocument,
        documentStore,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .add-document-btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
  }
  .loading {
    text-align: center;
    margin-top: 20px;
  }
  .error {
    color: red;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  