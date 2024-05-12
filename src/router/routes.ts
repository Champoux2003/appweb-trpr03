import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('../views/QuestionView.vue')  
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path : "/change-Credentials/:form",
    name : "ChangeCredentials",
    component : () => import('../views/ChangeCredentials.vue'),
    props: true
  }


]

export default routes
