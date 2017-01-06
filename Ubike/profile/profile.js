var request = require('../../utils/request.js')

var app = getApp()

Page({
    data:{
        avatars: ['../images/default_avatar.png', '../images/avatar_male.png', '../images/default_female.png'],
        name: '小优',
        balance: 0.00,
        avatar:'../images/default_avatar.png'
    },
    onLoad:function(){
        var that = this
        wx.setNavigationBarTitle({
            title: '个人中心'
        })
        wx.showNavigationBarLoading()
        request.request({
            path: 'https://testapi.ubike.cn/v1/users/reload',
            success({data}) {
                if (data.code === 200) {
                    var obj = data.obj
                    that.setData({
                        balance: obj.balance.toFixed(2),
                        avatar: obj.face || that.data.avatars[~~obj.gender],
                        name: obj.realName
                    })
                }
            },
            done(data) {
                wx.hideNavigationBarLoading()
            }
        })
    }
})