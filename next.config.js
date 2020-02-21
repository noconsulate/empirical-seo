require('dotenv').config()
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
