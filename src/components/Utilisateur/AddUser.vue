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
              <option value="user">Gestionnaire RH</option>
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
  /* Conteneur de chargement sans arrière-plan */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
    font-size: 1.5rem;
    color: #2c3e50;
  }

  /* Spinner de chargement */
  .spinner {
    border: 6px solid #e0e0e0;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Conteneur pour l'édition de formulaire sans arrière-plan */
  .edit-user-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  /* Carte du formulaire */
  .edit-form-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    animation: fadeInUp 0.5s ease-in-out;
  }

  /* Titre du formulaire */
  .form-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  }

  /* Input personnalisé */
  .custom-input {
    border: 2px solid #6a11cb;
    border-radius: 8px;
    padding: 10px;
    font-size: 1rem;
    width: 100%;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
  }

  .custom-input:focus {
    border-color: #2575fc;
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.5);
  }

  /* Groupe de boutons */
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  /* Bouton secondaire */
  .btn-outline-secondary {
    border: 2px solid #6c757d;
    background: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    color: #6c757d;
    transition: background-color 0.3s, color 0.3s;
  }

  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
  }

  /* Animation d'apparition */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
