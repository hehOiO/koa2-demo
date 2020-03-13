var connection = require('../database');
var util = require('../common');

class Goods {

    constructor(params){
        this.params = params
    }
    delete(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let postData = this.params;
            if(postData.id !='' && postData.id != undefined){
                let deleteSql = "DELETE FROM goods WHERE id="+postData.id;
                let detailData = "DELETE FROM goods_detail WHERE goods_id="+postData.id;
                connection.query(deleteSql, function (error, results, fields) {
                    if(results !== '' && results != undefined){
                        connection.query(detailData, function (err, res, f) {
                            if(res !== '' && res != undefined){
                                reject('成功')
                            }else{
                                reject('')
                            }
                        })
                    }else{
                        reject('')
                    }
                })
            }else{
                reject('')
            }
        })
    }
    insert(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let postData = this.params;
            let nowDate = new Date();
            nowDate = parseInt(nowDate.valueOf()/100);
            let baseData = {
                goods_name:postData.goods_name?postData.goods_name:'',
                spec:postData.spec?postData.spec:'',
                price:postData.price?postData.price:0,
                stock:postData.stock?postData.stock:0,
                sales_volume:postData.sales_volume?postData.sales_volume:0,
                is_disable:postData.is_disable,
                create_time:nowDate
            }
            let detailData = {
                goods_id:"",
                buy_price:postData.buy_price?postData.buy_price:'',
                type_id:postData.type_id?postData.type_id:'',
                brand_id:postData.brand_id?postData.brand_id:'',
                model_id:postData.model_id?postData.model_id:'',
                address:postData.address?postData.address:'',
                create_time:nowDate,
            }
            if(postData.id !='' && postData.id != undefined){
                let updataSql = "UPDATE goods SET"
                +" goods_name="+"'"+baseData.goods_name+"'"
                +",spec="+"'"+baseData.spec+"'"
                +",price="+baseData.price
                +",stock="+baseData.stock
                +",sales_volume="+baseData.sales_volume
                +",is_disable="+baseData.is_disable
                +" WHERE id="+postData.id+";";
                let updataDetailSql = "UPDATE goods_detail SET"
                +" buy_price="+"'"+0+"'"
                +",type_id="+detailData.type_id
                +",brand_id="+detailData.brand_id
                +",model_id="+detailData.model_id
                +",address="+"'"+detailData.address+"'"
                +" WHERE goods_id="+postData.id+";";
    
                connection.query(updataSql, function (error, results, fields) {
                    if(results !== '' && results != undefined){
                        connection.query(updataDetailSql, function (err, res, f) {
                            if(res !== '' && res != undefined){
                                reject('成功')
                            }else{
                                reject('')
                            }
                        })
                    }else{
                        reject('')
                    }
                })
            }else{
                let insertSql = "INSERT INTO goods "+
                "(goods_name,spec, price,stock,sales_volume,is_disable,create_time) "+
                "VALUES "+
                "("+"'"+baseData.goods_name+"'"+','+"'"+baseData.spec+"'"+','+baseData.price+','+baseData.stock+','+baseData.sales_volume+','+baseData.is_disable+','+"'"+baseData.create_time+"'"+")";
    
                let findSql = 'SELECT LAST_INSERT_ID() as goods_id';
                connection.query(insertSql+';'+findSql, function (error, results, fields) {
                    if(results !== '' && results != undefined){
                        if(results[1]){
                            detailData.goods_id = results[1][0].goods_id;
                            let insertDetailSql = "INSERT INTO goods_detail "+
                            "(goods_id,buy_price, type_id,brand_id,model_id,address,create_time) "+
                            "VALUES "+
                            "("+detailData.goods_id+','+detailData.buy_price+','+detailData.type_id+','+detailData.brand_id+','+detailData.model_id+','+"'"+detailData.address+"'"+','+"'"+detailData.create_time+"'"+")";
                            connection.query(insertDetailSql, function (err, res, f) {
                                if(res !== '' && res != undefined){
                                    reject('成功');
                                }else{
                                    reject('')  
                                }
                            })
                        }else{
                            reject('') 
                        }
                        
                    }else{
                        reject('')
                    }
                })
            }

        })  
    }
    detail(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let { id } = that.params;
            if(id == undefined || id == ''){
                reject('');
            }
            let findSql = "SELECT a.*,b.buy_price,b.type_id,b.brand_id,b.model_id,b.address FROM goods a left JOIN goods_detail b ON a.id = b.goods_id where a.id ="+id;
            connection.query(findSql, function (error, results, fields) {
                if(results !== '' && results != undefined){
                    reject(results[0]);
                }else{
                    reject('')
                }
            })
        })
    }
    type(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let findSql = "SELECT * FROM goods_type";
            connection.query(findSql, function (error, results, fields) {
                if(results !== '' && results != undefined){
                    reject(results);
                }else{
                    reject('')
                }
            })
        })
    }
    brand(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let { type_id } = this.params;
            let findSql = "SELECT * FROM goods_brand";
            let whereSql;
            if(type_id !='' && type_id != undefined){
                whereSql = ' where type_id ='+type_id;
            }else{
                whereSql = '';
            }
            connection.query(findSql+whereSql, function (error, results, fields) {
                if(results !== '' && results != undefined){
                    reject(results);
                }else{
                    reject('')
                }
            })
        })
    }   
    model(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let { brand_id } = this.params;
            let findSql = "SELECT * FROM goods_model";
            let whereSql;
            if(brand_id !='' && brand_id != undefined){
                whereSql = ' where brand_id ='+brand_id;
            }else{
                whereSql = '';
            }
            connection.query(findSql+whereSql, function (error, results, fields) {
                if(results !== '' && results != undefined){
                    reject(results);
                }else{
                    reject('')
                }
            })
        })
    }
    list(){
        const that = this;
        return new Promise((reject,resolve)=>{
            let { page,page_size,key_word } = that.params;
            let whereSql = '';
            if(key_word !='' && key_word != undefined){
                whereSql = ' where goods_name like '+"'%"+key_word+"%'";
            }else{
                whereSql = '';
            }
            let findGoodsListMysql = 'SELECT * FROM goods'+ whereSql +' limit '+Number(page)*page_size+','+(Number(page)+1)*page_size;
            let findGoodsCountMysql = 'SELECT count(id) as num FROM goods';
            connection.query(findGoodsListMysql+';'+findGoodsCountMysql, function (error, results, fields) {
                if (error) throw error;
                if(results !== '' && results != undefined){
                    let reponse ={
                        goods_list:[],
                        total:0
                    }
                    if(results[0] !== '' && results[0] != undefined){
                        reponse.goods_list = results[0];  
                        reponse.goods_list.map((value,index)=>{
                            value.create_time = util.GMTToStr(value.create_time);
                            return value;
                        })  
                    }else{
                        reponse.goods_list = [];
                    }
                    if(results[1] !== '' && results[1] != undefined){
                        reponse.total = results[1][0].num;    
                    }else{
                        reponse.total = 0;
                    }
                    reject(reponse);
                }else{
                    reject('')
                }
            })
        })
    }
}
module.exports  = Goods;