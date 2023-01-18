export default {
  async waitfor (len) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve()
        }, len)
      } catch (err) {
        reject(err)
      }
    })
  },
  getBestUnmarkedThumbnail (webimage, sz, crop) {
    let ret = '/ImageScaler.jpg?image_id=' + webimage.Id
    if (sz > 0) ret += '&sz=' + sz
    if (crop) ret += '&crop=y'
    if (webimage.HiresId > 0) {
      ret += '&src=hires&name=image_' + webimage.HiresId + '.jpg'
    } else {
      ret += '&src=fi&name=' + webimage.ImageUrl
    }
    return ret
  },
  randomVal () {
    let v = ''
    for (let i = 0; i < 6; i++) {
      v += '' + Math.floor(Math.random(10))
    }
    return v
  }

}
