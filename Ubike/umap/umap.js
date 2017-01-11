var request = require('../../utils/request.js')

Page({
  data: { 
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
  onLoad: function(option){
    this.getumap()
  },
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    console.log('getCenterLocation')
    this.mapCtx.getCenterLocation({
      success: function(res){
        // console.log(res.longitude)
        // console.log(res.latitude)
      }
    })
  },
  markerTap: function (e) {    
    this.findLine(e.markerId)
  },
  regionchange: function(e) {
    //   this.getCenterLocation()
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  findLine: function (markerId) {
    var that = this
    that.setData({
      wantedLine: !that.data.wantedLine
    })
    if ( that.data.wantedLine) {
      wx.openLocation({
        latitude: markerId.latitude,
        longitude: markerId.longitude,
        scale: 17,
        name: "优拜车辆编号",
        address: markerId.number
      })
      // that.setData({
      //   markers: [markerId]
      // }) 
    } else {
      that.setData({
        markers: that.data.allMarkers
      })
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