# Dynamic Layered Image Generator

This is based on code created by [**HashLips Art Engine**](https://github.com/HashLips/hashlips_art_engine)

# Project Setup
- install `node.js` on your local system (https://nodejs.org/en/)
- run `npm install` to install dependencies

# How to use

## Configuration
- See `./config/example.js` for an example of what configuration to pass to the script
- The config object requires two properties, `name`, and `attributes`
  - `name` - the character name which will be used to generate the image filename
  - `attributes` - an array with each attribute being an object containing `name` and `type`
    - Each attribute `name` and `type` must match up with the image filenames that exist in `./config/attributes`, e.g. `{race: 'human'}` maps to `./config/attributes/race/human.png`

## Run the code
1. Run `node index.js $CONFIG_JSON`
  - `$CONFIG_JSON` should be a stringified JSON object that follows the structure outlined above 
