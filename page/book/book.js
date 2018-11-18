import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
import {
  random
} from '../../util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    fMore: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then(res => {
        console.log(res)
        this.setData({
          books: res
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    console.log(1)
    this.setData({
      searching: false
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //触摸底部 触发此函数但是只是在 page页面才能使用
  onReachBottom() {
    this.setData({
      fMore: random(16)
    })
  }
})