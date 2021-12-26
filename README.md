# Dynamic Layered Image Generator

This is based on code created by [**HashLips Art engine**](https://github.com/HashLips/hashlips_art_engine)

# Project Setup
- install `node.js` on your local system (https://nodejs.org/en/)
- run `npm install` to install dependencies

# How to use

## Configuration
1. See `./config/index.js`
2. Update the exported `config` variable with the attributes want for the image you wish to generate

NOTE: Attribute names and values must match up with the image filenames that exist in `./config/attributes`, i.e. `{race: 'human'}` maps to `./config/attributes/race/human.png`


## Run the code
1. Run `node index.js`
2. Open the `./output` folder to find your generated images to use as NFTs, as well as the metadata to use for NFT marketplaces.
