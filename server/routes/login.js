const express = require('express');
const { connPool } = require('../sql_server/server');

const router = express.Router();

router.post('/', async (req, res) => {
    const userId = req.body.data.id;
    const userPw = req.body.data.password;
    const query = `select id from userInfo where id = '${userId}'`
    const pool = await connPool;
    const result = await pool.request().query(query);
    let isUser = result.recordset.some(e => e.id = userId);

    if (isUser) {
        req.session.user = {
            id: userId,
            pw: userPw,
            name: userId,
            authorized: true,
        };
        console.log('log in success');
        res.json('success');
    } else {
        console.log('false');
        res.json('등록되지 않은 유저 입니다.');
    }
})

module.exports = router;