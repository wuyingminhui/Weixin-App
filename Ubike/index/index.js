var weixin = require('../../utils/weixin.js')

//index.js  
//获取应用实例  
var app = getApp()  
Page({
  data: {
    isShow: false
  },
  onLoad: function() {
    console.log('onLaunch')
    weixin.weinxinLogin()
  },
  onReady: function () {  
    console.log('onload')
  },  
  getlocation: function () { 
    wx.navigateTo({
      url: '../umap/umap'
    })
  },
  scan: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  manully: function () {
    this.setData({
      isShow: !this.data.isShow
    })
  }
})  