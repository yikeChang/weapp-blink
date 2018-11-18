// page/classic/classic.js
// import {HTTP} from '../../util/http.js'
// let http = new HTTP
 
import {ClassicModel} from '../../models/classic.js'
let classicModel = new ClassicModel()

import {LikeModel} from '../../models/like.js'
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
  //封装后的方法请求数据  
    classicModel.getLatest(res=>{
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })

    

    // 以下是调用数据方式，用models进行再次封装。
    // http.request({
    //   url: 'classic/latest',
    //   success: (res)=> {
    //     console.log(res)
    //   }
    // })


    // wx.request({})可以在这里面请求服务器数据,但是这个结果在小程序中是异步的,在小程序中
    // 使用回调函数->success 来使用数据,其中res可以用任意的参数来代替。
    // let that = this  
    // wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header: {
    //     appkey: "AbhC31IG7ruCDp57"
    //   },
    //   //success 这个回调函数的缺点，this指向问题,在es6出现之前先定义that变量，指向this,
    //   // 最后调用使用that代替this。
    //   // success: function(res) {
    //   //   console.log(that.data.test)
    //   //   console.log(res)
    //   // }
    //   success: (res)=> {
    //        console.log(this.data.test)
    //        console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage")

  },

  //自定义点赞事件
  onLike: function(event) {
      console.log(event)
      let behavior = event.detail.behavior
      likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  onPrevious(event) {
    this._updateClassic('previous')
  },

  onNext(event) {
    this._updateClassic('next')
  },

  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      console.log(res)
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function (artID, categroy) {
    likeModel.getClassicLikeStatus(artID, categroy, (res)=> {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})

 

  
