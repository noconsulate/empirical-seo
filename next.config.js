
if (process.env.NODE_ENV == 'development') {
  console.log('development')
  module.exports = {
    env: {
      domain: 'http://localhost:3000'
    }
  };  
} else {
  console.log('production')
  module.exports = {
    env: {
      domain: 'https://empirical-seo.noconsulate.now.sh'
    }
  };
  
}