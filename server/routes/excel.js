const express = require('express');
const { connPool } = require('../sql_server/server');
const {SHEET_NAME, GET_SHEET_NAME} = require('../common/var');

const router = express.Router();

router.get('/', async(req, res) =>{
  const query = `
        select 
          UpdateDate, userName, agency, catalog, cat_no, unit, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec 
        from 
          ${SHEET_NAME}
        where 
          agency='${req.query.agency}' 
        order by 
          UpdateDate desc
    `;
    const pool = await connPool;
    const result = await pool.request().query(query);
    res.json([{data: result}]);
})

router.post('/', async (req, res) => {
  const newArr = req.body.data.form;

  for (let i = 0; i < newArr.length; i++) {
      let cat_no = newArr[i][4];
      let agency = newArr[i][2];
      let UpdateDate = newArr[i][0];
      const param = newArr[i];
      const value = param.map(prop => "'" + prop + "'");
      value.push('getDate()');
      const convertValue = value.map(prop => {
        if(isNaN(Number(prop))){
          return prop;
        }else {
          return Number(prop);
        }
      });
      
      const query = `
      if(exists( select userName from ${SHEET_NAME} where (cat_no = '${cat_no}' and agency = '${agency}' and UpdateDate = '${UpdateDate}')))
      begin
      delete ${SHEET_NAME} where (cat_no = '${cat_no}' and agency = '${agency}' and UpdateDate = '${UpdateDate}')
      insert into ${SHEET_NAME}
      (UpdateDate, userName, agency, catalog, cat_no, unit, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, InsertDate)
      values(${convertValue})
      end
      else if (exists( select userName from ${SHEET_NAME} where (cat_no = '${cat_no}' and agency = '${agency}')))
      begin
      insert into ${SHEET_NAME}
      (UpdateDate, userName, agency, catalog, cat_no, unit, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, InsertDate)
      values(${convertValue})
      end
      else if (not exists ( select userName from ${SHEET_NAME} where (cat_no = '${cat_no}' and agency = '${agency}')))
      begin
      insert into ${SHEET_NAME}
      (UpdateDate, userName, agency, catalog, cat_no, unit, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, InsertDate)
      values(${convertValue})
      end
      `;
      const pool = await connPool;
      const result = await pool.request().query(query);
  }
  res.json([{ data: '데이터 업로드 성공!' }]);
})

module.exports = router;