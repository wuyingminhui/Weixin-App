// Ubike/login/login.js
var util = require('../../utils/util.js')
var request = require('../../utils/request.js')
var user = require('../../utils/user.js')

var maxTime = 60
var currentTime = maxTime //倒计时的事件
var interval = null

var app = getApp() 
Page({
  data:{
    inputWidth: 0,
    VCText: "获取验证码",
    time: currentTime,
    phone: null,
    vc: null,
    codeId: '',
    vcdisabled: false
  },
  onLoad:function(options){
     var screen = util.getScreen()
     this.setData({
      inputWidth : screen[0] - 160,
     })
  },
  inputPhone: function (e) {
      this.setData({
        phone: e.detail.value
      })
  },
  inputVC: function (e) {
      this.setData({
        vc: e.detail.value
      })
  },
  myclock: function () {
    var that = this  
    interval = setInterval(function(){  
        currentTime--;  
        that.setData({
            vcdisabled: true,
            time : currentTime,
            VCText: currentTime + "秒后重发" 
        })  

        if(currentTime <= 0){  
            clearInterval(interval)  
            currentTime = maxTime
            that.setData({
                vcdisabled: false,
                VCText: "获取验证码"
            })
        }  
    }, 1000)  
  },
  requestVC: function () {
      var that = this
      var playload = {
          path: '/v1/validatecode',
          method: 'POST',
          data : {
            phone: that.data.phone,
            module: 'sign_up',
          },
          success: function (data) {
            if (data.data.code === 200) {
                that.setData({
                    codeId : data.data.obj,
                })
                that.myclock()
            } else {
                wx.showModal({
                    title: '失败',
                    content: '获取验证码失败，请稍后重新点击获取',
                    showCancel: false,
                    success: function(res) {
                    }
                })
            }
          },
          error: function (res) {
            wx.showModal({
                title: '失败',
                content: '获取验证码失败，请稍后重新点击获取',
                showCancel: false,
                success: function(res) {
                }
            })
          }
      }
      request.request(playload)
  },
  getVC: function () {
      if (this.data.phone) {
          if (this.data.phone.length !== 11) {
              wx.showModal({
                title: '警告',
                content: '请检查手机号是否正确',
                showCancel: false,
                success: function(res) {
                }
              })
          } else {
              this.requestVC()
          }
      } else {
        wx.showModal({
            title: '警告',
            content: '请检查手机号是否正确',
            showCancel: false,
            success: function(res) {
            }
        })
      }
  },
  signUp: function () {
      if (this.data.phone) {
          if (this.data.phone.length !== 11) {
              wx.showModal({
                title: '警告',
                content: '请检查手机号是否正确',
                showCancel: false,
                success: function(res) {
                }
              })
          } else {
              this.checkVC()
          }
      } else {
        wx.showModal({
            title: '警告',
            content: '请检查手机号是否正确',
            showCancel: false,
            success: function(res) {
            }
        })
      }
  },
  checkVC: function () {
      if (this.data.vc) {
          if (this.data.vc.length !== 4) {
              wx.showModal({
                title: '警告',
                content: '请检查验证码是否正确',
                showCancel: false,
                success: function(res) {
                }
              })
          } else {
              this.postSignUp()
          }
      } else {
        wx.showModal({
            title: '警告',
            content: '请检查验证码是否正确',
            showCancel: false,
            success: function(res) {
            }
        })
      }
  },
  postSignUp: function () {
      var that = this
      console.log(that.data.codeId)
      var playload = {
          path: '/v1/register',
          method: 'POST',
          data : {
            randCode: that.data.vc,
            phone: that.data.phone,
            codeId: that.data.codeId
          },
          success: function (data) {
            console.log(data)
            if (data.data.code === 200) {
                if (user.setUser(data.data.obj)) {
                    if (user.setToken(data.data.obj.token)) {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            } else {
                wx.showModal({
                    title: '失败',
                    content: '登录失败，请重试',
                    showCancel: false,
                    success: function(res) {
                    }
                })
            }
          },
          error: function (res) {
            wx.showModal({
                title: '失败',
                content: '登录失败，请重试',
                showCancel: false,
                success: function(res) {
                }
            })
          }
      }
      request.request(playload)
  }
})