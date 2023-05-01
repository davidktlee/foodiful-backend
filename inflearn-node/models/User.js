const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// 몇 자리로 암호화 비밀번호 설정할건지
const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 3,
  },
  lastname: {
    type: String,
    maxlength: 20,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

userSchema.pre('save', function (next) {
  // this로 user정보 가져오기
  var user = this

  // user의 비밀번호를 수정할 때만 실행되게
  if (user && user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else next()
})

// db의 비밀번호와 입력한 비밀번호가 같은지 확인하는 메서드 생성
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cb) {
  var user = this
  // jsonWebtoken 이용해서 token 생성
  var token = jwt.sign(user._id.toHexString(), 'secret') // jwt.sign(userId, secretKey)
  user.token = token
  user
    .save()
    .then((user) => {
      cb(null, user)
    })
    .catch((err) => {
      if (err) return cb(err)
    })
}

userSchema.statics.findByToken = function (token, cb) {
  var user = this

  jwt.verify(token, 'secret', function (err, decoded) {
    // 디코드된 userId를 이용해 user 찾기
    // db의 토큰과 클라이언트 토큰과 비교
    user
      .findOne({ _id: decoded, token: token })
      .then((user) => cb(null, user))
      .catch((err) => cb(err))
  })
}

const User = mongoose.model('User', userSchema)

module.exports = {
  User,
}
