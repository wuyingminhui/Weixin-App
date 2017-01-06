var request = require('../../utils/request.js')

var app = getApp()
new Page({
    data:{
        modalHidden:true,
        modalMsg:'',
        modalHidden2:true,
    },
    exit: function(){
        wx.clearStorageSync()
        wx.redirectTo({
          url: '../index/index'
        })
    },
    refund: function(){
        this.setData({
            modalHidden: false
        })
    },
    cancelRefund(){
        this.setData({
            modalHidden: true
        })
    },
    confirmRefund(){
        var that = this
        this.setData({
            modalHidden:true
        })
        app.showLoading('请求中', 10000)
        request.request({
            path:'https://testapi.ubike.cn/v1/deposit/refund',
            method:'POST',
            success({data}) {
                var msg = '您的退款申请已经受理，退款将在3-7个工作日原路退回您的付款账户'
                if (data.code !== 200) {
                    msg = data.msg
                }
                console.log(data)
                that.setData({
                    modalHidden2: false,
                    modalMsg: msg
                })
                window.location.href = './profile.html'
            },
            error: function(msg) {
                console.log(msg)
                that.setData({
                    modalHidden2:false,
                    modalMsg:msg
                })
                window.location.href = './profile.html'
            },
            done(){
                wx.hideToast()
            }
        })
    },
    hide(){
        this.setData({
            modalHidden2: true
        })
    }
})