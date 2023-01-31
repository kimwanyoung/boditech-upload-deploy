const express = require('express');
const { connPool } = require('../sql_server/server');
const {LOGIN_SHEET} = require('../common/var');

const router = express.Router();

router.get('/', async(req, res) =>{
  const query = `
        select agency from ${LOGIN_SHEET} order by agency desc
    `;
    const pool = await connPool;
    const result = await pool.request().query(query);
    res.json([{data: result}]);
})

module.exports = router;