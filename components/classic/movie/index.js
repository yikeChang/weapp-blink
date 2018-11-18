// components/classic/movie/index.js
import {classicBehavior} from '../classic-beh.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  //导入共有数据后，image和content可以隐藏。
  // behaviors 实际是多继承，如果有多个继承的父类，后面的覆盖前面的数据（如properties,data,methods等）。
  // 但是对于类似attached等组件生命周期函数，小程序会一次的执行，并不会覆盖。

  properties: {
    // image: String,
    // content: String
  },

  attached: function() {

  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
