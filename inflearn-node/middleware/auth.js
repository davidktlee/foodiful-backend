const { User } = require('../models/User')

let auth = (req, res, next) => {
  // 인증 처리 하는 곳
  // 클라이언트 쿠키에서 토큰 가져옴
  let token = req.cookies.auth

  // 토큰 복호화 한 후 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      })
    // 아래의 req 프로퍼티를 넣어줌으로써 auth 의 상위 함수인 post 에서 req 를 뽑아와서 쓸 수 있다
    req.token = token
    req.user = user
    // post 에서 다음 콜백 함수로 넘어갈 수 있게 next 함수 호출
    next()
  })
  // 유저있다면 ok 없다면 no
}
module.exports = { auth }
