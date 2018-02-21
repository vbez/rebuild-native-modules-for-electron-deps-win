#!/usr/bin/env node

var fs = require('fs');
var path = require('path')
var extract = require('extract-zip')

const distDir = path.join(__dirname, 'dist')
const zipFile = path.join(__dirname, 'iojs-1.8.2.zip')
extractFile(zipFile, distDir)

function extractFile (zipPath, toDir) {
   extract(zipPath, {dir: toDir}, function (err) {
      if (err) throw err

      const srcLibDir   = path.join(distDir,    'ia32')
      const srcLibFile  = path.join(srcLibDir,  'iojs.lib')
      const destLibDir  = path.join(distDir,    'Release')
      const destLibFile = path.join(destLibDir, 'iojs.lib')

      fs.mkdir(destLibDir, () => fs.createReadStream(srcLibFile).pipe(fs.createWriteStream(destLibFile)))
   })
}
