App({
  onLaunch:function(){
    //云开发环境初始化
    let that = this;
    wx.cloud.init({
      env:"wechatapp-yowre"
    }),
    wx.cloud.callFunction({
      name:"getOpenId",
      success:function(res){
        that.globalData.openId = res.openId
      }
    })
  },
  globalData:{
    openId:""
  }
})