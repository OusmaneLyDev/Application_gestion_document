<template>
    <div class="login-container">
      <div class="login-card">
        <h2>Connexion</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" v-model="password" id="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserLogin',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await fetch('http://localhost:3051/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              mot_de_passe: this.password,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            // Stocker le token dans le localStorage
            localStorage.setItem('token', data.token);
  
            // Rediriger l'utilisateur vers la vue Dashboard
            this.$router.push({ name: 'DashboardView' });
          } else {
            alert(data.message || 'Connexion échouée');
          }
        } catch (error) {
          alert('Une erreur est survenue lors de la connexion');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  }
  
  .login-card {
    background: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .login-card h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: 600;
    color: #555;
    margin-bottom: 5px;
    display: block;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .form-control:focus {
    border-color: #6a11cb;
    outline: none;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-size: 1.1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  </style>
  