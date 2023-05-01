const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

const mongoose = require('mongoose')
const { User } = require('./models/User')
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('connected'))
  .catch((err) => console.error(err))

app.use(
  cors({
    origin: '*',
  })
)
// mongodb+srv://rudxor567:<password>@inflearn-node.clxbwr0.mongodb.net/?retryWrites=true&w=majority
app.get('/user/:id', (req, res) => {
  const param = req.param
  const query = req.query
  console.log(query)
  res.send('Hello World!')
})

app.post('/api/user/register', async (req, res) => {
  const user = new User(req.body)
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        user: user,
      })
      console.log(user)
    })
    .catch((err) => {
      console.error(err)
      res.json({
        success: false,
        err,
      })
    })
})

app.post('/api/user/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }).then((user) => {
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호를 확인 해주세요',
        })
      }
      // 다 맞다면 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        // 토큰을 쿠키에 저장
        res.cookie('auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user.token,
        })
      })
    })
  })
})

app.post('/api/user/auth', auth, (req, res) => {
  // 미들웨어 통과했을 때 로직 (인증 성공 했다는 것)
  res.status(200).json({
    isAuth: true,
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    name: req.user.name,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
