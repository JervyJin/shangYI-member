import http from './http'
import config from './config'
export default {
  config:function(vue,callback){
    if(!globalVerb.BindMpAppId){
       http.get('/api/services/app/Setting/GetSetting').then(res => {
        if(res.Result.Code === 0) {
          globalVerb=res.Result.Data;
          if(globalVerb.BindMpAppId){
            http.get(config.wechatopen+"/JSApi/Config",{params:{
              appid:globalVerb.BindMpAppId,
              jsapilist:config.wechat_js_apis,
              url:(window.location.protocol+"//"+window.location.host)+vue.$route.fullPath
            }}).then(res => {
              wx.config(res);
              if(callback)
                callback();
            })
          }
        }
      })
    }else{
      http.get(config.wechatopen+"/JSApi/Config",{params:{
        appid:globalVerb.BindMpAppId,
        jsapilist:config.wechat_js_apis,
        url:(window.location.protocol+"//"+window.location.host)+vue.$route.fullPath
      }}).then(res => {
        wx.config(res);
        if(callback)
          callback();
      })
    }
  }
}
