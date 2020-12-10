
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/viewers.vue') },
      { path: 'admin', component: () => import('pages/admin.vue') },
      { path: 'patient', component: () => import('pages/patient.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'c_login', component: () => import('pages/auth.vue') },
      { path: '/chat/:otherUserId', component: () => import('pages/chat.vue') },
      { path: '/home', component: () => import('pages/home.vue') },
      { path: '/doc', component: () => import('pages/doc.vue') },
      { path: '/users', component: () => import('pages/users.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
