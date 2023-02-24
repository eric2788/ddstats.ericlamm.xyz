import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/users',
    name: 'user',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/watchers',
    name: 'watchers',
    component: () => import('../views/WatcherView.vue'),
    children: [
      {
        path: '',
        components: {
          watcherView: () => import('../views/WatcherSearchView.vue')
        }
      },
      {
        path: 'stats',
        components: {
          watcherView: () => import('../views/WatcherStatsView.vue')
        }
      }
    ]
  },
  {
    path: '/watcher/:uid',
    name: 'watcher',
    component: () => import('../views/WatcherDetailView.vue')
  },
  {
    path: '/records',
    name: 'records',
    component: () => import('../views/RecordsView.vue')
  },
  {
    path: '/user/:uid',
    name: 'user-detail',
    component: () => import('../views/UserDetailView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
