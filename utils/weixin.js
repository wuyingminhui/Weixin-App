var request = require('./request.js')

function weinxinLogin () {
  console.log('weinxinLogin')
  wx.login({
    success:function(res){
      console.log(res)
      var playload = {
        path: 'https://testapi.ubike.cn/v1/wxpay/openids?code=' + res.code,
        success: function (data) {
          console.log(data)
        }
      }
      console.log(playload)
      request.request(playload)
    }
  });  
}

module.exports = {
  weinxinLogin: weinxinLogin
}
