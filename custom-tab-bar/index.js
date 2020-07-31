// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list:[
      {
        "url":"/pages/index/index",
        "icon":"todo-list-o",
        "text":"首页",
      },
      {
        "url":"/pages/todo/todo",
        "icon":"passed",
        "text":"打卡",
      },
      {
        "url":"/pages/myspace/myspace",
        "icon":"manager-o",
        "text":"我的"
      },
      
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      console.log(e,'e')
      this.setData({ active: e.detail });
      wx.reLaunch({
        url: this.data.list[e.detail].url,
      })
    },
    init(){
      const page = getCurrentPages().pop();
         this.setData({
        　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
         });
        }
    }
  }
)
