// pages/myspace/myspace.js
//获取应用实例
const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  data: {
    imageUrl:"",
    showText:""
  },
  toChangeInfo:function(){

    wx.redirectTo({
      url: '/pages/userInfo/userInfo',
    })

  },
    onLoad:function(){
    var that = this;
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:function(res){
              that.setData({
                userInfo:res.userInfo,
                imageUrl:res.userInfo.avatarUrl,
                showText:res.userInfo.nickName
              })
            },
          })
        }else{
          that.setData({
            imageUrl:"/image/wx_login.png",
            showText:"点击授权登录"
          })
        }
      },
    })  
  },
  onShow: function () {
    console.log('个人中心')
    this.getTabBar().init();
  },
})