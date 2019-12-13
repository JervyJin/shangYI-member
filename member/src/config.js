export default {
  //接口基础地址
  // api_base: process.env.NODE_ENV === 'development' ? 'http://test.userapi.afarsoft.com' : '/_gataway',
  api_base: process.env.NODE_ENV === 'development' ? 'http://hmspapi.afarsoft.com/' : '/_gataway',
  wechatopen:'http://afopen.afarsoft.com',
  wechat_js_apis:'updateAppMessageShareData,updateTimelineShareData,chooseWXPay,scanQRCode'
  //api_base: process.env.NODE_ENV === 'development' ? 'http://test.userapi.afarsoft.com' : 'http://192.168.0.253:8087',
  //api_base:  'http://192.168.0.253:8087',
//  微信授权地址
  //wx_base: 'http://test.member.afarsoft.com'
}
