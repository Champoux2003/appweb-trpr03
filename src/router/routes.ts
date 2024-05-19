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
    component: () => import('../views/QuestionView.vue'),
    meta: {
      requiresAuth: true
    }  
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      requiresAuth: true,
      // requiresTeacher: true a faire
    }
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
    props: true,
    meta: {
      requiresAuth: true
    }  
  },
  {
    path : "/classe",
    name : "Classe",
    component : () => import('../views/Classroom.vue'),
    meta: {
      requiresAuth: true
    }  
  }
]

export default routes
