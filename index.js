const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const dir = __dirname;
const console = require('console');
const {X, Y, WIDTH, HEIGHT} = require('./config')
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

const saveImage = (filename) => {
  fs.writeFileSync(
    `./output/${filename}`,
    canvas.toBuffer('image/png')
  );
};

const loadAttributeLayerImages = ({name, type}) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${dir}/config/attributes/${name}/${type}.png`);

    resolve(image);
  });
}

const generateImage = async (config) => {
  try {
    const attributeLayers = config.attributes.map(loadAttributeLayerImages);
    const loadedAttributeLayers = await Promise.all(attributeLayers)

    ctx.clearRect(X, Y, WIDTH, HEIGHT);
    
    loadedAttributeLayers.forEach((img) => {
      ctx.drawImage(img, X, Y, WIDTH, HEIGHT);
    });

    saveImage(`${config.name}.png`);

    console.log('\n Image generated based on the following config:\n', config);
  } catch(e) {
    console.error("ERROR", e);
  }
};

function run() {
  try {
    const config = JSON.parse(process.argv[2]);
    generateImage(config);
  } catch(e) {
    console.error('\n You have provided an invalid character config! Aborting.');
  }  
}

run();
