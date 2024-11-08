// stores/document.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],       // Liste des documents récupérés
    types: [],           // Liste des types de documents
    statuses: [],        // Liste des statuts des documents
    alertMessage: null,  // Message d'alerte pour informer l'utilisateur
    loading: false,      // État de chargement pour les actions asynchrones
  }),
  actions: {
    async fetchDocumentById(id) {
      this.loading = true;
      this.alertMessage = null;
      try {
        const response = await axios.get(`http://localhost:3051/api/types-document/${id}`);
        return response.data; // Retourne le document
      } catch (error) {
        this.alertMessage = 'Erreur lors de la récupération du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchDocuments() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3051/api/documents');
        this.documents = response.data;
      } catch (error) {
        this.alertMessage = 'Erreur lors de la récupération des documents.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Action pour récupérer la liste des types de documents
    async fetchTypes() {
      try {
        const response = await axios.get('http://localhost:3051/api/types-document');
        this.types = response.data;
      } catch (error) {
        this.alertMessage = 'Erreur lors de la récupération des types de documents.';
        console.error('Erreur:', error);
      }
    },

    // Action pour récupérer la liste des statuts des documents
    async fetchStatuses() {
      try {
        const response = await axios.get('http://localhost:3051/api/statuts-document');
        this.statuses = response.data;
      } catch (error) {
        this.alertMessage = 'Erreur lors de la récupération des statuts de documents.';
        console.error('Erreur:', error);
      }
    },

    // Action pour ajouter un document
    async addDocument(document) {
      this.loading = true;
      this.alertMessage = null;
      try {
        // Vérification des champs obligatoires
        if (!document.titre || !document.id_Utilisateur || !document.id_TypeDocument || !document.id_StatutDocument) {
          this.alertMessage = 'Tous les champs obligatoires doivent être renseignés.';
          return;
        }
        // Envoi du document à l'API
        const response = await axios.post('http://localhost:3051/api/documents', document);
        this.documents.push(response.data);  // Ajouter le document ajouté à la liste
        this.alertMessage = 'Document ajouté avec succès !';
      } catch (error) {
        this.alertMessage = 'Erreur lors de l\'ajout du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Action pour modifier un document existant
    async editDocument(id, updatedDocument) {
      this.loading = true;
      try {
        // Envoi des modifications au backend
        await axios.put(`http://localhost:3051/api/documents/${id}`, updatedDocument);
        
        // Mise à jour de la liste des documents localement
        const index = this.documents.findIndex(doc => doc.id === id);
        if (index !== -1) {
          this.documents[index] = { ...this.documents[index], ...updatedDocument };
          this.alertMessage = 'Document modifié avec succès !';
        }
      } catch (error) {
        this.alertMessage = 'Erreur lors de la modification du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    // Action pour supprimer un document
    async deleteDocument(id) {
      this.loading = true;
      try {
        // Suppression du document depuis l'API
        await axios.delete(`http://localhost:3051/api/documents/${id}`);
        
        // Mise à jour de la liste des documents après suppression
        this.documents = this.documents.filter(doc => doc.id !== id);
        this.alertMessage = 'Document supprimé avec succès !';
      } catch (error) {
        this.alertMessage = 'Erreur lors de la suppression du document.';
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    clearAlert() {
      this.alertMessage = null;
    },
  },
});
