var weixin = require('../../utils/weixin.js')
var util = require('../../utils/util.js')
var request = require('../../utils/request.js')
var user = require('../../utils/user.js')

//index.js  
//获取应用实例  
var app = getApp()  
Page({
  data: {
    isLogin: false,
    screenWidth: 0,
    screenHeight: 0,
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
    controls: [],
    circles: [{radius: 2000}],
    scale: 18
  },
  onLoad: function(option) {
    weixin.weinxinLogin()
    weixin.getUser()
    this.getumap()
  },
  onReady: function () {  
    var screen = util.getScreen()
    this.mapCtx = wx.createMapContext('myMap')
    this.setData({
      navWidth : screen[0] - 20,
      screenWidth: screen[0],
      screenHeight: screen[1],
      height: screen[1] + 30
    })
    if (user.isLogin()) {
      this.setData({
        controls: [{
          id: 1,
          iconPath: '../images/scan_1.png',
          position: {
            left: screen[0] / 2 - 81,
            top: screen[1] - 50,
            width: 98,
            height: 37
          },
          clickable: true
        },
        {
          id: 2,
          iconPath: '../images/man_1.png',
          position: {
            left: screen[0] / 2 + 17,
            top: screen[1] - 50,
            width: 64,
            height: 37
          },
          clickable: true
        },{
          id: 100,
          iconPath: '../images/loc.png',
          position: {
            left: 10,
            top: screen[1] - 50,
            width: 37,
            height: 37
          },
          clickable: true
        }]
      })
    } else {
      this.setData({
        controls: [{
          id: 1000,
          iconPath: '../images/login.png',
          position: {
            left: screen[0] / 2 - 81,
            top: screen[1] - 50,
            width: 162,
            height: 37
          },
          clickable: true
        },{
          id: 100,
          iconPath: '../images/loc.png',
          position: {
            left: 10,
            top: screen[1] - 50,
            width: 37,
            height: 37
          },
          clickable: true
        }]
      })
    }
  },
  controltap(e) {
    if (e.controlId === 1) {
      this.scan()
    } else if (e.controlId === 2) {
      this.setData({
        controls: [{
          id: 3,
          iconPath: '../images/scan_2.png',
          position: {
            left: this.data.screenWidth / 2 - 81,
            top: this.data.screenHeight - 50,
            width: 98,
            height: 37
          },
          clickable: true
        },
        {
          id: 4,
          iconPath: '../images/man_2.png',
          position: {
            left: this.data.screenWidth / 2 + 17,
            top: this.data.screenHeight - 50,
            width: 64,
            height: 37
          },
          clickable: true
        },{
          id: 100,
          iconPath: '../images/loc.png',
          position: {
            left: 10,
            top: this.data.screenHeight - 50,
            width: 37,
            height: 37
          },
          clickable: true
        }]
      })
      this.manully()
    } else if (e.controlId === 3) {
      this.setData({
        controls: [{
          id: 1,
          iconPath: '../images/scan_1.png',
          position: {
            left: this.data.screenWidth / 2 - 81,
            top: this.data.screenHeight - 50,
            width: 98,
            height: 37
          },
          clickable: true
        },
        {
          id: 2,
          iconPath: '../images/man_1.png',
          position: {
            left: this.data.screenWidth / 2 + 17,
            top: this.data.screenHeight - 50,
            width: 64,
            height: 37
          },
          clickable: true
        },{
          id: 100,
          iconPath: '../images/loc.png',
          position: {
            left: 10,
            top: this.data.screenHeight - 50,
            width: 37,
            height: 37
          },
          clickable: true
        }]
      })
      this.scan()
    } else if (e.controlId === 4) {
      this.manully()
    } else if (e.controlId === 100) {
      this.moveToLocation()
    } else if (e.controlId === 1000) {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
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
    // user.deleteUser()
    // wx.redirectTo({
    //     url: '../index/index'
    // })
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
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        that.getbikes(longitude, latitude, 2000)
        // that.setData({
        //   latitude: 31.2178571401916,
        //   longitude: 121.418047114414
        // })
        // that.getbikes(121.418047114414, 31.2178571401916, 2000)
      }  
    })
  },
  getbikes: function (lon, lat, r) {
    var that = this
    var playload = {
    path: '/v1/lockw/search?lon='+ lon +'&lat=' + lat + '&r=' + r,
    domain: 'https://searchprod.ubike.cn',
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
  },


  submitE: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
  },
})  