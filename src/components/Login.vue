<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header text-center">
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt="Utilisateur" 
                    class="user-avatar rounded-circle mb-3"
                  />
                  <h3 class="text-center font-weight-light my-3">Bienvenue !</h3>
                  <p class="text-muted small">Connectez-vous pour continuer</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="handleLogin">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="inputEmail"
                        type="email"
                        v-model="email"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="inputEmail">Adresse e-mail</label>
                    </div>

                    <div class="form-floating mb-3 position-relative">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        id="inputPassword"
                        v-model="password"
                        placeholder="Mot de passe"
                        required
                      />
                      <label for="inputPassword">Mot de passe</label>
                      <!-- Bouton pour afficher/masquer le mot de passe -->
                      <button 
                        type="button" 
                        class="btn btn-toggle-password"
                        @click="togglePasswordVisibility"
                      >
                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                    </div>

                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        id="inputRememberPassword"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="inputRememberPassword">
                        Se souvenir de moi
                      </label>
                    </div>

                    <button type="submit" class="btn btn-primary btn-login">
                      Se connecter
                    </button>
                  </form>
                  <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
                </div>
                <div class="card-footer text-center py-3">
                  <div class="small">
                    <a href="/register">Besoin d'un compte ? Inscrivez-vous !</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const showPassword = ref(false);

const authStore = useAuthStore();

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    const response = await authStore.login(email.value, password.value);
    if (response.success) {
      alert("Connexion réussie !");
      window.location.href = "/dashboard";
    } else {
      errorMessage.value = response.message || "Erreur lors de la connexion.";
    }
  } catch (error) {
    errorMessage.value = error.message || "Erreur inattendue.";
    console.error("Erreur capturée :", error);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
/* Avatar utilisateur */
.user-avatar {
  width: 100px;
  height: 100px;
  border: 3px solid #007bff;
  object-fit: cover;
}

/* Carte de connexion */
.card {
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Titre */
.card-header h3 {
  font-weight: bold;
  font-size: 1.75rem;
  color: #444;
}

/* Champs de formulaire */
.form-floating input {
  border-radius: 10px;
  padding: 12px;
  font-size: 1rem;
}

/* Bouton pour afficher/masquer le mot de passe */
.btn-toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn-toggle-password:hover {
  color: #007bff;
}

/* Bouton de connexion */
.btn-login {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-weight: bold;
  background-color: #007bff;
  border: none;
}

.btn-login:hover {
  background-color: #0056b3;
  transition: background-color 0.3s ease;
}

/* Lien de texte */
.small a {
  color: #007bff;
  text-decoration: none;
}

.small a:hover {
  text-decoration: underline;
}

/* Message d'erreur */
.text-danger {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
