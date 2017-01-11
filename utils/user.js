var request = require('./request.js')

function isLogin () {
    try {
        var value = wx.getStorageSync('Ubike_User')
        if (value) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

function getUserVC () {

}

function setUser (data) {
    try {
        wx.setStorageSync('Ubike_User', data)
        return true
    } catch (e) {
        return false
    }
}

function deleteUser () {
    try {
        wx.removeStorageSync('Ubike_User')
        return true
    } catch (e) {
        return false
    }
}

function setToken (data) {
    try {
        wx.setStorageSync('Ubike_User_Token', data)
        return true
    } catch (e) {
        return false
    }
}

module.exports = {
  isLogin: isLogin,
  setUser: setUser,
  setToken: setToken,
  deleteUser: deleteUser
}