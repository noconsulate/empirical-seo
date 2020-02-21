require('dotenv').config()
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
  module.exports = {
  env: {
    PROD_URL: process.env.DEV_URL
  }
}
} else {
  module.exports = {
    env: {
      PROD_URL: process.env.PROD_URL
    }
}
}
