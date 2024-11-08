<template>
    <div class="container">
        <h2>Inscription</h2>
        <form @submit.prevent="registerUser">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" v-model="user.nom" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="user.email" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="mot_de_passe" class="form-label">Mot de passe</label>
                <input type="password" v-model="user.mot_de_passe" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
        <p v-if="authStore.error" class="text-danger">{{ authStore.error }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';  // Importer ref depuis vue
import { useAuthStore } from '../stores/authStore';

export default {
    setup() {
        const authStore = useAuthStore();
        const user = ref({ nom: '', email: '', mot_de_passe: '' });

        const registerUser = async () => {
            try {
                await authStore.register(user.value);
                alert('Inscription réussie !');
            } catch (error) {
                console.error(error);
            }
        };

        return { authStore, user, registerUser };
    }
};
</script>
