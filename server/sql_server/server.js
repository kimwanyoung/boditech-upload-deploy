const sql = require('mssql');
const { config } = require('./config');

const connPool = new sql.ConnectionPool(config.dbconfig)
    .connect()
    .then((pool) => {
        return pool;
    })
    .catch((err) => {
        console.error('err ', err);
    })

module.exports = {
    sql,
    connPool
}