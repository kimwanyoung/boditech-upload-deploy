const express = require('express');
const { connPool } = require('../sql_server/server');
const {LOGIN_SHEET} = require('../common/var');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = `
    if (exists (select agency from ${LOGIN_SHEET} where userId = '${req.query.userId}'))
    begin
    select agency from ${LOGIN_SHEET} where userId = '${req.query.userId}'
    end
  `

  const pool = await connPool;
  const result = await pool.request().query(query);
  res.json({data: result.recordset[0].agency});
  
})

module.exports = router;