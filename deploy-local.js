
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const config = {
  apikey: 'There8sisuhrsuheks82hofhffj',
  localFolder: 'G:/T-docs/web/illustration/user-admin/illus-user-admin/dist',
  remoteFolder: '/admin/user_admin/vue/',
  deployEndpoint: 'http://illus.lantic.local/IllusService.svc/DeployFile',
  liveDeployEndpoint: 'https://admin.illustrationx.com/IllusService.svc/DeployFile',
  aspDeployFile: 'G:/T-docs/web/illustration/illustration07/site/admin/AdminMaster.master'
}

const start = async (target) => {
  try {
    let endpoint = config.deployEndpoint
    if (target === 'live') {
      endpoint = config.liveDeployEndpoint
    }
    console.log(`Deploying to ${endpoint}.`)
    const filesPaths = await walkSync(config.localFolder)
    let embeds = []
    for (let i = 0; i < filesPaths.length; i++) {
      const statistics = `(${i + 1}/${filesPaths.length}, ${Math.round((i + 1) / filesPaths.length * 100)}%)`
      const filePath = filesPaths[i]
      const fileContent = fs.readFileSync(filePath)
      // If the slash is like this "/" s3 will create a new folder, otherwise will not work properly.
      const relativeToBaseFilePath = path.normalize(path.relative(config.localFolder, filePath))

      const relativeToBaseFilePathForS3 = config.remoteFolder + relativeToBaseFilePath
      const folder = relativeToBaseFilePathForS3.replace(/\\/g, '/')
      embeds.push(folder)

      console.log(`Uploading`, statistics, folder)
      const b64 = fileContent.toString('base64')
      let res = await axios.post(endpoint, { apikey: config.apikey, filedata: b64, location: folder })
      console.log('result', res.data.d)
      injectFiles(embeds, config.aspDeployFile)
    }
  } catch (err) {
    console.log('deploy-error', err.response.statusText)
  }
}

const AHS = '<!-- APP_HEADER_START -->'
const AHE = '<!-- APP_HEADER_END -->'
const APS = '<!-- APP_BODY_START -->'
const APE = '<!-- APP_BODY_END -->'

async function injectFiles (embeds, filename) {
  let str = fs.readFileSync(filename)
  let header = []
  let footer = []
  for (let item of embeds) {
    if (item.endsWith('.css')) {
      header.push(`  <link href="${item}" rel="preload" as="style" />`)
      header.push(`  <link href="${item}" rel="stylesheet" />`)
    } else if (item.endsWith('.js')) {
      header.push(`  <link href="${item}" rel="preload" as="script" />`)
      footer.push(`<script src="${item}"> </script>`)
    }
  }
  let clumpa = str.indexOf(AHS) + AHS.length
  let clumpb = str.indexOf(AHE)
  let clumpc = str.indexOf(APS) + APS.length
  let clumpd = str.indexOf(APE)
  let outstr = str.slice(0, clumpa) + '\r\n' + header.join('\r\n')
  outstr += '\r\n' + str.slice(clumpb, clumpc) + '\r\n'
  outstr += footer.join('\r\n')
  outstr += '\r\n'
  outstr += str.slice(clumpd)
  fs.writeFileSync(filename, Buffer.from(outstr, 'utf8'))
  console.log('updated', filename)
}

async function walkSync (dir) {
  const files = fs.readdirSync(dir)
  const output = []
  for (const file of files) {
    const pathToFile = path.join(dir, file)
    const isDirectory = fs.statSync(pathToFile).isDirectory()
    if (isDirectory) {
      output.push(...await walkSync(pathToFile))
    } else {
      output.push(await pathToFile)
    }
  }
  return output
}

let args = process.argv
let target = 'local'
if (args.length > 2) {
  target = args[2]
}
start(target).then(() => {
  console.log(`Completed!`)
})
