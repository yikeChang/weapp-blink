// components/classic/movie/index.js

//导入共有行为数据

import {classicBehavior} from '../classic-beh.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  //这个是共有的数据，behavior 带 s 因为可能有很多共有数据，可以向数组中添加。

  properties: {
  
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