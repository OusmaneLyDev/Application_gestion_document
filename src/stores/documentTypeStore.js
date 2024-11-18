import { defineStore } from 'pinia';
import axios from '../axios'; // Assurez-vous que le chemin est correct

// URL de l'API centralisée
const API_URL = 'http://localhost:3051/api/types-document';

export const useDocumentTypeStore = defineStore('documentType', {
  state: () => ({
    types: [],                   // Liste des types de documents
    typeDetail: null,            // Détails d'un type de document spécifique
    errorMessage: null,          // Message d'erreur
    successMessage: null,        // Message de succès
    loading: false,              // Indicateur de chargement
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
        if (!newType.nom ) {
          this.setErrorMessage("Nom et id_Utilisateur sont requis.");
          return;
        }

        const response = await axios.post(API_URL, newType);
        if (response.status === 201) {
          this.types.push(response.data);
          this.setSuccessMessage("Type de document ajouté avec succès !");
        }
      } catch (error) {
        this.setErrorMessage(error.response?.data?.message || "Erreur lors de l'ajout du type de document.");
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
          id_Utilisateur: document.id_Utilisateur,
        });

        // Mettre à jour la liste locale
        const index = this.types.findIndex((type) => type.id === document.id);
        if (index !== -1) {
          this.types[index] = response.data;
        }
        this.setSuccessMessage("Le type de document a été mis à jour avec succès.");
        return response.data;
      } catch (error) {
        this.setErrorMessage(error.response?.data?.message || "Erreur lors de la mise à jour du type de document.");
        throw new Error('Erreur lors de la mise à jour du type de document');
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
          this.types = this.types.filter((type) => type.id !== id);
          this.setSuccessMessage("Type de document supprimé avec succès !");
        }
      } catch (error) {
        this.setErrorMessage(error.response?.data?.message || "Erreur lors de la suppression du type de document.");
      } finally {
        this.loading = false;
      }
    },
  },
});
