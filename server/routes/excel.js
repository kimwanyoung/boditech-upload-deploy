const express = require('express');
const { connPool } = require('../sql_server/server');

const router = express.Router();

router.get('/', async(req, res) =>{
  const query = `
        select userName, agency, catalog, cat_no, unit, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec from testSheet5 order by userName
    `;
    const pool = await connPool;
    const result = await pool.request().query(query);
    res.json([{data: result}]);
})

router.post('/', async (req, res) => {
  const newArr = req.body.data.form;
   const prevQuery = `
          if (exists ( select userName from testSheet5))
          begin
          drop table testSheet5
          create table testSheet5 (
              userName varchar(10) not null,
              agency varchar(20) primary key not null,
              catalog varchar(20) not null,
              cat_no varchar(10) not null,
              unit varchar(20) not null,
              Jan varchar(10),
              Feb varchar(10),
              Mar varchar(10),
              Apr varchar(10),
              May varchar(10),
              Jun varchar(10),
              Jul varchar(10),
              Aug varchar(10),
              Sep varchar(10),
              Oct varchar(10),
              Nov varchar(10),
              Dec varchar(10),
              UpdateDate date
          )
          end        
      `
      const prevPool = await connPool;
      const prevResult = await prevPool.request().query(prevQuery);

  for (let i = 0; i < newArr.length; i++) {
      const param = newArr[i];
      const value = param.map(prop => "'" + prop + "'");
      value.push('getDate()');

      const query = `
      insert into testSheet5
      (userName, agency, catalog, cat_no, unit, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, UpdateDate)
      values(${value})`;
      const pool = await connPool;
      const result = await pool.request().query(query);
  }
  console.log('success');
  res.json([{ data: '데이터 업로드 성공!' }]);
})

module.exports = router;