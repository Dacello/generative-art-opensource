const basePath = process.cwd()
const {run, buildSetup} = require(`${basePath}/src/main.js`)
const {INVALID_CONFIG_ERROR} = require(`${basePath}/constants/errors`)

const validateConfig = (config) => {
  try {
    let valid = true, i = 0
    
    while (valid && i < config.attributes.length) {
      const {name, type} = config.attributes[i]
      valid = typeof name === 'string'  && typeof type === 'string'
      i++
    }

    return valid
  } catch(e) {
    console.error(e)

    return false
  }
}

const getConfig = () => {
  if (process.argv[2]) {
    return JSON.parse(process.argv[2])
  }

  return require(`${basePath}/config`)
}


(() => {
  const config = getConfig()

  if (!validateConfig(config)) {
    return console.error(INVALID_CONFIG_ERROR)
  }

  buildSetup(config)
  run(config)
})()
