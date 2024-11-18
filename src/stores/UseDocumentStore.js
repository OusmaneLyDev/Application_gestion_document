import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';

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
    // Récupérer le token depuis le stockage local ou un store global
    getAuthToken() {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('Aucun token trouvé dans le stockage local.');
      }
      return token;
    },

    getHeaders() {
      const token = this.getAuthToken();
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    },

    // Gestionnaire d'erreur global
    handleError(error, action) {
      const toast = useToast();
      this.alertMessage = error.response?.data?.error || `Erreur lors de ${action}.`;
      toast.error(this.alertMessage);
      console.error(`Erreur lors de ${action} :`, error);
    },

    // Récupérer tous les documents
    async fetchDocuments() {
      this.loading = true;
      const toast = useToast();
      try {
        const response = await axios.get('http://localhost:3051/api/documents', this.getHeaders());
        this.documents = response.data;
        toast.success('Documents récupérés avec succès !');
        console.log('Documents récupérés :', this.documents);
      } catch (error) {
        this.handleError(error, 'la récupération des documents');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un document par ID
    async fetchDocumentById(id) {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3051/api/documents/${id}`, this.getHeaders());
        this.selectedDocument = response.data;
        useToast().success('Document récupéré avec succès !');
        console.log('Document récupéré :', this.selectedDocument);
      } catch (error) {
        this.handleError(error, 'la récupération du document');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau document
    async addDocument(document) {
      this.loading = true;
      try {
        const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = document;
        if (!titre || !id_Utilisateur || !id_TypeDocument || !id_StatutDocument || !date_depot) {
          this.alertMessage = 'Tous les champs obligatoires doivent être renseignés.';
          useToast().error(this.alertMessage);
          return;
        }
        const response = await axios.post('http://localhost:3051/api/documents', {
          titre,
          description,
          date_depot,
          id_Utilisateur,
          id_TypeDocument,
          id_StatutDocument,
        }, this.getHeaders());
        this.documents.push(response.data);
        useToast().success('Document ajouté avec succès !');
      } catch (error) {
        this.handleError(error, "l'ajout du document");
      } finally {
        this.loading = false;
      }
    },

    // Modifier un document par ID
    async editDocument(id, updatedDocument) {
      this.loading = true;
      try {
        const response = await axios.put(`http://localhost:3051/api/documents/${id}`, updatedDocument, this.getHeaders());
        const index = this.documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this.documents[index] = { ...this.documents[index], ...response.data.document };
          useToast().success('Document modifié avec succès !');
        }
      } catch (error) {
        this.handleError(error, 'la modification du document');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un document par ID
    async deleteDocument(id) {
      this.loading = true;
      try {
        await axios.delete(`http://localhost:3051/api/documents/${id}`, this.getHeaders());
        this.documents = this.documents.filter((doc) => doc.id !== id);
        useToast().success('Document supprimé avec succès !');
      } catch (error) {
        this.handleError(error, 'la suppression du document');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les types de documents
    async fetchTypes() {
      try {
        const response = await axios.get('http://localhost:3051/api/types-document', this.getHeaders());
        this.types = response.data;
        useToast().success('Types de documents récupérés avec succès !');
      } catch (error) {
        this.handleError(error, 'la récupération des types de documents');
      }
    },

    // Récupérer les statuts de documents
    async fetchStatuses() {
      try {
        const response = await axios.get('http://localhost:3051/api/statuts-document', this.getHeaders());
        this.statuses = response.data;
        useToast().success('Statuts de documents récupérés avec succès !');
      } catch (error) {
        this.handleError(error, 'la récupération des statuts de documents');
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

    clearAlert() {
      this.alertMessage = null;
    },
  },
});
