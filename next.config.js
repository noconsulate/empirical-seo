//require('dotenv').config()

module.exports = {

  env: {
    DOMAIN: process.env.NODE_ENV == 'development' ?
      'http://localhost:3000' :
      'https://empirical-seo.noconsulate.now.sh',
    ENV_TEST: process.env.ENV_TEST,
    API_KEY: process.env.API_KEY

  }
};  
