// stores/document.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],
    types: [],
    statuses: [],
    alertMessage: null,
    loading: false,
  }),

  actions: {
    async fetchDocuments() {
      this.loading = true;
      this.alertMessage = null;
      try {
        const response = await axios.get('http://localhost:3051/api/documents');
        this.$patch({ documents: response.data });
        console.log('Documents récupérés :', this.documents);
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Erreur lors de la récupération des documents.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTypes() {
      this.alertMessage = null;
      try {
        const response = await axios.get('http://localhost:3051/api/types-document');
        this.$patch({ types: response.data });
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Erreur lors de la récupération des types de documents.';
        console.error('Erreur:', error);
      }
    },

    async fetchStatuses() {
      this.alertMessage = null;
      try {
        const response = await axios.get('http://localhost:3051/api/statuts-document');
        this.$patch({ statuses: response.data });
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Erreur lors de la récupération des statuts de documents.';
        console.error('Erreur:', error);
      }
    },

    async addDocument(document) {
      this.loading = true;
      this.alertMessage = null;
      try {
        if (!document.titre || !document.id_Utilisateur || !document.id_TypeDocument || !document.id_StatutDocument) {
          this.alertMessage = 'Tous les champs obligatoires doivent être renseignés.';
          return;
        }
        const response = await axios.post('http://localhost:3051/api/documents', document);
        this.$patch((state) => {
          state.documents.push(response.data);
        });
        this.alertMessage = 'Document ajouté avec succès !';
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Erreur lors de l\'ajout du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    async editDocument(id, updatedDocument) {
      this.loading = true;
      this.alertMessage = null;
      try {
        await axios.put(`http://localhost:3051/api/documents/${id}`, updatedDocument);
        const index = this.documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this.$patch((state) => {
            state.documents[index] = { ...state.documents[index], ...updatedDocument };
          });
          this.alertMessage = 'Document modifié avec succès !';
        }
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Erreur lors de la modification du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    async deleteDocument(id) {
      this.loading = true;
      this.alertMessage = null;
      try {
        await axios.delete(`http://localhost:3051/api/documents/${id}`);
        const index = this.documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this.$patch((state) => {
            state.documents.splice(index, 1);
          });
          this.alertMessage = 'Document supprimé avec succès !';
        }
      } catch (error) {
        this.alertMessage = error.response?.data?.message || 'Erreur lors de la suppression du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    clearAlert() {
      this.alertMessage = null;
    },

    resetState() {
      this.$patch({
        documents: [],
        types: [],
        statuses: [],
        alertMessage: null,
        loading: false,
      });
    },
  },
});
