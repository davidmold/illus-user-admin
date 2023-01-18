async function getCanvasBlob (ctx, filename) {
  return new Promise((resolve) => {
    ctx.canvas.toBlob((blob) => {
      const file = new File([blob], filename, {
        type: 'image/jpeg',
        lastModified: Date.now()
      })
      resolve(file)
    }, 'image/jpeg', 0.75)
  })
}

export default {
  getTwinCrops: async function (file) {
    const reader = new FileReader()
    const fileName = file.name
    return new Promise((resolve, reject) => {
      reader.onerror = error => {
        reject(error)
      }
      reader.onload = event => {
        const img = new Image()
        img.onerror = (err) => {
          reject(err)
        }
        img.onload = async () => {
          const elem = document.createElement('canvas')
          let w = Math.ceil(img.width / 2)
          let h = img.height
          elem.width = w
          elem.height = h

          const ctx = elem.getContext('2d')
          ctx.drawImage(img, 0, 0, img.width, img.height)
          let file = await getCanvasBlob(ctx, fileName)
          ctx.fillRect(0, 0, w, h)
          ctx.drawImage(img, w, 0, w, h, 0, 0, w, h)
          let file2 = await getCanvasBlob(ctx, 'side2.jpg')
          resolve([file, file2])
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  },
  async getImageSize (file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onerror = error => {
        reject(error)
      }
      reader.onload = event => {
        const img = new Image()
        img.onerror = (err) => {
          reject(err)
        }
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.src = event.target.result
      }
      console.log('doing read as data url')
      reader.readAsDataURL(file)
    })
  },
  scaleToFit (img, file, width, callback) {
    const elem = document.createElement('canvas')
    const fileName = file.name
    if (img.width < width) {
      callback(file)
      return
    }
    const sf = width / img.width
    let height = Math.ceil(img.height * sf)
    elem.width = width
    elem.height = height
    const ctx = elem.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)
    ctx.canvas.toBlob((blob) => {
      const file = new File([blob], fileName, {
        type: 'image/jpeg',
        lastModified: Date.now()
      })
      callback(file)
    }, 'image/jpeg', 0.75)
  },
  scaleAndCropSquare (img, file, width, callback) {
    const elem = document.createElement('canvas')
    const fileName = file.name
    if ((img.width < width) || (img.height < width)) {
      callback(file)
      return
    }
    let sf = img.width / width
    let sf2 = img.height / width
    sf = Math.min(sf, sf2)
    elem.width = width
    elem.height = width
    let top = 0
    let left = 0
    let dwidth = width * sf
    let destWidth = width
    let destHeight = width
    sf2 = 1 / sf
    if (img.height > img.width) {
      console.log('image is portrait')
      const scaledHeight = (img.height - dwidth) * sf2
      top = 0 - Math.round(scaledHeight / 2)
      destHeight = img.height * sf2
    }
    if (img.width >= img.height) {
      console.log('image is landscape')
      const scaledWidth = (img.width - dwidth) * sf2
      left = 0 - Math.round(scaledWidth / 2)
      destWidth = img.width * sf2
    }
    console.log(`${img.width} * ${sf2} = ${destWidth}`)
    console.log(`doing crop dwidth ${dwidth}  sf = ${sf} sf2 = ${sf2}`)
    console.log(`destHeight = ${destHeight} destWidth = ${destWidth}, img.width = ${img.width} img.height = ${img.height}`)
    console.log(`top ${top}  left ${left}`)
    const ctx = elem.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height, left, top, destWidth, destHeight)
    ctx.canvas.toBlob((blob) => {
      const file = new File([blob], fileName, {
        type: 'image/jpeg',
        lastModified: Date.now()
      })
      callback(file)
    }, 'image/jpeg', 0.75)
  },
  async scaleImage (file, width, square) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onerror = error => {
        reject(error)
      }
      reader.onload = event => {
        const img = new Image()
        img.onerror = (err) => {
          reject(err)
        }
        img.onload = () => {
          try {
            if (square) {
              this.scaleAndCropSquare(img, file, width, resolve)
            } else {
              this.scaleToFit(img, file, width, resolve)
            }
          } catch (err) {
            reject(err)
          }
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  }
}
