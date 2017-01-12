var app = getApp()  
Page({
  data: {
    index: 0,
    enable: true,
    postdata: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: ''}
  },
  onLoad: function(option) {
    
  },
  inpp: function(e) {
      // console.log(e)
      var that = this
      if(e.detail.cursor == 1){
        if(that.data.index < 11){
          var tmp = that.data.postdata
          tmp[e.target.id] = e.detail.value
          that.setData({
                postdata : tmp
          })
          this.checkDisable()
          that.setData({
                index : that.data.index + 1
          })
          // console.log(tmp)
        } else {
          var tmp = that.data.postdata
          tmp[e.target.id] = e.detail.value
          that.setData({
                postdata : tmp
          })
          this.checkDisable()
          // console.log(tmp)
        }
      } else {
        if (e.target.id < 11) {
          var tmp = that.data.postdata
          tmp[e.target.id] = e.detail.value
          that.setData({
                postdata : tmp
          })
          this.checkDisable()
          // console.log(tmp)
        }
      }
  },
  checkDisable: function () {
    var that = this
    if (this.getNum().length === 11) {
      that.setData({
          enable : false
      })
    } else {
      that.setData({
          enable : true
      })
    }
  },
  manully: function() {
    var bikenum = this.getNum()
    if (bikenum.length !== 11) {
        wx.showModal({
            title: '警告',
            content: '请输入正确的车辆编号',
            showCancel: false,
            success: function(res) {
            }
        })
    } else {
      wx.redirectTo({
          url: '../unlock/unlock?bn=' + bikenum
      })
    }
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