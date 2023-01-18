import Vue from 'vue'
import VueRouter from 'vue-router'
import EditText from '../views/artists/EditText.vue'
import EditProfile from '../views/artists/EditProfile.vue'
import CommissionView from '../views/artists/CommissionView.vue'
import ReviewHistory from '../views/artists/ReviewHistory.vue'

Vue.use(VueRouter)

const routes = [
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
    component: () => import('../views/ProfileImages.vue')
  },
  {
    path: '/admin/user_admin/vue/videos',
    name: 'videos',
    component: () => import('../views/Videos.vue')
  },
  {
    path: '/admin/user_admin/vue/upload-animation',
    name: 'upload anim',
    component: () => import('../views/UploadAnimation.vue')
  },
  {
    path: '/admin/user_admin/vue/order-images',
    name: 'order images',
    component: () => import('../views/EditPortfolio.vue')
  },
  {
    path: '/admin/user_admin/vue/sort-images',
    name: 'sort images',
    component: () => import('../views/SortImage.vue')
  },
  {
    path: '/admin/user_admin/vue/sort-animations',
    name: 'sort animations',
    component: () => import('../views/SortImage.vue'),
    props: {
      anim: true
    }
  },
  {
    path: '/admin/user_admin/vue/order-animation',
    name: 'order animation',
    component: () => import('../views/EditPortfolio.vue'),
    props: {
      anim: true
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
    component: () => import('../views/UploadImage.vue')
  },
  {
    path: '/admin/user_admin/vue/upload-multiple',
    name: 'upload multiple',
    component: () => import('../views/MultipleUpload.vue')
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
  },
  {
    path: '/admin/user_admin/vue/selected-galleries',
    name: 'selected galleries',
    component: () => import('../views/FramerView.vue'),
    props: {
      src: '/admin/user_admin/SelectedGalleries.aspx'
    }
  },
  {
    path: '/admin/user_admin/vue/default-keywords',
    name: 'default keywords',
    component: () => import('../views/DefaultKeywordPage.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
