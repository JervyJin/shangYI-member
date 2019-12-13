;(function (w) {

  var  bitmap;
  function plusReady() {
    var bitmap = new plus.nativeObj.Bitmap("test");

    w.getImage = function(imageData) {

      return new Promise((resolve, reject) => {
        console.log('get img base64 is: ' + imageData)

        bitmap.loadBase64Data(imageData, function () {
          bitmap.save("_doc/a.jpg", {}, function(i) {
            resolve('_doc/a.jpg')
            console.log('保存图片成功：' + JSON.stringify(i));
          }, function(e) {
            reject()
            console.log('保存图片失败：' + JSON.stringify(e));
          })
        }, function () {
          reject()
        })
      })
    }
  }
  if (w.plus) {
    plusReady()
  } else {
    document.addEventListener("plusready", plusReady, false)
  }
})(window)
