if (process.env.NODE_ENV === 'production') {
  // production mode라면 production 파일에서 가져오게
  module.exports = require('./production')
} else {
  module.exports = require('./dev')
}
