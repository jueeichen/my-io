//mysqlConfig.js
var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
   findUserData: function (name) {
        let _sql = `select * from users where name="${name}";`
        return allServices.query(_sql)
    },
    findAllUser:function(){
        let _sql = `select * from users `
        return allServices.query(_sql)
    },
    addUserData: ({name,pass,auth}) => {
         let _sql = `insert into users set name="${name}",pass="${pass}",auth="${auth}";`
         return allServices.query(_sql)
     },
}

module.exports = allServices;

