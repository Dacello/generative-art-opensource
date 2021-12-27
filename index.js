const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')
const console = require('console')
const {baseUri, X, Y, WIDTH, HEIGHT} = require('./config')
const canvas = createCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d')
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;


const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
};

const writeMetaData = (data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, JSON.stringify(data));
};

const saveImage = (filename) => {
  fs.writeFileSync(
    `${buildDir}/images/${filename}`,
    canvas.toBuffer('image/png')
  )
}

const getMetadata = (config) => {
  return {
    date: Date.now(),
    image: `${baseUri}/${config.name}.png`,
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

    saveImage(`${config.name}.png`)
    writeMetaData(getMetadata(config))

    console.log('\nImage generated based on the following config:\n', config)
  } catch(e) {
    console.error("ERROR", e)
  }
}

function run() {
  buildSetup()

  try {
    const config = JSON.parse(process.argv[2])
    generateImage(config)
  } catch(e) {
    console.error('\n You have provided an invalid character config! Aborting.')
  }  
}

run()
