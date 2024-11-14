<template>
    <div class="add-document-container">
        <h1 class="text-center">Ajouter un Document</h1>
        <form @submit.prevent="submitForm" class="document-form">
            <div class="form-group">
                <label for="titre">Titre du Document</label>
                <input
                    type="text"
                    id="titre"
                    v-model="document.titre"
                    required
                    class="form-control"
                    placeholder="Entrez le titre"
                />
            </div>

            <div class="form-group">
                <label for="description">Description du Document</label>
                <textarea
                    id="description"
                    v-model="document.description"
                    class="form-control"
                    placeholder="Décrivez le document (facultatif)"
                ></textarea>
            </div>

            <div class="form-group">
                <label for="date_depot">Date de Dépôt</label>
                <input
                    type="date"
                    id="date_depot"
                    v-model="document.date_depot"
                    required
                    class="form-control"
                />
            </div>

            <div class="form-group">
                <label for="type">Type de Document</label>
                <select
                    id="type"
                    v-model="document.id_TypeDocument"
                    required
                    class="form-control"
                >
                    <option value="" disabled>Choisissez un type</option>
                    <option
                        v-for="type in documentTypes"
                        :key="type.id"
                        :value="type.id"
                    >
                        {{ type.nom }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="statut">Statut du Document</label>
                <select
                    id="statut"
                    v-model="document.id_StatutDocument"
                    required
                    class="form-control"
                >
                    <option value="" disabled>Choisissez un statut</option>
                    <option
                        v-for="statut in documentStatuses"
                        :key="statut.id"
                        :value="statut.id"
                    >
                        {{ statut.nom }}
                    </option>
                </select>
            </div>

            <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>

            <div class="form-buttons">
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isSubmitting"
                >
                    {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter' }}
                </button>
                <button
                    type="button"
                    class="btn btn-secondary"
                    @click="goBack"
                >
                    Annuler
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddDocument',
    data() {
        return {
            document: {
                titre: '',
                description: '',
                date_depot: '',
                id_Utilisateur: localStorage.getItem('userId') || '', // Récupérer l'ID de l'utilisateur connecté
                id_TypeDocument: '',
                id_StatutDocument: '',
            },
            documentTypes: [],
            documentStatuses: [],
            selectedFile: null,
            successMessage: '',
            errorMessage: '',
            isSubmitting: false,
        };
    },
    created() {
        this.fetchDocumentTypes();
        this.fetchDocumentStatuses();
    },
    methods: {
        async fetchDocumentTypes() {
            try {
                const response = await axios.get('http://localhost:3051/api/types-document');
                this.documentTypes = response.data;
            } catch (error) {
                this.errorMessage = "Erreur lors de la récupération des types de document.";
            }
        },
        async fetchDocumentStatuses() {
            try {
                const response = await axios.get('http://localhost:3051/api/statuts-document');
                this.documentStatuses = response.data;
            } catch (error) {
                this.errorMessage = "Erreur lors de la récupération des statuts de document.";
            }
        },
        async submitForm() {
    console.log('Données avant envoi :', this.document);

    // Vérification des champs requis
    if (!this.document.titre || !this.document.description || !this.document.date_depot || !this.document.id_Utilisateur || !this.document.id_TypeDocument || !this.document.id_StatutDocument) {
        this.errorMessage = 'Tous les champs doivent être remplis.';
        return;
    }

    // Vérifiez si id_Utilisateur est vide
    if (!this.document.id_Utilisateur) {
        this.errorMessage = 'ID Utilisateur manquant. Veuillez vous connecter.';
        return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('titre', this.document.titre);
    formData.append('description', this.document.description);
    formData.append('date_depot', this.document.date_depot);
    formData.append('id_Utilisateur', this.document.id_Utilisateur);
    formData.append('id_TypeDocument', this.document.id_TypeDocument);
    formData.append('id_StatutDocument', this.document.id_StatutDocument);

    console.log('FormData avant envoi:', formData);

    try {
        await axios.post('http://localhost:3051/api/documents', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        this.successMessage = 'Document ajouté avec succès.';
        this.resetForm();
        setTimeout(() => {
            this.$router.push({ name: 'Documents' });
        }, 2000);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du document :', error);
        this.errorMessage = "Erreur lors de l'ajout du document.";
    } finally {
        this.isSubmitting = false;
    }
},
        resetForm() {
            this.document = {
                titre: '',
                description: '',
                date_depot: '',
                id_Utilisateur: localStorage.getItem('userId') || '',
                id_TypeDocument: '',
                id_StatutDocument: '',
            };
            this.selectedFile = null;
        },
        goBack() {
            this.$router.push({ name: 'Documents' });
        },
    },
};
</script>

<style scoped>
.add-document-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 30px;
    border: 2px solid #ececec;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.add-document-container:hover {
    transform: scale(1.02);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
}
h1 {
    margin-bottom: 20px;
    color: #333333;
    font-weight: 700;
    font-size: 2rem;
    text-align: center;
}
.document-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
.form-group {
    margin-bottom: 0;
}
label {
    font-weight: 600;
    color: #4a4a4a;
    display: block;
    margin-bottom: 5px;
}
input,
textarea,
select {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    padding: 12px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}
input:focus,
textarea:focus,
select:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0px 0px 5px rgba(59, 130, 246, 0.5);
}
textarea {
    resize: vertical;
    min-height: 100px;
}
.form-buttons {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 20px;
}
.btn {
    padding: 8px 12px;
    font-weight: 600;
    border-radius: 8px;
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
    background-color: #f9c0c0;
    color: #1e293b;
    border: 1px solid #d1d5db;
}
.btn-secondary:hover {
    background-color: #f29c9c;
    transform: translateY(-2px);
}
.alert {
    grid-column: span 2;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    font-weight: 600;
    text-align: center;
}
.alert-success {
    background-color: #d4edda;
    color: #155724;
}
.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
}
</style>
