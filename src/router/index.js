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
    path: '/admin/user_admin/EditStyleGallery.aspx',
    name: 'artistGalleries',
    component: ArtistGalleries
  },
  {
    path: '/admin/user_admin',
    name: 'User name',
    component: UserHome,
    children: [
      {
        path: '/admin/user_admin/vue/',
        name: 'artist home',
        component: () => import('../views/HomePage.vue')
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
      },
      {
        path: '/admin/user_admin/vue/profile-images',
        name: 'profile images',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/ProfileImages.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/videos',
        name: 'videos',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/Videos.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/upload-animation',
        name: 'upload anim',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/UploadAnimation.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/order-images',
        name: 'order images',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/OrderImages.aspx?anim=N'
        }
      },
      {
        path: '/admin/user_admin/vue/sort-images',
        name: 'sort images',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/SortImages.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/order-animation',
        name: 'order animation',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/OrderImages.aspx?anim=Y'
        }
      },
      {
        path: '/admin/user_admin/vue/style-galleries',
        name: 'style galleries',
        component: () => import('../views/StyleGalleries.vue')
      },
      {
        path: '/admin/user_admin/vue/style-gallery',
        name: 'style gallery',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/EditStyleGallery.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/upload-image',
        name: 'upload image',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/UploadPortfolioImage.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/list-images',
        name: 'list images',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/ListImages.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/list-images',
        name: 'list images',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/ListImages.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/list-animations',
        name: 'list animations',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/ListAnimations.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/homepage-visits',
        name: 'homepage visits',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/HomepageVisits.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/artist-gallery-stats',
        name: 'artist gallery stats',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/ArtistGalleryStats.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/portfolio-stats',
        name: 'portfolio stats',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/PortfolioStats.aspx'
        }
      },
      {
        path: '/admin/user_admin/vue/all-page-stats',
        name: 'all artists',
        component: () => import('../views/FramerView.vue'),
        props: {
          src: '/admin/user_admin/AllPageStats.aspx'
        }
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
