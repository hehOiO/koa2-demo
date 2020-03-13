const util = {
    GMTToStr(time){
        time = time * 1000;
        let date = new Date(time)
        if(date == 'Invalid Date'){
          return time;
        }
        let year = date.getFullYear();
        let month = (date.getMonth() + 1)<10?0 + '' + (date.getMonth() + 1):date.getMonth()+1;
        let day = date.getDate()<10?0 + '' + date.getDate():date.getDate();
        let hour = date.getHours()<10?0 + '' + date.getHours():date.getHours();
        let minutes = date.getMinutes()<10?0 + '' + date.getMinutes():date.getMinutes();
        let seconds =   date.getSeconds()<10?0 + '' + date.getSeconds():date.getSeconds();
        let Str= year + '-' + month + '-' + day
         + ' ' + hour + ":" + minutes
         + ':' + seconds;
        return Str
      }
}

module.exports = util;