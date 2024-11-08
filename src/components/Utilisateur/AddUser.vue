<template>
    <div class="add-user-container">
      <h2 class="text-center">Ajouter un Utilisateur</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nom" class="form-label">Nom</label>
          <input
            type="text"
            v-model="nom"
            class="form-control"
            id="nom"
            required
            placeholder="Entrez le nom"
          />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="email"
            required
            placeholder="Entrez l'email"
          />
        </div>
        <div class="form-group">
          <label for="mot_de_passe" class="form-label">Mot de passe</label>
          <input
            type="password"
            v-model="mot_de_passe"
            class="form-control"
            id="mot_de_passe"
            required
            placeholder="Entrez le mot de passe"
          />
        </div>
        <div class="form-group">
          <label for="role" class="form-label">Rôle</label>
          <select v-model="role" class="form-select" id="role" required>
            <option value="" disabled selected>Choisir un rôle</option>
            <option value="admin">Administrateur</option>
            <option value="user">Utilisateur</option>
          </select>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary" :disabled="userStore.loading">
            <span v-if="userStore.loading">Chargement...</span>
            <span v-else>Ajouter Utilisateur</span>
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Annuler</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from "../../stores/user";
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'AddUser',
    setup(_, { emit }) {
      const userStore = useUserStore();
      const toast = useToast();
      const nom = ref('');
      const email = ref('');
      const mot_de_passe = ref('');
      const role = ref('');
  
      const submitForm = async () => {
        try {
          const confirmSubmit = confirm("Êtes-vous sûr de vouloir ajouter cet utilisateur ?");
          if (!confirmSubmit) return;
  
          await userStore.addUser(nom.value, email.value, mot_de_passe.value, role.value);
          toast.success('Utilisateur ajouté avec succès');
          clearForm();
          emit('close');
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'utilisateur:", error);
          const errorMessage = error.response?.data?.message || "Échec de l'ajout de l'utilisateur";
          toast.error(errorMessage);
        }
      };
  
      const clearForm = () => {
        nom.value = '';
        email.value = '';
        mot_de_passe.value = '';
        role.value = '';
      };
  
      return {
        nom,
        email,
        mot_de_passe,
        role,
        userStore,
        submitForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .add-user-container {
    max-width: 450px;
    margin: 20px auto;
    padding: 25px;
    background-color: #ffffff;
    border: 2px solid #ececec;
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .add-user-container:hover {
    transform: scale(1.02);
  }
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    font-weight: 600;
    color: #4a4a4a;
  }
  
  .form-control,
  .form-select {
    border: 1px solid #d1d1d1;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
  }
  
  .form-control:focus,
  .form-select:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0px 0px 5px rgba(59, 130, 246, 0.5);
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .btn {
    padding: 8px 16px;
    font-weight: 600;
    border-radius: 6px;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }
  
  .btn-primary {
    background-color: #3b82f6;
    color: #ffffff;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }
  
  .btn-secondary {
    background-color: #f1f5f9;
    color: #1e293b;
    border: 1px solid #d1d5db;
  }
  
  .btn-secondary:hover {
    background-color: #e2e8f0;
    transform: translateY(-2px);
  }
  </style>
  