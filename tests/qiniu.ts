// 私密参数
const {
  QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY || 'bz9C65JrU372JEFriDZtYLvyfnc9_w1_vqKHXyNi',
  QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY || 'q2hlU2BJVa2iF30w_Anlox5qojh957BFw2suQ8Lx',
  QINIU_SCOPE = process.env.QINIU_SCOPE || 'zlebdg-huadong',
} = process.env

// 七牛
const qiniu = require('qiniu')

const mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY)

const config = new qiniu.conf.Config()
// 区域
if (QINIU_SCOPE.endsWith('-huadong')) {
  config.zone = qiniu.zone.Zone_z0 // 华东
}
if (QINIU_SCOPE.endsWith('-huabei')) {
  config.zone = qiniu.zone.Zone_z1 // 华北
}
if (QINIU_SCOPE.endsWith('-huanan')) {
  config.zone = qiniu.zone.Zone_z2 // 华南
}
if (QINIU_SCOPE.endsWith('-beimei')) {
  config.zone = qiniu.zone.Zone_na0 // 北美
}

const formUploader = new qiniu.form_up.FormUploader(config)
const fs = require('fs')
const path = require('path')

const allFiles = ((dir, callback) => {
  fs.stat(dir, (error, stats) => {
    if (stats.isFile()) {
      callback(dir)
    }
    if (stats.isDirectory()) {
      fs.readdir(dir, ((err, files) => {
        files.forEach(filename => {
          allFiles(path.join(dir, filename), callback)
        })
      }))
    }
  })
})

allFiles('./dist', (filename) => {
  const localFile = filename
  const key = filename.replace(/\\/g, '/').replace(/^dist\//g, '')

  // const options = { scope: QINIU_SCOPE } // 不覆盖
  const options = { scope: QINIU_SCOPE + ':' + key }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  formUploader.putFile(uploadToken, key, localFile, null, (respErr, respBody, respInfo) => {
    if (respErr) {
      throw respErr
    }
    console.log(respBody)
    if (respInfo.statusCode !== 200) {
      throw new Error('七牛上传失败 qiniu upload failed')
    }
  })
})
