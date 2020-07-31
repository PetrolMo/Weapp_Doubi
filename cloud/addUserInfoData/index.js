// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  cloud.database.Collection('user').add({
  data:{
    _id:_id,
    openID:_id,
    nickName:nickName,
    avatarUrl:avatarUrl,
    province:province,
    city:city
  },
  success:function(res){
    console.log("添加成功",res)
  },
  fail:console.error
})
}