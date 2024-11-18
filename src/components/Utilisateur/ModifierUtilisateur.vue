<template>
    <div class="edit-user-container">
      <div class="edit-user-form-card">
        <button @click="closeForm" class="close-button">X</button>
        <h2 class="form-title">Modifier l'utilisateur</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label for="nom" class="form-label">Nom</label>
            <input
              id="nom"
              v-model="user.nom"
              class="form-control form-control-lg custom-input"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              v-model="user.email"
              class="form-control form-control-lg custom-input"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="role" class="form-label">Rôle</label>
            <input
              id="role"
              v-model="user.role"
              class="form-control form-control-lg custom-input"
              required
            />
          </div>
  
          <div class="button-group">
            <button type="submit" class="btn btn-success btn-lg me-2">
              <i class="bi bi-check-circle"></i> Enregistrer
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-x-circle"></i> Annuler
            </button>
          </div>
          
          <div v-if="errorMessage" class="alert alert-danger mt-4">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'EditUser',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const userStore = useUserStore();
  
      const user = ref({
        id: null,
        nom: '',
        email: '',
        role: ''
      });
  
      const errorMessage = ref('');
  
      // Récupérer l'utilisateur par ID
      const fetchUser = async () => {
        const userId = parseInt(route.params.id); // Convertir en nombre si l'ID est numérique
        try {
          const foundUser = userStore.users.find(u => u.id === userId);
          if (foundUser) {
            user.value = { ...foundUser }; // Copie les données de l'utilisateur dans le formulaire
          } else {
            // Si l'utilisateur n'est pas trouvé localement, on le charge depuis l'API
            await userStore.fetchUsers();
            const fetchedUser = userStore.users.find(u => u.id === userId);
            if (fetchedUser) {
              user.value = { ...fetchedUser };
            } else {
              errorMessage.value = 'Utilisateur non trouvé';
            }
          }
        } catch (error) {
          errorMessage.value = 'Erreur lors du chargement des détails de l\'utilisateur';
        }
      };
  
      const updateUser = async () => {
  try {
    console.log('Updating user:', user.value);
    await userStore.updateUser(user.value.id, {
      nom: user.value.nom,
      email: user.value.email,
      role: user.value.role
    });
    router.push({ name: 'Utilisateurs' }); 
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    errorMessage.value = 'Erreur lors de la mise à jour de l\'utilisateur';
  }
};

  
      const goBack = () => {
        router.push({ name: 'Utilisateurs' });
      };
  
      const closeForm = () => {
        router.push({ name: 'Utilisateurs' }); 
      };
  
      onMounted(fetchUser);
  
      return {
        user,
        errorMessage,
        updateUser,
        goBack,
        closeForm
      };
    }
  };
  </script>
  
  <style scoped>
  /* Conteneur principal pour l'édition de l'utilisateur */
  .edit-user-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: none;
    padding: 20px;
  }

  /* Carte du formulaire d'édition */
  .edit-user-form-card {
    position: relative;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    animation: fadeInUp 0.5s ease-in-out;
  }

  /* Bouton de fermeture */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #444;
    cursor: pointer;
    transition: color 0.3s;
  }

  .close-button:hover {
    color: #e74c3c;
  }

  /* Titre */
  h2 {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  }

  /* Texte */
  p {
    margin-bottom: 10px;
    color: #555;
  }

  /* Message d'alerte */
  .alert {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    background-color: #f8d7da;
    color: #721c24;
    text-align: center;
  }

  /* Bouton secondaire */
  .btn-secondary {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #444;
    transition: background-color 0.3s;
  }

  .btn-secondary:hover {
    background-color: #e0e0e0;
  }

  /* Bouton de confirmation */
  .btn-success {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    transition: background-color 0.3s;
  }

  .btn-success:hover {
    background-color: #218838;
  }

  /* Animation */
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
