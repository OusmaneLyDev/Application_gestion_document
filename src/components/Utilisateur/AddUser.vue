<template>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div> Chargement...
    </div>
    <div v-else class="edit-user-container">
      <div class="edit-form-card">
        <h2 class="form-title">Ajouter un Utilisateur</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="nom" class="form-label">Nom</label>
            <input
              type="text"
              id="nom"
              v-model="nom"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez le nom"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez l'email"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="mot_de_passe" class="form-label">Mot de passe</label>
            <input
              type="password"
              id="mot_de_passe"
              v-model="mot_de_passe"
              class="form-control form-control-lg custom-input"
              placeholder="Entrez le mot de passe"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="role" class="form-label">Rôle</label>
            <select v-model="role" id="role" class="form-select form-control-lg custom-input" required>
              <option value="" disabled selected>Choisir un rôle</option>
              <option value="admin">Administrateur</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>
  
          <div class="button-group">
            <button type="submit" class="btn btn-primary btn-lg">
              <i class="bi bi-plus-circle"></i> Ajouter
            </button>
            <button class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  const userStore = useUserStore();
  const router = useRouter();
  const toast = useToast();
  
  const loading = ref(true);
  const nom = ref('');
  const email = ref('');
  const mot_de_passe = ref('');
  const role = ref('');
  
  onMounted(() => {
    // Simuler un chargement pour l'ouverture de la fenêtre
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  
  const submitForm = async () => {
    try {
      const confirmSubmit = confirm("Êtes-vous sûr de vouloir ajouter cet utilisateur ?");
      if (!confirmSubmit) return;
  
      await userStore.addUser(nom.value, email.value, mot_de_passe.value, role.value);
      toast.success('Utilisateur ajouté avec succès');
      clearForm();
      router.push('/Utilisateurs');
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
  
  const goBack = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  /* Conteneur de chargement */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    font-size: 1.5rem;
    color: #34495e;
  }
  
  .spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .edit-user-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  .edit-form-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
  }
  
  .form-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 20px;
  }
  
  .custom-input {
    border: 2px solid #6a11cb;
    border-radius: 8px;
    padding: 10px;
    font-size: 1rem;
    background-color: #f0f0f0;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .btn-outline-secondary {
    border: 2px solid #6c757d;
  }
  
  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
  }
  
  </style>
  