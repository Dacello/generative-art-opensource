const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const dir = __dirname;
const {
  width,
  height,
  config,
} = require("./config");
const console = require("console");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

const saveImage = (filename) => {
  fs.writeFileSync(
    `./output/${filename}`,
    canvas.toBuffer('image/png')
  );
};

const writeMetaData = (_data) => {
  fs.writeFileSync('./output/_metadata.json', _data);
};

const loadAttributeImages = ({name, type}) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${dir}/config/attributes/${name}/${type}.png`)
    resolve(image);
  });
}

const startCreating = async ({attributes} = config) => {
  try {
    writeMetaData('');

    const attributeImages = attributes.map(loadAttributeImages);
  
    const loadedAttributeImages = await Promise.all(attributeImages)
    ctx.clearRect(0, 0, width, height);
    
    loadedAttributeImages.forEach((img) => {
      ctx.drawImage(img, 0, 0, width, height);
    });
    
    const metadata = {
      filename: `${config.name}.png`,
      date: Date.now(),
      ...config
    };
  
    saveImage(metadata.filename);

    writeMetaData(JSON.stringify(metadata));

    console.log("Image generated based on config", config)
  } catch(e) {
    console.error("ERROR", e)
  }
};

// Initiate code
startCreating();
