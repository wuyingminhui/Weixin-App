var app = getApp()  
Page({
  data: {
    index: 0,
    enable: false,
    postdata: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: ''}
  },
  onLoad: function(option) {
    
  },
  inpp: function(e) {
      console.log(e)
      var that = this
      if(e.detail.cursor == 1){
        if(that.data.index < 11){
          var tmp = that.data.postdata
          tmp[e.target.id] = e.detail.value
          if (this.getNum().length === 11) {
            that.setData({
                enable : true
            })
          }
          that.setData({
                index : that.data.index + 1
          })
        } else {
          var tmp = that.data.postdata
          tmp[e.target.id] = e.detail.value
          if (this.getNum().length === 11) {
            that.setData({
                enable : true
            })
          }
          // console.log(tmp)
        }
      }
  },
  manully: function() {
    this.getNum()
  },
  getNum: function() {
    var that = this
    var num
    for(var key in that.data.postdata){
      if(key === '0'){
        num = that.data.postdata[key]
      }else {
        num += that.data.postdata[key]
      }  
    }
    return num
  }
})