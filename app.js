const Koa = require("koa");
var Router = require("koa-router");
var app = new Koa();
var router = new Router();
var cors = require('koa2-cors');
var bodyParser = require('koa-bodyparser');
var selectInfo = require('./controller/login');
var Goods = require('./controller/goods');
app.use(bodyParser()).use(cors()).use(router.routes()).use(router.allowedMethods());

router.get("/", (ctx, next)=>{
    ctx.response.body = {status:200,msg:'这是post测试的返回数据',data: {value:'666'}};
});
router.post("/login", async (ctx, next)=>{
    let postData = ctx.request.body;
    let info = await selectInfo(postData);
    if(info != ''){
        ctx.response.body = {code:200,msg:'登录成功',data: {
            username:info.username,
            nickname:info.nickname,
            phone:info.phone,
        }};
    }else{
        ctx.response.body = {code:404,msg:'账号密码错误'};
    }
});
router.get("/goods/list", async (ctx, next)=>{
    let getData  = ctx.request.query;
    let mygoods = new Goods(getData);
    let requestInfo = await mygoods.list(); 
    ctx.response.body = {code:200,msg:'OK',data:requestInfo};
});
router.get("/goods/type/list", async (ctx, next)=>{
    let getData  = ctx.request.query;
    let mygoods = new Goods(getData);
    let requestInfo = await mygoods.type(); 
    ctx.response.body = {code:200,msg:'ok',data:requestInfo};
});
router.get("/goods/brand/list", async (ctx, next)=>{
    let getData  = ctx.request.query;
    let mygoods = new Goods(getData);
    let requestInfo = await mygoods.brand(); 
    ctx.response.body = {code:200,msg:'ok',data:requestInfo};
});
router.get("/goods/model/list", async (ctx, next)=>{
    let getData  = ctx.request.query;
    let mygoods = new Goods(getData);
    let requestInfo = await mygoods.model(); 
    ctx.response.body = {code:200,msg:'ok',data:requestInfo};
});
router.get("/goods/detail", async (ctx, next)=>{
    let getData  = ctx.request.query;
    let mygoods = new Goods(getData);
    let requestInfo = await mygoods.detail(); 
    if(requestInfo != ''){
        ctx.response.body = {code:200,msg:'ok',data:requestInfo};
    }else{
        ctx.response.body = {code:404,msg:'信息不存在'};
    }

});
router.post("/goods/insert", async (ctx, next)=>{
    let postData = ctx.request.body;
    let mygoods = new Goods(postData);
    let requestInfo = await mygoods.insert(); 
    if(requestInfo != ''){
        ctx.response.body = {code:200,msg:'ok'};
    }else{
        ctx.response.body = {code:404,msg:'失败'};
    }

});
router.delete("/goods/delete", async (ctx, next)=>{
    let getData  = ctx.request.query;
    let mygoods = new Goods(getData);
    let requestInfo = await mygoods.delete(); 
    if(requestInfo != ''){
        ctx.response.body = {code:200,msg:'ok'};
    }else{
        ctx.response.body = {code:404,msg:'失败'};
    }

});
app.listen(4300);