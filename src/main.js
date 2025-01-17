const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')
const console = require('console')
const {BASE_URI, X, Y, WIDTH, HEIGHT} = require('../constants')

const basePath = process.cwd()
const buildDir = `${basePath}/build`
const layersDir = `${basePath}/layers`

const canvas = createCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d')

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, {recursive: true})
  }
  fs.mkdirSync(buildDir)
  fs.mkdirSync(`${buildDir}/json`)
  fs.mkdirSync(`${buildDir}/images`)
}

const writeImage = (filename) => {
  fs.writeFileSync(
    `${buildDir}/images/${filename}`,
    canvas.toBuffer('image/png')
  )
}

const writeMetadata = (data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, JSON.stringify(data))
}

const getMetadata = (config) => {
  return {
    date: Date.now(),
    image: `${BASE_URI}/${config.name}.png`,
    ...config
  }
}

const getLayerImagePath = ({name, type}) => {
  return `${layersDir}/${name}/${type}.png`
}

const loadLayerImages = (layer) => {
  return new Promise(async (resolve) => {
    const imagePath = getLayerImagePath(layer)
    const image = await loadImage(imagePath)

    resolve(image)
  })
}

const generateImage = async (config) => {
  try {
    const loadedLayers = await Promise.all(config.attributes.map(loadLayerImages))

    ctx.clearRect(X, Y, WIDTH, HEIGHT)
    
    loadedLayers.forEach((img) => ctx.drawImage(img, X, Y, WIDTH, HEIGHT))

    writeImage(`${config.name}.png`)

    console.log('\nImage generated based on the following config:\n', config)
  } catch(e) {
    console.error("ERROR", e)
  }
}

/* Used to run thi*/
function run(config) {
  const metadata = getMetadata(config)

  writeMetadata(metadata)
  generateImage(config)
}


module.exports = {buildSetup, run}
