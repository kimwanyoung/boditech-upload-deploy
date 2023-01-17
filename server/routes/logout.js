const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('logout');
  if (req.session.user) {
      req.session.destroy(err => {
          if (err) {
              console.log('세션 삭제 중 에러 발생');
              return;
          }
          console.log('로그아웃 완료.');
          res.json([{ data: '로그아웃 완료' }]);
      })
  }else {
    res.json('유저 정보가 없습니다.');
  }
})

module.exports = router;