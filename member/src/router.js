import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken, getQueryString } from './util/token'
import http from "./http";
import config from './config'

Vue.use(Router)

let router = new Router({
  // redirect重定向
  // meta 可以在页面中用$route.meta来获取里面的数据,
  mode: 'history',
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './components/login/login'),
      meta: {
        requiresAuth: false
      }
    },

    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () =>
    //     import(/* webpackChunkName: "register" */ './components/register/register'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/index'),
      meta: {
        requiresAuth: false
      }
    },
    // 推荐
    {
      path: '/tuijian',
      name: 'tuijian',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/tuijian/tuijian.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 邀请赢好礼
    {
      path: '/yaoqingLi',
      name: 'yaoqingLi',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/yaoqingLi/yaoqingLi.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/teasing',
      name: 'teasing',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/teasing/teasing'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/myTeasing',
      name: 'myTeasing',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/teasing/myTeasing'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/teasingDetail',
      name: 'teasingDetail',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/teasing/teasingDetail'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/consumption/detail'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/Record',
      name: 'Record',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/consumption/Record'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/pingjia',
      name: 'pingjia',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/consumption/pingjia'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/zuiping',
      name: 'zuiping',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/consumption/zuiping'),
      meta: {
        requiresAuth: false
      }
    },
    //个人中心
    {
      path: '/persion',
      name: 'persion',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/persion'),
      meta: {
        requiresAuth: false
      }
    },
    //会员信息
    {
      path: '/huiyuanxinxi',
      name: 'huiyuanxinxi',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/huiyuanxinxi/huiyuanxinxi'),
      meta: {
        requiresAuth: false
      }
    },

    //会员权益
    {
      path: '/quanyi',
      name: 'quanyi',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/huiyuanxinxi/quanyi'),
      meta: {
        requiresAuth: false
      }
    },
    //会员注册
    {
      path: '/zuche',
      name: 'zuche',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/huiyuanxinxi/zuche'),
      meta: {
        requiresAuth: false
      }
    },
    //我的套餐
    {
      path: '/mytaocan',
      name: 'mytaocan',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/mytaocan'),
      meta: {
        requiresAuth: false
      }
    },
    //我的套餐详情
    {
      path: '/tcDetail',
      name: 'tcDetail',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/tcDetail'),
      meta: {
        requiresAuth: false
      }
    },
    //我的套餐详情
    {
      path: '/TaocanShop',
      name: 'TaocanShop',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/TaocanShop'),
      meta: {
        requiresAuth: false
      }
    },
     //历史套餐
     {
      path: '/lisiTaocan',
      name: 'lisiTaocan',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/lisiTaocan'),
      meta: {
        requiresAuth: false
      }
    },
    //历史套餐记录
    {
      path: '/tcRecord',
      name: 'tcRecord',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/tcRecord'),
      meta: {
        requiresAuth: false
      }
    },
    //赠送
    {
      path: '/give',
      name: 'give',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/give'),
      meta: {
        requiresAuth: false
      }
    },
    //套餐支付
    {
      path: '/pay',
      name: 'pay',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/pay'),
      meta: {
        requiresAuth: false
      }
    },
    //套餐分享
    {
      path: '/share',
      name: 'share',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/share'),
      meta: {
        requiresAuth: false
      }
    },
    //个人资料
    {
      path: '/peopleForm',
      name: 'peopleForm',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/people/peopleForm'),
      meta: {
        title:'个人资料',
        requiresAuth: false
      }
    },
    //我的积分
    {
      path: '/jifen',
      name: 'jifen',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/jifen/jifen'),
      meta: {
        requiresAuth: false
      }
    },
    //兑换记录
    {
      path: '/dhrecord',
      name: 'dhrecord',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/duihuanjilu/dhrecord'),
      meta: {
        requiresAuth: false
      }
    },
    //在线充值
    {
      path: '/congzi',
      name: 'congzi',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/congzi/congzi'),
      meta: {
        requiresAuth: false
      }
    },
    //充值记录
    {
      path: '/czjilu',
      name: 'czjilu',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/congzi/czjilu'),
      meta: {
        requiresAuth: false
      }
    },
    //充值detail
    {
      path: '/czDetail',
      name: 'czDetail',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/congzi/czDetail'),
      meta: {
        requiresAuth: false
      }
    },
    //奖励
    {
      path: '/jiangli',
      name: 'jiangli',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/jiangli/jiangli'),
      meta: {
        requiresAuth: false
      }
    },
    //账户余额
    {
      path: '/endmoney',
      name: 'endmoney',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/endmoney/endmoney'),
      meta: {
        requiresAuth: false
      }
    },
    //优惠券
    {
      path: '/quan',
      name: 'quan',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/youhuiquan/quan'),
      meta: {
        requiresAuth: false
      }
    },
    //优惠券
    {
      path: '/quanDetail',
      name: 'quanDetail',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/youhuiquan/quanDetail'),
      meta: {
        requiresAuth: false
      }
    },
     //券包
     {
      path: '/quanbao',
      name: 'quanbao',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/youhuiquan/quanbao'),
      meta: {
        requiresAuth: false
      }
    },
    //过期券
    {
      path: '/guoqiquan',
      name: 'guoqiquan',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/youhuiquan/guoqiquan'),
      meta: {
        requiresAuth: false
      }
    },
     //立即使用券包
     {
      path: '/payQuan',
      name: 'payQuan',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/youhuiquan/payQuan'),
      meta: {
        requiresAuth: false
      }
    },
    //二维码支付
    {
      path: '/erweima',
      name: 'erweima',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/common/erweima'),
      meta: {
        requiresAuth: false
      }
    },
    //纪念日
    {
      path: '/day',
      name: 'day',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/day/day'),
      meta: {
        requiresAuth: false
      }
    },
     //绑定手机号
    {
      path: '/changePhone',
      name: 'changePhone',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/changePhone/changePhone'),
      meta: {
        requiresAuth: false
      }
    },
    //新手机绑定
    {
      path: '/newPhone',
      name: 'newPhone',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/changePhone/newPhone'),
      meta: {
        requiresAuth: false
      }
    },
    //查看门店
    {
      path: '/mendian',
      name: 'mendian',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/youhuiquan/MenDian'),
      meta: {
        requiresAuth: false
      }
    },
    //绑定新套餐
    {
      path: '/New',
      name: 'new',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/taocan/new'),
      meta: {
        requiresAuth: false
      }
    },
     //注册协议
     {
      path: '/agreement',
      name: 'agreement',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/huiyuanxinxi/Agreement'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})



/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  const whiteList = ['login', 'zuche','share','yaoqingLi','agreement']
  const wx = navigator.userAgent.toLowerCase().indexOf('micromessenger')
  if(to.matched.length > 0) {
    if (wx === -1) {
      if (getToken()) {
        if(to.name==='login') {
          next({ path: '/index' })
        }else {
          next()
        }
      } else {
        if (whiteList.includes(to.name)) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    } else {
      if (getToken()) {
        if(to.name==='login') {
          next({ path: '/index' })
        }else {
          next()
        }
      } else {
        if(to.query.code && to.query.refer=="afopen") {
          http.post('/api/TokenAuth/MemberAuthenticateForWechat',{
            AppId: to.query.appid,
            WechatCode: to.query.code
          }).then(res => {
            if(res.Success) {
              if(res.Result.AccessToken) {
                store.commit("setToken", res.Result.AccessToken);
                if(to.name === 'login') next({ path: '/index' })
                else next()
              } else {
                if(res.Result.WXTempKey)
                {
                  store.commit("setWXTempKey", res.Result.WXTempKey);
                }
                if(whiteList.includes(to.name)) {
                  next()
                }else {
                  next({ path: '/login' })
                }
              }
            }else {
              if(whiteList.includes(to.name)) {
                next()
              }else {
                next({ path: '/login' })
              }
            }
          });
        } else {
          if (!whiteList.includes(to.name)) {
            next()
            return
          } 
          http.get('/api/services/app/Setting/GetSetting').then(res => {
            if(res.Result.Code === 0 && res.Result.Data && res.Result.Data.BindMpAppId && res.Result.Data.MicroOpenPlatformAppId) {
              var url=encodeURIComponent(res.Result.Data.MicroOpenPlatformHost+"/mp/OAuthRedirectCallBack?return_url="+encodeURIComponent(window.location.protocol+"//"+window.location.host));
              window.location.href =
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+res.Result.Data.BindMpAppId +
                '&redirect_uri='+ url +
                '&response_type=code&scope=snsapi_userinfo&state=1&'+
                'component_appid='+res.Result.Data.MicroOpenPlatformAppId+
                '#wechat_redirect'
            }else {
              if(whiteList.includes(to.name)) {
                next()
              }else {
                next({ path: '/login' })
              }
            }
          })
        }
      }
    }
  } else {
    if(!getToken()) next({ path: '/login' })
    else next({ path: '/index' })
  }
    // 设置背景色
    if (to.meta.background === 'fffff') {
      document.querySelector('body').setAttribute('style', 'background: #f6f3f7')
    } else {
      document.querySelector('body').setAttribute('style', 'background: #fffff')
    }
});

// 给所有路由加上当页面加载的时候滚动条置顶
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})



export default router
