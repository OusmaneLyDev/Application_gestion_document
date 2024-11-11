import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import DashboardView from '../views/DashboardView.vue';
import DocumentsView from '../views/DocumentsView.vue';
import UserLogin from '../components/UserLogin.vue';
import AddDocument from '../views/AddDocument.vue';
import ListeStatutDocument from '../components/ListeStatutDocument.vue';
import ListeTypeDocument from '../components/ListeTypeDocument.vue';
import TypeDocumentView from '@/views/TypeDocumentView.vue';
import UtilisateurView from '@/views/UtilisateurView.vue';
import AddUser from '@/components/Utilisateur/AddUser.vue';
import AddTypeDocument from '@/components/AddTypeDocument.vue';
import EditDocument from '../views/EditDocument.vue';
import DocumentDetails from '@/components/Document/DocumentDetails.vue';
import EditDocumentType from '@/components/TypeDocument/EditDocumentType.vue';
import DocumentTypeDetails from '@/components/TypeDocument/DocumentTypeDetails.vue';
import DocumentStatusDetails from '@/components/StatutDocument/DocumentStatusDetails.vue';
import EditDocumentStatus from '@/components/StatutDocument/EditDocumentStatus.vue';
import DetailsUtilisateur from '@/components/Utilisateur/DetailsUtilisateur.vue';
import ModifierUtilisateur from '@/components/Utilisateur/ModifierUtilisateur.vue';
import AddStatutDocument from '@/components/StatutDocument/AddStatutDocument.vue';
import AddDocumentType from '@/components/TypeDocument/AddDocumentType.vue';


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-type',
    name: 'AddDocumentType',
    component: AddDocumentType,
  },
  
  {
    path: '/add-type',
    name: 'AddType',
    component: AddTypeDocument,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-statut',
    name: 'AddStatut',
    component: AddStatutDocument,
  },
  {
    path: '/edit-document-type/:id',
    name: 'EditDocumentType',
    component: EditDocumentType,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/utilisateur/modifier/:id',
    name: 'ModifierUtilisateur',
    component: ModifierUtilisateur,
    props: true, // Permet de passer l'ID en tant que prop
  },
  {
    path: '/utilisateur/details/:id',
    name: 'DetailsUtilisateur',
    component: DetailsUtilisateur,
    props: true,
  },
  {
    path: '/document-type-details/:id',
    name: 'DocumentTypeDetails',
    component: DocumentTypeDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  
  {
    path: '/statuts/:id', 
    name: 'DocumentStatusDetails',
    component: DocumentStatusDetails,
    props: true,  // Permet de passer l'ID en tant que prop
  },
  {
    path: '/statuts/:id/edit', // Route pour modifier un statut de document
    name: 'EditDocumentStatus',
    component: EditDocumentStatus,
    props: true,  // Permet de passer l'ID en tant que prop
  },
  {
    path: '/edit/:id',
    name: 'EditDocument',
    component: EditDocument,
    meta: { requiresAuth: true },
  },
  {
    path: '/document/:id',
    name: 'DocumentDetails',
    component: DocumentDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-document',
    name: 'AddDocument',
    component: AddDocument,
    meta: { requiresAuth: true },
  },
  {
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: UtilisateurView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/documents',
    name: 'DocumentsView',
    component: DocumentsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/statut-document',
    name: 'StatutDocument',
    component: ListeStatutDocument,
    meta: { requiresAuth: true },
  },
  {
    path: '/liste-type-document',
    name: 'ListeTypeDocument',
    component: ListeTypeDocument,
    meta: { requiresAuth: true },
  },
  {
    path: '/types-document/:id',
    name: 'TypeDocumentView',
    component: TypeDocumentView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'UserLogin' });
  } else {
    next();
  }
});

export default router;
