
module.exports = {
  'devServer': {
    'port': 8090,
    disableHostCheck: true
  },
  filenameHashing: true,
  publicPath: process.env.VUE_APP_PUBLIC_PATH

}

// for user_admin and to deploy, make publicPath = '/admin/user_admin/vue/'
