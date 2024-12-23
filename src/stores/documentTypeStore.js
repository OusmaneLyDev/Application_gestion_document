import { defineStore } from 'pinia';
import axios from '../axios';
import { useToast } from 'vue-toastification';


const toast = useToast();
const API_URL = 'http://localhost:3051/api/types-document';

export const useDocumentTypeStore = defineStore('documentType', {
  state: () => ({
    types: [],                   
    typeDetail: null,                  
    loading: false,              
  }),

  actions: {
    // Définir le message d'erreur
    setErrorMessage(message) {
      this.errorMessage = message;
      console.error(message);
      setTimeout(() => {
        this.clearErrorMessage();
      }, 5000);
    },

    // Effacer le message d'erreur
    clearErrorMessage() {
      this.errorMessage = null;
    },

    // Définir le message de succès
    setSuccessMessage(message) {
      this.successMessage = message;
      console.log(message);
      setTimeout(() => {
        this.clearSuccessMessage();
      }, 5000);
    },

    // Effacer le message de succès
    clearSuccessMessage() {
      this.successMessage = null;
    },

    // Récupérer tous les types de documents
    async fetchTypes(forceReload = false) {
      if (!forceReload && this.types.length > 0) return;
      this.loading = true;
      try {
        const response = await axios.get(API_URL);
        this.types = response.data;
      } catch (error) {
        this.setErrorMessage("Erreur lors de la récupération des types de documents. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau type de document
    async addType(newType) {
      this.loading = true;
      try {
        if (!newType.nom) {
          this.setErrorMessage("Nom est requis.");
          return;
        }
    
        const response = await axios.post(API_URL, newType);
        if (response.status === 201) {
          toast.success("Nouveau type de document ajouté avec succès !");
          await this.fetchTypes(true); // Recharger les types après l'ajout
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de l'ajout du type de document.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les détails d'un type de document par ID
    async getDocumentTypeById(id) {
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        this.typeDetail = response.data;
        return response.data;
      } catch (error) {
        this.setErrorMessage(error.response?.data?.message || "Erreur lors de la récupération du type de document.");
        throw new Error('Erreur lors de la récupération du type de document');
      } finally {
        this.loading = false;
      }
    },

    // Mettre à jour un type de document
    async updateDocumentType(document) {
      this.loading = true;
      try {
        const response = await axios.put(`${API_URL}/${document.id}`, {
          nom: document.nom,
          description: document.description,
        });
    
        if (response.status === 200) {
          toast.success("Type de document mis à jour avec succès !");
          await this.fetchTypes(true); // Recharger les types après la modification
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la mise à jour du type de document.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un type de document par ID
    async deleteType(id) {
      this.loading = true;
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 204) {
          toast.success("Type de document supprimé avec succès !");
          await this.fetchTypes(true); // Recharger les types après la suppression
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la suppression.");
      } finally {
        this.loading = false;
      }
    },
  },
});
