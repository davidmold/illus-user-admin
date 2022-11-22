export default {
  waitfor: async function (len) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve()
        }, len)
      } catch (err) {
        reject(err)
      }
    })
  }

}
