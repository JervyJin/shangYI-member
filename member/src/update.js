import axios from 'axios'
import config from '@/updateConfig'
var wgtWaiting = null

function downWgt(wgtUrl) {
  wgtWaiting = plus.nativeUI.showWaiting('开始下载')
  var wgtOption = {
    filename: '_doc/update/',
    retry: 1
  }
  var task = plus.downloader.createDownload(wgtUrl, wgtOption, function(
    download,
    status
  ) {
    if (status == 200) {
      wgtWaiting.setTitle('开始安装')
      installWgt(download.filename)
    } else {
      plus.nativeUI.alert('应用升级失败！')
      wgtWaiting.close()
    }
  })

  task.addEventListener('statechanged', function(download, status) {
    switch (download.state) {
      case 2:
        wgtWaiting.setTitle('已连接到服务器')
        break
      case 3:
        var percent = (download.downloadedSize / download.totalSize) * 100
        wgtWaiting.setTitle('下载中')
        break
      case 4:
        wgtWaiting.setTitle('下载完成')
        break
    }
  })
  task.start()
}

function installWgt(wgtpath) {
  plus.runtime.install(
    wgtpath,
    {},
    function(wgtinfo) {
      wgtWaiting.close()
      plus.nativeUI.alert('更新完成，须重启应用！', function() {
        plus.runtime.restart()
      })
    },
    function(error) {
      wgtWaiting.close()
      plus.nativeUI.alert('应用更新失败！\n' + error.message)
    }
  )
}

//自动更新,检验在登陆之前就开始执行
export function checkUpdate() {
  plus.runtime.getProperty(plus.runtime.appid, function(inf) {
    var wgtVer = inf.version
    window.version = wgtVer
    console.log(plus.runtime.appid)
    console.log(wgtVer)
    console.log(plus.os.name)
    console.log(plus.os.version)
    console.log(config.update_url)
    axios
      .post(config.update_url, {
        appid: plus.runtime.appid,
        version: wgtVer,
        osName: plus.os.name,
        osVersion: plus.os.version
      })
      .then(function(res) {
        res = res.data
        if (res.status == 'success') {
          let { needUpdate, forceUpdate, updateDesc, wgtUrl } = res.data
          console.log(needUpdate)
          if (forceUpdate) {
            plus.nativeUI.alert(
              updateDesc,
              function() {
                downWgt(wgtUrl)
              },
              '应用更新',
              '确认'
            )
            return
          }
          if (needUpdate) {
            plus.nativeUI.confirm(
              updateDesc,
              function(e) {
                if (e.index == 1) {
                  return
                }
                downWgt(wgtUrl)
              },
              {
                title: '发现新版本',
                buttons: ['升级新版本', '下次再说']
              }
            )
            return
          }
          return
        }

        /*if (data.needUpdate === true) {
                plus.nativeUI.confirm(data.updateDesc, function (e) {
                    if (e.index == 1) {
                        return
                    }
                    downWgt(data.wgtUrl)
                }, {
                        title: '发现新版本',
                        buttons: ['升级新版本', '下次再说']
                    })
            } else {
                return
            }*/
      })

    /*axios.ajax({
            type: "post",
            url: config.update_url,
            dataType: "json",
            data: {
                appid: plus.runtime.appid,
                version: wgtVer,
                osName: plus.os.name,
                osVersion: plus.os.version
            },
            success: function (data) {
                if (data.needUpdate === true) {
                    plus.nativeUI.confirm(data.updateDesc, function (e) {
                        if (e.index == 1) {
                            return
                        }
                        downWgt(data.wgtUrl)
                    }, {
                            title: '发现新版本',
                            buttons: ['升级新版本', '下次再说']
                        })
                } else {
                    return
                }
            },
            error: function (err) {

            }
        })*/
  })
}
