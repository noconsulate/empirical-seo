
if (process.env.NODE_ENV == 'development') {
  module.exports = {
    env: {
      prodUrl: 'https://empirical-seo.noconsulate.now.sh'
    }
  };  
} else {
  module.exports = {
    env: {
      prodUrl: 'https://localhost:3000'
    }
  };
  
}