function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getScreen() {
  var windowWidth, windowHeight
  wx.getSystemInfo({  
    success: function (res) {  
      windowWidth = res.windowWidth;  
      windowHeight = res.windowHeight;  
    }  
  })
  console.log(windowWidth)
  console.log(windowHeight)
  return [windowWidth, windowHeight]
}

module.exports = {
  getScreen: getScreen,
  formatTime: formatTime
}
