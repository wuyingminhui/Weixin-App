function request(options) {
  // var domain = 'https://test'
  var path = options.path;
  var data = options.data;
  var method = options.method || 'GET';
  // var m_domain = options.domain ? options.domain : domain
  var done = options.done || function() {};
  var success = options.success || function() {};
  var error = options.error || function() {};
  console.log(path)
  wx.request({
    url: path, //仅为示例，并非真实的接口地址
    data: data,
    method: method,
    header: {
        'content-type': 'application/json'
    },
    success: success,
    fail: error
  })
}

module.exports = {
  request: request
}