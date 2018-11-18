// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //开发性的数据定在这里，值为一个对象，有三个属性，必填的type,值有很多 需要首字母大写，
    like: {
      type: Boolean, //boolean 的默认值为false ,number 的默认值为0
      // value: false,
      observer: function() {
      }
    },
    count: {
      type: Number,
      // value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  // 数据绑定  三元表达式  组件的封装性(组件内部定义的数据)、开放性(组件外部定义的数据)、
  // 粒度（简单功能、复杂功能） 这些东西 都需要 自己去好好的抉择
  data: {
    //仔细思考下 like和count属性值,可以定义在外部,即在properties中。
    // like: true,
    // count: 99,
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      //定义在js运行的变量 like,count
      let like = this.properties.like
      let count = this.properties.count
      count = like?count-1:count+1
      //处理运算逻辑,并用小程序自带的this.setData来重新渲染数据。
      console.log(count)
      this.setData({
          like: !like,
          count: count,
      })
      //自定义like状态 的行为值
      let behavior = this.properties.like ? 'like' : 'cancel'
      //激活自定义事件like 然后去父组件中去使用。
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
