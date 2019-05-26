const fs = require('fs')
const { promisify } = require('util')
const args = require('minimist')(process.argv.slice(2))
const mkdirp = require('mkdirp')
const sharp = require('sharp')
const rimraf = require('rimraf')

const readDirAsync = promisify(fs.readdir)
const mkDirpAsync = promisify(mkdirp)

const outpuDir = (output, keepDir) => {
  if (keepDir) return

  if (fs.existsSync(output)) {
    rimraf.sync(output)
  }
  mkDirpAsync(output)
}

const setImageType = (imageSharp, outputFormat) => {
  switch (outputFormat) {
    case 'jpg': return imageSharp.jpeg({
      quality: 75,
      progressive: true
    })
    case 'webp': return imageSharp.webp({
      quality: 60
    })
    case 'png': return imageSharp.png({
      compressionLevel: 6,
      quality: 65,
      progressive: true
    })
    default:
      break
  }
}

// [576,768,992,1200]
const converter = async () => {
  try {
    const { breakpoints, output, sources, format, height, keep } = args
    const keepDir = (keep === undefined || keep === null) ? '' : keep.toLowerCase() === 'true'

    const points = breakpoints
    const outputArg = output || 'public'
    const input = sources || 'sources'
    const outputFormat = format || 'jpg'
    const outputHeight = parseInt(height) || 800
    const breakpointsArgs = Number.isInteger(points) === true ? Array.of(points) : points.split(',')

    // remove output folder and create new one
    outpuDir(outputArg, keepDir)

    // get async files
    const res = await readDirAsync(input)

    breakpointsArgs.forEach(breakpointsFolder => {
      // remove output folder and create new one
      outpuDir(`${outputArg}/${breakpointsFolder}`, keepDir)

      res.forEach(async (image) => {
        // file extension replace
        const newImage = image.replace(/\.[^\\.]+$/, `.${outputFormat}`)

        const imageSharp = await sharp(`${input}/${image}`)
        imageSharp.resize({
          // set width from command line or get default with 1200px
          // --breakpoints=576 - required parameter
          width: parseInt(breakpointsFolder),
          // default max height is 800px
          // if you set height then width i change also
          height: outputHeight,
          // maintain aspect ratio
          fit: sharp.fit.inside,
          // do not enlarge if the width or height are already less than the specified dimensions
          withoutEnlargement: true

        })
        // set type image [jepg, png, webp]
        // --format=webp or default jpg
        setImageType(imageSharp, outputFormat)
        // save to specific folder
        // --breakpoints=576 - required parameter
        imageSharp.toFile(`${outputArg}/${breakpointsFolder}/${newImage}`)
      })
    })
  } catch (err) {
    // return Object.assign(err)
    console.log(err.message)
  }
}

converter()
