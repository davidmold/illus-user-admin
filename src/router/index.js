import Vue from 'vue'
import VueRouter from 'vue-router'
import EditText from '../views/artists/EditText.vue'
import EditProfile from '../views/artists/EditProfile.vue'
import CommissionView from '../views/artists/CommissionView.vue'
import ReviewHistory from '../views/artists/ReviewHistory.vue'
import UserHome from '../masterpages/UserAdmin.vue'
import PomsHome from '../masterpages/PomsAdmin.vue'
import AdminHome from '../views/poms/AdminHome.vue'
import AdminEditProfile from '../views/poms/AdminEditProfile.vue'
import PomsHeaderOnly from '../views/poms/PomsHeaderOnly.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/user_admin',
    name: 'User name',
    component: UserHome,
    children: [
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
      }
    ]
  },
  {
    path: '/admin/vue/Default.aspx',
    component: PomsHome,
    children: [
      {
        path: '/admin/vue/',
        name: 'admin vue home',
        component: AdminHome
      },
      {
        path: '/admin/vue/contact-details',
        name: 'contact details edit',
        component: AdminEditProfile
      }

    ]
  },
  {
    path: '/admin/*',
    name: 'poms catch all',
    component: PomsHeaderOnly
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
