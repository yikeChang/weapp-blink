// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */

  //   组件属性properties 是对js的相关数据进行传递 
  //   slot 是对wxml 的相关数据进行传递 
  //   外部样式externalClass 对wxss 的相关数据进行传递 
  // slot wxml相关数据传递
  options: {
    multipleSlots: true
  },
  // 外部样式
  externalClasses: ['tag-class'],
  // 组件之间 js 的相关数据
  properties: {
    text: String
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
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})