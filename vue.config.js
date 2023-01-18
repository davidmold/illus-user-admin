
module.exports = {
  devServer: {
    port: 8090,
    disableHostCheck: true
  },
  filenameHashing: true,
  publicPath: '/admin/user_admin/vue/',
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].minify = false
        return args
      })
    }
  }

}

// for user_admin and to deploy, make publicPath = '/admin/user_admin/vue/'
