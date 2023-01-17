const sql = require('mssql');
const { config } = require('./config');

const connPool = new sql.ConnectionPool(config.dbconfig)
    .connect()
    .then((pool) => {
        console.log('연결성공');
        return pool;
    })
    .catch((err) => {
        console.log('err ', err);
    })

module.exports = {
    sql,
    connPool
}