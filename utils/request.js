function request(options) {
  // var domain = 'https://test'
  var path = options.path;
  var data = options.data;
  console.log(data)
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
        'content-type': 'application/json',
        'X-TOKEN': 'RFdVNn8ksZjGhi0Sd6Vykx+t1IMj/SRyrVPhu9TGYGo='
    },
    success: success,
    fail: error,
    complete: done
  })
}

module.exports = {
  request: request
}