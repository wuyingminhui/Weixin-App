var request = require('../../utils/request.js')
var user = require('../../utils/user.js')

var app = getApp()
Page({
  data: {
    animationData: {},
    showText: '解锁中',
    // bikeNum: 12323232322,
    bikeNum: '',
    orderId: 1604,
    myColor: '#ff922a',
    showButton: false
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
    var that = this
    var playload = {
        path: '/v1/bikes/unlock',
        method: 'POST',
        header: {
          'X-TOKEN': user.getToken()
        },
        data : {
          number: that.data.bikeNum
        },
        success: function (data) {
          console.log(data)
          if (data.data.code === 200) {
              that.getLockStatus(data.data.obj.id)
          } else {
            wx.showModal({
              title: '失败',
              content: '开锁失败, 原因: ' + data.data.msg,
              showCancel: false,
              success: function(res) {
                wx.redirectTo({
                    url: '../index/index'
                })
              }
            })
          }
        },
        error: function (res) {
          wx.showModal({
              title: '失败',
              content: '开锁失败',
              showCancel: false,
              success: function(res) {
                wx.redirectTo({
                    url: '../index/index'
                })
              }
          })
        }
    }
    request.request(playload)
  },
  getLockStatus: function (orderId) {
    console.log('getLockStatus')
    var that = this
    var playload = {
      path: '/v1/order/' + orderId + '/status',
      header: {
        'X-TOKEN': user.getToken()
      },
      success: function (data) {
        if (data.data.code === 200) {
          if (data.data.obj.status === 0) {
            setTimeout(that.getLockStatus.bind(this, that.data.orderId), 2000)
          } else if (data.data.obj.status === 10) {
            that.setData({
              showText: '解锁成功',
              myColor: '#66DD00',
              showButton: true
            })
            var animation = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease-in-out',
            })

            this.animation = animation
            animation.backgroundColor('#66DD00').step()
            that.setData({
              animationData: animation.export()
            })
          } else if (data.data.obj.status === 20) {
             wx.redirectTo({
               url: '../index/index'
             })
          } else {
            wx.redirectTo({
               url: '../index/index'
            })
          }
        }
      },
      error: function () {
        setTimeout(that.getLockStatus.bind(this, that.data.orderId), 2000)
      }
    }
    request.request(playload)
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})
