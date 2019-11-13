const { existsSync, readdir, mkdirSync } = require('fs')
const { promisify } = require('util')
const { remove } = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const inquirer = require('inquirer')
const readDirAsync = promisify(readdir)

const outpuDir = (output, keepDir) => {
  try {
    if (!keepDir) {
      remove('./output')
        .then(() => {
          mkdirSync(output, { recursive: true })
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      mkdirSync(output, { recursive: true })
    }
  } catch (err) {
    console.error(err)
  }
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
const converter = async (args) => {
  try {
    const { points, input, format, height, keepDir } = args

    const outputFormat = format
    const outputHeight = height
    const breakpointsArgs = Number.isInteger(points) === true ? Array.of(points) : points.split(',')

    console.log(path.resolve())

    const outputDir = path.resolve(`./output/${input}`)
    const sourceDir = path.resolve(`./sources/${input}`)

    // checking if the folder is in sources
    if (!existsSync(sourceDir)) {
      console.log(`The specified folder does not exist - ${sourceDir}`)
      return false
    }

    // remove output folder and create new one
    outpuDir(outputDir, keepDir)

    // get async files
    const res = await readDirAsync(sourceDir)

    breakpointsArgs.forEach(breakpointsFolder => {
      // remove output folder and create new one
      outpuDir(`${outputDir}/${breakpointsFolder}`, keepDir)

      res.forEach(async (image) => {
        // file extension replace
        const newImage = image.replace(/\.[^\\.]+$/, `.${outputFormat}`)

        const imageSharp = await sharp(`${sourceDir}/${image}`)
        imageSharp.resize({
          // set width from command line or get default with 1200px
          width: parseInt(breakpointsFolder),
          // default max height is 800px
          // if you set height then width i change also
          height: outputHeight,
          // maintain aspect ratio
          fit: sharp.fit.inside,
          // do not enlarge if the width or height are already less than the specified dimensions
          withoutEnlargement: true

        })
        // set type image [jpg, png, webp]
        setImageType(imageSharp, outputFormat)
        // save to specific folder - breakpoints
        imageSharp.toFile(`${outputDir}/${breakpointsFolder}/${newImage}`)
      })
    })
  } catch (err) {
    // return Object.assign(err)
    console.log(err.message)
  }
}

// converter()

inquirer.prompt([
  {
    type: 'input',
    name: 'points',
    message: 'Select breakpoints e.g. 576,768,992,1200',
    default: '576'
  },
  {
    type: 'input',
    name: 'input',
    message: 'Folder to convert',
    validate: input => {
      if (!input.length) {
        return 'Enter the folder to convert'
      }
      return true
    }
  },
  {
    type: 'list',
    name: 'format',
    choices: [
      { value: 'jpg' },
      { value: 'png' },
      { value: 'webp' }
    ],
    message: 'Select a format',
    default: ['jpg']
  },
  {
    type: 'input',
    name: 'height',
    message: 'Maximum photo height',
    default: 800
  },
  {
    type: 'confirm',
    name: 'keepDir',
    message: 'keep folders',
    default: true
  }
]).then(answers => {
  converter(answers)
})
