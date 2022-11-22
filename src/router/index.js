import Vue from 'vue'
import VueRouter from 'vue-router'
import EditText from '../views/artists/EditText.vue'
import EditProfile from '../views/artists/EditProfile.vue'
import CommissionView from '../views/artists/CommissionView.vue'
import ReviewHistory from '../views/artists/ReviewHistory.vue'
import UserHome from '../masterpages/EmbedVue.vue'
import ArtistGalleries from '../views/ArtistGalleries.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/user_admin',
    name: 'User name',
    component: UserHome,
    children: [
      {
        path: '/admin/user_admin/EditStyleGallery.aspx',
        name: 'artistGalleries',
        component: ArtistGalleries
      },
      {
        path: '/admin/user_admin/vue/edit-text',
        name: 'edit text',
        component: EditText
      },
      {
        path: '/admin/user_admin/vue/edit-profile',
        name: 'edit profile',
        component: EditProfile
      },
      {
        path: '/admin/user_admin/vue/commissions',
        name: 'commissions',
        component: CommissionView
      },
      {
        path: '/admin/user_admin/vue/review-history',
        name: 'review history',
        component: ReviewHistory
      },
      {
        path: '/admin/user_admin/vue/replace-image',
        name: 'replace image',
        component: () => import('../views/artists/ReplaceImage.vue')
      },
      {
        path: '/admin/user_admin/vue/faqs',
        name: 'faqs',
        component: () => import('../views/FaqPageDynamic.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
