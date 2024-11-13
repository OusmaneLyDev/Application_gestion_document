// stores/documentStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],
    types: [],
    statuses: [],
    alertMessage: null,
    loading: false,
    selectedDocument: null,
  }),

  actions: {
    // Récupérer tous les documents
    async fetchDocuments() {
      this.loading = true;
      this.alertMessage = null;
      try {
        const response = await axios.get('http://localhost:3051/api/documents');
        this.documents = response.data;
        console.log('Documents récupérés :', this.documents);
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de la récupération des documents.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un document par ID
    async fetchDocumentById(id) {
      this.loading = true;
      this.alertMessage = null;
      try {
        const response = await axios.get(`http://localhost:3051/api/documents/${id}`);
        this.selectedDocument = response.data;
        console.log('Document récupéré :', this.selectedDocument);
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de la récupération du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau document
    async addDocument(document) {
      this.loading = true;
      this.alertMessage = null;
      try {
        const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = document;
        if (!titre || !id_Utilisateur || !id_TypeDocument || !id_StatutDocument || !date_depot) {
          this.alertMessage = 'Tous les champs obligatoires doivent être renseignés.';
          return;
        }
        const response = await axios.post('http://localhost:3051/api/documents', {
          titre,
          description,
          date_depot,
          id_Utilisateur,
          id_TypeDocument,
          id_StatutDocument,
        });
        this.documents.push(response.data);
        this.alertMessage = 'Document ajouté avec succès !';
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de l\'ajout du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Modifier un document par ID
    async editDocument(id, updatedDocument) {
      this.loading = true;
      this.alertMessage = null;
      try {
        const response = await axios.put(`http://localhost:3051/api/documents/${id}`, updatedDocument);
        const index = this.documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this.documents[index] = { ...this.documents[index], ...response.data.document };
          this.alertMessage = 'Document modifié avec succès !';
        }
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de la modification du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un document par ID
    async deleteDocument(id) {
      this.loading = true;
      this.alertMessage = null;
      try {
        await axios.delete(`http://localhost:3051/api/documents/${id}`);
        this.documents = this.documents.filter((doc) => doc.id !== id);
        this.alertMessage = 'Document supprimé avec succès !';
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de la suppression du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les types de documents
    async fetchTypes() {
      this.alertMessage = null;
      try {
        const response = await axios.get('http://localhost:3051/api/types-document');
        this.types = response.data;
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de la récupération des types de documents.';
        console.error('Erreur:', error);
      }
    },

    // Récupérer les statuts de documents
    async fetchStatuses() {
      this.alertMessage = null;
      try {
        const response = await axios.get('http://localhost:3051/api/statuts-document');
        this.statuses = response.data;
      } catch (error) {
        this.alertMessage = error.response?.data?.error || 'Erreur lors de la récupération des statuts de documents.';
        console.error('Erreur:', error);
      }
    },

    // Réinitialiser l'état du store
    resetState() {
      this.$patch({
        documents: [],
        types: [],
        statuses: [],
        alertMessage: null,
        loading: false,
        selectedDocument: null,
      });
    },

    // Effacer le message d'alerte
    clearAlert() {
      this.alertMessage = null;
    },
  },
});
