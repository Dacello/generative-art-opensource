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
You can run it by passing config one of two ways:
1. Pass a stringified JSON argument ot the script, e.g.
  ```
  npm run build '{"attributes":[{"name":"race","type":"human"},{"name":"class","type":"fighter"},{"name":"face","type":"angry"},{"name":"hair","type":"black"},{"name":"weapon","type":"longsword"}],"name":"Dacello"}'
  ```
  - *NOTE: `$CONFIG_JSON` should be a stringified JSON object that follows the structure outlined in the configuration section*
2. Add and export a valid config in `./config/index.js` which will be pulled in if no arguments are passed
