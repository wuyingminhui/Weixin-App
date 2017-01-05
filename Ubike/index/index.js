var weixin = require('../../utils/weixin.js')
var util = require('../../utils/util.js')
var request = require('../../utils/request.js')

//index.js  
//获取应用实例  
var app = getApp()  
Page({
  data: {
    isShow: false,
    modal_left: 0,
    navWidth: 0,
    height: 0,
    latitude: 0,//纬度 
    longitude: 0,//经度 
    speed: 0,//速度 
    accuracy: 16,//位置精准度 
    markers: [], 
    covers: [],
    wantedLine: false,
    allMarkers: [],
    polyline: [],
    circles: [{radius: 2000}],
    scale: 16
  },
  onLoad: function(option) {
    console.log('onLoad')
    console.log(option)
    weixin.weinxinLogin()
    weixin.getUser()
    console.log(weixin.getSync())
    this.getumap()
  },
  onReady: function () {  
    console.log('onReady')
    var screen = util.getScreen()
    this.setData({
      navWidth : screen[0] - 20,
      height: screen[1] - 100
    })
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
  submitE: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
  },
  manully: function () {
    wx.navigateTo({
      url: '../manual/manual'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/Ubike/umap/umap'
    }
  },
  getumap: function () {
    var that = this
    wx.getLocation({  
      type: 'gcj02',  
      success: function (res) { 
        console.log(res) 
        var latitude = res.latitude  
        var longitude = res.longitude  
        var speed = res.speed  
        var accuracy = res.accuracy
        // that.setData({
        //   latitude: latitude,
        //   longitude: longitude
        // })
        // that.getbikes(longitude, latitude, 2000)
        that.setData({
          latitude: 31.2178571401916,
          longitude: 121.418047114414
        })
        that.getbikes(121.418047114414, 31.2178571401916, 2000)
      }  
    })
  },
  getbikes: function (lon, lat, r) {
    var that = this
    var playload = {
    path: 'https://searchprod.ubike.cn/v1/lockw/search?lon='+ lon +'&lat=' + lat + '&r=' + r,
    success: function (data) {
        console.log(data)
        var bikes
        if (data.data) {
          if (data.data.length !== 0) {
          bikes = data.data.map(function (bike) {
            if (bike.bike&&bike.latitude&&bike.longitude) {
              return {
                id: {id: bike.bike.bikeId, latitude: bike.latitude, longitude: bike.longitude, iconPath: '../images/car.png', number: bike.bike.number, width: 28, height: 28},
                latitude: bike.latitude,
                longitude: bike.longitude,
                iconPath: '../images/car.png',
                width: 28,
                height: 28
              }
            }
          })
        }
      }
      var ma
      if (bikes) {
        ma = bikes.filter(t => t!=undefined && t!==null)
      }
      if (ma) {
        that.setData({
            markers: ma,
            allMarkers: ma
        })
      }
      
    }
  }
  request.request(playload)
  }
})  