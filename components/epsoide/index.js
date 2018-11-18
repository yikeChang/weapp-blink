// components/classic/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,//当类型为Number时候,在此赋值 08会被修改为8，
      //当类型为 String, 但是当类型为String时候，会出下述问题。
      //observer 函数在index值非默认值时候小程序执行这个函数。
      observer(newVal, oldVal, changedPath) {
        //千万不要再observer中使用this.setData去修改index值，因为observer是数据改变执行，在里面
        // 继续改变数据，从而继续调用，导致无限循环，导致内存泄露。我们定义个_index数据并改变。
        let val = newVal<10 ? '0'+newVal : newVal
        console.log(val)
        this.setData({
          _index: val
        })
      }
    }
  },
  
  // wxs 可以轻松上述解决问题。
//记住  在properties和data 中定义的数据 都会被小程序中整合到一个数据对象中去，比如在data中可以访问index
// 数据，在properties中也可以访问到year数据；所以千万不要在data和properties中定义相同变量，properties会
// 覆盖data中的变量。
  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    _index: '',
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  },

  /**
   * 组件的方法列表
   */
  attached: function() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },
  methods: {
  }
})
