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
  return [windowWidth, windowHeight]
}

var animation = wx.createAnimation({
  transformOrigin: "50% 50%",
  duration: 1000,
  timingFunction: "ease",
  delay: 0
})

var r = {
    protocol: /([^\/]+:)\/\/(.*)/i,
    host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
    port: /\:?([^\/]*)(\/?.*)/,
    pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
};

function parseUrl(url) {
    var tmp, res = {};
    res["href"] = url;
    for (var p in r) {
        tmp = r[p].exec(url);
        res[p] = tmp[1];
        url = tmp[2];
        if (url === "") {
            url = "/";
        }
        if (p === "pathname") {
            res["pathname"] = tmp[1];
            res["search"] = tmp[2];
            res["hash"] = tmp[3];
        }
    }
    return res;
};

module.exports = {
  getScreen: getScreen,
  formatTime: formatTime,
  parseUrl: parseUrl
}
