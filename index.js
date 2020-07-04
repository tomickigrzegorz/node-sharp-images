'use strict'

const { existsSync, readdir, mkdir } = require('fs')
const { promisify } = require('util')
const { remove } = require('fs-extra')
const sharp = require('sharp')
const inquirer = require('inquirer')
const readDirAsync = promisify(readdir)

inquirer.registerPrompt('directory', require('inquirer-directory'))

const outpuDir = (output, keepDir) => {
  if (!keepDir) {
    remove('./output')
      .then(() => {
        mkdir(output, { recursive: true }, err => {
          if (err) throw console.log(err)
        })
      })
  } else {
    mkdir(output, { recursive: true }, err => {
      if (err) throw console.log(err)
    })
  }
}

const setImageType = (imageSharp, quality, outputFormat) => {
  switch (outputFormat) {
    case 'jpg': return imageSharp.jpeg({
      quality,
      progressive: true
    })
    case 'webp': return imageSharp.webp({
      quality
    })
    case 'png': return imageSharp.png({
      compressionLevel: 6,
      quality,
      progressive: true
    })
    default:
      break
  }
}

// [576,768,992,1200]
const converter = async (args) => {
  try {
    const { from, points, format, quality, height, keepDir } = args

    // console.log(args)

    const outputFormat = format
    const outputHeight = height
    const qualityImage = +quality
    const breakpointsArgs = Number.isInteger(points) === true ? Array.of(points) : points.split(',')

    const outputDir = `./output/${from}`
    const sourceDir = `./sources/${from}`

    // checking if the folder is in sources
    if (!existsSync(sourceDir)) {
      console.log(`The specified folder does not exist - ${sourceDir}`)
      return false
    }

    // console.log(breakpointsArgs)

    // remove output folder and create new one
    breakpointsArgs.forEach(breakpointsFolder => {
      outpuDir(`${outputDir}/${breakpointsFolder}`, keepDir)
    })

    await new Promise((resolve, reject) => {
      setTimeout(() => resolve('done !'), 5000)
    })

    // get async files
    const res = await readDirAsync(sourceDir)

    breakpointsArgs.forEach(breakpointsFolder => {
      // remove output folder and create new one
      // outpuDir(`${outputDir}/${breakpointsFolder}`, keepDir)

      res.forEach(async (image) => {
        // file extension replace
        const newImage = image.replace(/\.[^\\.]+$/, `.${outputFormat}`)

        const imageSharp = await sharp(`${sourceDir}/${image}`)
        imageSharp.resize({
          // set width from command line or get default with 1200px
          width: parseInt(breakpointsFolder),

          // default max height is 800px
          // if you set height then width i change also
          height: +outputHeight,

          // maintain aspect ratio
          fit: sharp.fit.inside,

          // do not enlarge if the width or height are already less than the specified dimensions
          withoutEnlargement: true

        })
        // set type image [jpg, png, webp]
        setImageType(imageSharp, qualityImage, outputFormat)

        // save to specific folder - breakpoints
        imageSharp.toFile(`${outputDir}/${breakpointsFolder}/${newImage}`)

        // console.clear()
        // show in console
        console.log(`saving file [ ${breakpointsFolder}/${newImage} ]`)
      })
    })
  } catch (err) {
    console.log(err.message)
  }
}

inquirer.prompt([
  {
    type: 'directory',
    name: 'from',
    message: 'Folder to convert',
    basePath: './sources'
  },
  {
    type: 'input',
    name: 'points',
    message: 'Select breakpoints e.g. 576,768,992,1200,..., default:',
    default: '576,768,992,1200'
  },
  {
    type: 'list',
    name: 'format',
    choices: [
      { value: 'jpg' },
      { value: 'png' },
      { value: 'webp' }
    ],
    message: 'Select a format, default:',
    default: ['jpg']
  },
  {
    type: 'input',
    name: 'quality',
    message: 'Set photo quality [1 to 100], default:',
    default: 60
  },
  {
    type: 'input',
    name: 'height',
    message: 'Maximum photo height, default:',
    default: 800
  },
  {
    type: 'confirm',
    name: 'keepDir',
    message: 'Keep folders',
    default: true
  }
]).then(answers => {
  converter(answers)
})
