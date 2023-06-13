import { createRouter, createWebHistory } from 'vue-router'


import CoachList from '@/views/coach/CoachList'
// import CoachProfile from '@/views/coach/CoachProfile'
// import CoachRegister from '@/views/coach/CoachRegister'

// import ContactCoach from '@/views/request/ContactCoach'
// import RequestRecevied from '@/views/request/RequestRecevied'

// import Auth from '@/views/auth'

// import NotFound from '@/views/NotFound'

const CoachProfile = () => import('@/views/coach/CoachProfile')
const CoachRegister = () => import('@/views/coach/CoachRegister')
const ContactCoach = () => import('@/views/request/ContactCoach')
const RequestRecevied = () => import('@/views/request/RequestRecevied')
const Auth = () => import('@/views/auth')

const NotFound = ()=> import('@/views/NotFound')



import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    redirect: '/coaches'
  },
  {
    path: '/coaches',
    component: CoachList
  },
  {
    path: '/coaches/:id',
    component: CoachProfile,
    props:true,
    children: [
      {
        path: 'contact',
        component: ContactCoach
      }
    ]
  },
  {
    path: '/register',
    component: CoachRegister,
    meta: {
      requiredAuth:true
    }
  },
  {
    path: '/requests',
    component: RequestRecevied,
    meta: {
      requiredAuth:true
    }
  },
  {
    path: '/auth',
    component: Auth,
    meta: {
      unRequiredAuth:true
    }
  },
  {
    path: '/:notFound(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, _, _2) { 
    if (to.path.includes('contact')) { 
      return {
        top: 300,
        behavior:'smooth'
      }
    }
    }
  }
)

router.beforeEach(function (to, from, next) { 
  if (to.meta.requiredAuth && !store.getters.hasToken) {
    next('/auth')
  } else if (to.meta.unRequiredAuth && store.getters.hasToken) {
    next('/coaches')
  } else { 
    next()
  }
})

export default router
