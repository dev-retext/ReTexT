import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/title',
    name: 'title',
    component: () => import('../views/TitleView.vue'),
    meta: { hideNavigation: true }
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import('../views/SignInView.vue'),
    meta: { hideNavigation: true }
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: () => import('../views/SignUpView.vue'),
    meta: { hideNavigation: true }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/book_detail',
    name: 'book_detail',
    component: () => import('../views/BookDetailView.vue')
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import('../views/TransactionView.vue')
  },
  {
    path: '/sell',
    name: 'sell',
    component: () => import('../views/SellView.vue')
  },
  {
    path: '/chat_list',
    name: 'chat_list',
    component: () => import('../views/ChatListView.vue')
  },
  {
    path: '/chat_room',
    name: 'chat_room',
    component: () => import('../views/ChatRoomView.vue'),
    meta: { hideNavigation: true }
  },
  {
    path: '/saved_list',
    name: 'saved_list',
    component: () => import('../views/SavedListView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/PersonalView.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/SettingView.vue')
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: () => import('../views/FAQView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
