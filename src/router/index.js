import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/title',
    name: 'title',
    component: () => import('../views/TitleView.vue'),
    meta: { hideNavigation: true, requireAuth: false }
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import('../views/SignInView.vue'),
    meta: { hideNavigation: true, requireAuth: false }
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: () => import('../views/SignUpView.vue'),
    meta: { hideNavigation: true, requireAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/book_detail',
    name: 'book_detail',
    component: () => import('../views/BookDetailView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import('../views/TransactionView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/sell',
    name: 'sell',
    component: () => import('../views/SellView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/chat_list',
    name: 'chat_list',
    component: () => import('../views/ChatListView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/chat_room',
    name: 'chat_room',
    component: () => import('../views/ChatRoomView.vue'),
    meta: { hideNavigation: true, requireAuth: true }
  },
  {
    path: '/saved_list',
    name: 'saved_list',
    component: () => import('../views/SavedListView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/PersonalView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/SettingView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: () => import('../views/FAQView.vue'),
    meta: { hideNavigation: false, requireAuth: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
