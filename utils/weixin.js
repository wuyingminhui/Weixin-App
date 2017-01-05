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

function checkLogin () {
  wx.checkSession({
    success: function(){
    },
    fail: function(){
      weinxinLogin()
    }
  })
}

function getUser () {
  wx.getUserInfo({
    success: function(res) {
      console.log(res)
    }
  })
}

function setSync () {
  try {
    wx.setStorageSync('jason', 'woo')
  } catch (e) {    
  }
}

function getSync () {
  try {
    return wx.getStorageSync('jason')
  } catch (e) {    
  }
}

module.exports = {
  weinxinLogin: weinxinLogin,
  setSync: setSync,
  getSync: getSync,
  getUser: getUser
}
