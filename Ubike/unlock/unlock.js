var request = require('../../utils/request.js')
var user = require('../../utils/user.js')

var app = getApp()
Page({
  data: {
    animationData: {},
    showText: '解锁中',
    bikeNum: 12312322323
  },
  onLoad:function(options){
     this.setData({
      bikeNum: options.bn
     })
  },
  onReady: function () {
    this.unlock()
  },
  onShow: function(){
    var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease-in-out',
    })

    this.animation = animation
    animation.opacity(0.3).step()
    animation.opacity(1).step()
    animation.opacity(0.3).step()
    this.setData({
      animationData:animation.export()
    })

    setTimeout(this.turnAnimation.bind(this), 4000)
  },
  turnAnimation: function () {
     var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease-in-out',
     })
     this.animation = animation
      animation.opacity(0.3).step()
      animation.opacity(1).step()
      animation.opacity(0.3).step()
      this.setData({
        animationData:animation.export()
      })
      setTimeout(this.turnAnimation.bind(this), 4000)

  },
  unlock: function () {
    var playload = {
        path: '/v1/bikes/unlock',
        method: 'POST',
        header: {
          'X-TOKEN': user.getToken()
        },
        data : {
          number: this.data.bikeNum
        },
        success: function (data) {
          console.log(data)
        },
        error: function (res) {
          wx.showModal({
              title: '失败',
              content: '开锁失败',
              showCancel: false,
              success: function(res) {
              }
          })
        }
    }
    request.request(playload)
  }
})
