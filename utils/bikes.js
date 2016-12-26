var request = require('./request.js')

function getBikes (lon, lat, r) {
  var playload = {
    path: 'https://searchtest.ubike.cn/v1/lockw/search?lon='+ lon +'&lat=' + lat + '&r=' + r,
    success: function (data) {
        console.log(data)
        var bikes
        if (data.data) {
          if (data.data.length !== 0) {
          bikes = data.data.map(function (bike) {
            if (bike.bike) {
              return {
                id: bike.bike.bikeId,
                latitude: bike.latitude,
                longitude: bike.longitude,
                iconPath: '../images/car.png'
              }
            }
          })
        }
      }
      console.log(bikes)
      return bikes
    }
  }
  request.request(playload)
}

module.exports = {
  getBikes: getBikes
}