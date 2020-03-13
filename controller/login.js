var connection = require('../database');

function selectInfo(postData){
    return new Promise((reject,resolve)=>{
        connection.query('SELECT * FROM user where `username`='+postData.username + ' and `password`='+postData.password, function (error, results, fields) {
            if (error) throw error;
            let userinfo = results[0];
            if(userinfo !== '' && userinfo != undefined){
                reject(userinfo);
            }else{
                reject('')
            }
        })
    })
}

module.exports = selectInfo;