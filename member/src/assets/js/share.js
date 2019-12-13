;(function(w) {
  document.addEventListener(
    'plusready',
    function() {

      let shares = {}
      plus.share.getServices(
        function(s) {
          for(var i in s) {
            var t = s[i]
            shares[t.id] = t
          }
          console.log(JSON.stringify(shares))
        },
        function(e) {
          console.log('获取分享服务列表失败：' + e.message)
        }
      )

      var shareAction = function(sb, msg, cb=null) {
        if(!sb || !sb.s) {
          plus.nativeUI.alert('无效的分享服务！')
          return
        }
        msg.extra = {
          scene: sb.x
        }
        // 发送分享
        if(sb.s.authenticated) {
          sb.s.send(
            msg,
            () => {
              cb && cb()
              // plus.nativeUI.alert('分享到' + sb.s.description + '成功！')
            },
            e => {
              plus.nativeUI.alert('分享到' + sb.s.description + '失败: ' + e.message)
            }
          )
        } else {
          sb.s.authorize(
            () => {
              sb.s.send(
                msg,
                () => {
                  cb && cb()
                  // plus.nativeUI.alert('分享到' + sb.s.description + '成功！')
                },
                e => {
                  plus.nativeUI.alert('分享到' + sb.s.description + '失败: ' + e.code + e.message)
                }
              )
            },
            e => {
              plus.nativeUI.alert('认证授权失败')
            }
          )
        }
        // if(msg.extra.scene == "WXSceneSession" || msg.extra.scene == "WXSceneTimeline" ){
        //   msg.type = "web";
        // }
      }

      w.wxShare = function(msg, cb=null) {

        let shareBts = []
        console.log(shares)
        // 更新分享列表
        let ss = shares['weixin']
          // console.log(ss&&ss.nativeClient)
        ss &&
        ss.nativeClient &&
        (shareBts.push({
          title: '微信朋友圈',
          s: ss,
          x: 'WXSceneTimeline'
        }),
          shareBts.push({
            title: '微信好友',
            s: ss,
            x: 'WXSceneSession'
          }))
        shareBts.push({
          title: "QQ",
          s: shares['qq']
        })
        // 弹出分享列表
        shareBts.length > 0 ?
          plus.nativeUI.actionSheet({
              title: '分享',
              cancel: '取消',
              buttons: shareBts
            },
            e => {
              e.index > 0 && shareAction(shareBts[e.index - 1], msg, cb)
            }
          ) :
          plus.nativeUI.alert('当前环境无法支持分享链接操作!')
      }
    },
    false
  )
})(window);
