const express = require('express');
const { connPool } = require('../sql_server/server');
const {LOGIN_SHEET} = require('../common/var');

const router = express.Router();

router.post('/', async (req, res) => {
    const userId = req.body.data.id;
    const userPw = req.body.data.password;
    const query = `select userId, userPwd from ${LOGIN_SHEET} where userId = '${userId}'`
    const pool = await connPool;
    const result = await pool.request().query(query);
    let isUser = result.recordset.some(e => e.userPwd === userPw);

    if (isUser) {
        req.session.user = {
            id: userId,
            pw: userPw,
            name: userId,
            authorized: true,
        };
        res.json('success');
    } else {
        res.json('등록되지 않은 유저 입니다.');
    }
})

module.exports = router;