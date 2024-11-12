import api from './axios'; // Importez l'instance Axios configurée

export default {
  data() {
    return {
      utilisateurs: [],
      email: '',
      mot_de_passe: '',
      // autres données...
    };
  },
  methods: {
    async fetchUtilisateurs() {
      try {
        const response = await api.get('/utilisateurs'); // Endpoint pour récupérer les utilisateurs
        this.utilisateurs = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    
    async login() {
      try {
        const response = await api.post('/utilisateurs/login', {
          email: this.email,
          mot_de_passe: this.mot_de_passe,
        });
        console.log('Connexion réussie:', response.data);

        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.data.token);

        // Rediriger ou mettre à jour l'interface utilisateur
      } catch (error) {
        console.error('Erreur lors de la connexion:', error.response.data);
      }
    },
  },
  mounted() {
    this.fetchUtilisateurs(); // Appel initial pour récupérer les utilisateurs
  },
}; 
