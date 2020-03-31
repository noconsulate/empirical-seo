
  module.exports = {
    env: {
      domain: process.env.NODE_ENV == 'development' ?
      'http://localhost:3000' :
      'https://empirical-seo.noconsulate.now.sh'
    }
  };  
