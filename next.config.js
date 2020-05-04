require('dotenv').config()

module.exports = {

  env: {
    DOMAIN: process.env.NODE_ENV == 'development' ?
      'http://localhost:3000' :
      'https://empirical-seo.noconsulate.now.sh',
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID
  }
};  
