// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'; 

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const error = ref(null);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3051/api/auth/register', userData); // Remplacez par l'URL de votre API d'inscription
            return response.data;
        } catch (err) {
            throw err.response.data || err.message;
        }
    };

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3051/api/auth/login', credentials); // Remplacez par l'URL de votre API de connexion
            return response.data;
        } catch (err) {
            throw err.response.data || err.message;
        }
    };

    // Action pour l'enregistrement d'un utilisateur
    const register = async (userData) => {
        error.value = null;
        try {
            const result = await registerUser(userData); // Appel à la fonction d'enregistrement
            user.value = result.utilisateur; // Enregistrez les données de l'utilisateur
            return result;
        } catch (err) {
            error.value = err.error || 'Erreur lors de l\'inscription';
            throw err;
        }
    };

    // Action pour la connexion d'un utilisateur
    const login = async (credentials) => {
        error.value = null;
        try {
            const result = await loginUser(credentials); // Appel à la fonction de connexion
            user.value = result.utilisateur; // Enregistrez les données de l'utilisateur
            localStorage.setItem('token', result.token); // Stocker le token
            return result;
        } catch (err) {
            error.value = err.error || 'Erreur lors de la connexion';
            throw err;
        }
    };

    // Action pour la déconnexion
    const logout = () => {
        user.value = null; // Réinitialiser les données de l'utilisateur
        localStorage.removeItem('token'); // Supprimer le token
    };

    return { user, error, register, login, logout };
});
