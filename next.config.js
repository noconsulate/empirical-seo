
if (process.env.NODE_ENV == 'development') {
  console.log('development')
  module.exports = {
    env: {
      prodUrl: 'http://localhost:3000'
    }
  };  
} else {
  console.log('production')
  module.exports = {
    env: {
      prodUrl: 'https://empirical-seo.noconsulate.now.sh'
    }
  };
  
}