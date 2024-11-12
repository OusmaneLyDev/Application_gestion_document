// src/stores/documentTypeStore.js
import { defineStore } from 'pinia';
import axios from '../axios'; // Assurez-vous que le chemin est correct

// URL de l'API centralisée
const API_URL = 'http://localhost:3051/api/types-document';

export const useDocumentTypeStore = defineStore('documentType', {
  state: () => ({
    types: [],                   // Liste des types de documents
    typeDetail: null,            // Détails d'un type de document spécifique
    errorMessage: null,          // Message d'erreur
    loading: false,              // Indicateur de chargement
  }),

  actions: {
    // Méthode pour définir le message d'erreur
    setErrorMessage(message) {
      this.errorMessage = message;
      console.error(message);
      // Effacer l'erreur après 5 secondes
      setTimeout(() => {
        this.clearErrorMessage();
      }, 5000);
    },

    // Effacer le message d'erreur
    clearErrorMessage() {
      this.errorMessage = null;
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
        // Assurez-vous que les propriétés 'nom' et 'id_Utilisateur' sont présentes
        if (!newType.nom || !newType.id_Utilisateur) {
          this.setErrorMessage("Nom et id_Utilisateur sont requis.");
          return;
        }

        const response = await axios.post(API_URL, newType);
        if (response.status === 201) {
          this.types.push(response.data); // Ajouter le nouveau type à la liste
          this.setErrorMessage("Type de document ajouté avec succès !");
        }
      } catch (error) {
        this.setErrorMessage("Erreur lors de l'ajout du type de document. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les détails d'un type de document par ID
    async getDocumentTypeById(id) {
        this.loading = true;
        try {
          const response = await axios.get(`${API_URL}/${id}`);
          this.typeDetail = response.data;  // Assurez-vous que la réponse est bien assignée
          return response.data;
        } catch (error) {
          this.setErrorMessage("Erreur lors de la récupération du type de document.");
          console.error('Erreur lors de la récupération du type de document:', error); // Afficher plus de détails sur l'erreur
          throw new Error('Erreur lors de la récupération du type de document');
        } finally {
          this.loading = false;
        }
      },

    // Méthode pour mettre à jour un type de document
    async updateDocumentType(document) {
        this.loading = true;
        try {
          // Mise à jour des informations du type de document
          const response = await axios.put(`${API_URL}/${document.id}`, {
            nom: document.nom,
            description: document.description,
            id_Utilisateur: document.id_Utilisateur, // Assurez-vous que l'id_Utilisateur est transmis
          });
          return response.data;
        } catch (error) {
          this.setErrorMessage("Erreur lors de la mise à jour du type de document.");
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
          // Supprimer le type de document de la liste locale
          this.types = this.types.filter((type) => type.id !== id); 
          this.setErrorMessage("Type de document supprimé avec succès !");
        }
      } catch (error) {
        this.setErrorMessage("Erreur lors de la suppression du type de document. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },
  },
});
