var request = require('../../utils/request.js')

var app = getApp()
Page({
    data:{
        premoneies:[[10, 20], [50, 100]],
        loading: false,
        amount: 10,
        balance: 0,
    },
    showLoading: function(title, duration){
        wx.showToast({
            title: title,
            icon: 'loading',
            duration: duration || 2000,
            mask: true
        })
    },
    onLoad: function(options){
        var that = this
        that.showLoading('加载中', 10000);
        request.request({
            path: 'https://testapi.ubike.cn/v1/users/reload',
            success: function(result) {
                var data = result.data.obj
                if (result.data.code === 200) {
                    that.setData({
                        balance: data.balance.toFixed(2)
                    })
                }
            },
            done: function(data) {
                console.log(data)
                wx.hideToast()
            }
        })
    },
    pay: function(e){
        this.setData({
            loading: true
        })
        var dt = parseInt(new Date().getTime() / 1000, 10)
        request.request({
            path:'https://testapi.ubike.cn/v1/wxpay/weixin',
            method:'POST',
            data:{
                totalFee: this.data.amount * 100,
                'nonceStr': 'UBIKE_2016_',
                'body': false ? '优拜单车押金' : '优拜单车充值',
                'timestamp': dt,
                'type': 1,
                'payType': 20,
                'ip': '29.123.164.23',
                openId: 'oA5RmwqBas6h1_9IpY3j40nDzzgI'
            },
            success: function(result){
                var data = result.data.obj
                console.log(result.data)
                wx.requestPayment({
                    'timeStamp': data.timestamp + '',
                    'nonceStr': data.nonceStr,
                    'package': 'prepay_id='+data.prepayId,
                    'signType': 'MD5',
                    'paySign': data.sign,
                    'success':function(res){
                        request.request({
                            path:'https://testapi.ubike.cn/v1/balances/charge',
                            method: 'POST',
                            data: {
                                orderId:data.orderId,
                            }
                        })
                    },
                    'fail':function(res){
                    }
                })
            }
        })
    },
    input: function(e) {
        var value = e.detail.value
        this.setData({
            amount: value
        })
        return ~~value;
    },
    choose: function(e) {
        this.setData({
            amount: ~~e.currentTarget.dataset.premoney
        })
    }
})