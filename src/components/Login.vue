<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <!-- Ajout de 'col-lg-6' pour augmenter la largeur de la carte -->
            <div class="col-lg-6 col-md-8">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4">Connexion</h3>
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

                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="password"
                        v-model="password"
                        placeholder="Mot de passe"
                        required
                      />
                      <label for="inputPassword">Mot de passe</label>
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

                    <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <a class="small" href="/forgot-password">Mot de passe oublié ?</a>
                      <button type="submit" class="btn btn-primary">Se connecter</button>
                    </div>
                  </form>
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
</script>

<style scoped>
/* Ajuster la largeur et le style de la carte */
.col-lg-6 {
  max-width: 700px;
}

.card {
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Titre */
.card-header h3 {
  font-weight: bold;
  font-size: 1.75rem;
  color: #444;
}

/* Champs de formulaire */
.form-floating input {
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
}

/* Bouton de connexion */
.btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
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
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
