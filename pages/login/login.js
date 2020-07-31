const app = getApp();
var userInfo;
wx.cloud.init({
    env:"wechatapp-yowre"
})
const DB = wx.cloud.database()
var that;
Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
      that = this;
      // 查看是否授权
      wx.getSetting({
          success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                      success: function (res) {
                          //从数据库获取用户信息
                          var userInfo = res.userInfo
                          //用户已经授权过
                          wx.reLaunch({
                              url: '/pages/index/index'
                          })
                      }
                  });
              }
          }
      })
  },
  userAdd(openId){
      var user = {
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl,
          city:userInfo.city,
          gender:userInfo.gender,
          province:userInfo.province,
          _openId:userInfo._openId
      };
      DB.collection('user').add({
          data:user
      }).then(res => {
          console.log(res),
          wx.switchTab({
            url: '/pages/index/index'  
        })
      })
  },
  getUserInfo:function(e){
      if(e.detail.userInfo){
          userInfo = e.detail.userInfo;
          wx.cloud.callFunction
          ({
              name:'getOpenId',
              success:function(res)
              {
                  let openId = res.result.openid
                  //判断数据库是否有数据
                  DB.collection('user').where({
                    openId: openId,
                  })
                  .get().then
                  (ress => {
                    console.log('ressressressressressressressress',ress.data)
                    if (ress.data.length == 0) 
                    {
                      that.userAdd(openId)
                    } else {
                      wx.switchTab({
                        url: '/pages/index/index',
                                  })
                           }        
                  })
             },     
               fail:function(res)
               {
                   console("授权失败")
               }
          })
        }
  else{
    //用户按了拒绝按钮
    wx.showModal({
        title:'警告',
        content:'您点击了拒绝授权，将无法使用小程序，请授权之后再进入!',
        showCancel:true,
        cancelText:"返回授权",
        confirmText:"进入程序",
        success:function(res){
            if (res.confirm) {
                wx.switchTab({
                    url: '/pages/myspace/myspace',
                 }),
                 this.getTabBar().setData({
                     
                 })

            } 
        }
    })
}
}
})