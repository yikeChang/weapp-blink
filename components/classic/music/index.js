// components/classic/music/music.js

import {classicBehavior} from '../classic-beh.js'
//实例音乐播放对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  
  properties: {
    src: String,
  },

  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    bgImgSrc: 'images/music@tag.png'
  },

  //组件的生命周期函数。 detached() ,页面销毁时候执行。

  
  /**
   * 组件的方法列表
   */
  methods: {
   onPlay() {
     if(!this.data.playing) {
       this.setData({
         playing: true
       })
       mMgr.src = this.properties.src
     }else {
       this.setData({
         playing: false
       })
       mMgr.pause()
     }
   },

   //编写私有改变状态方法
   _recoverStatus() {
     if(mMgr.paused) {
       this.setData({
         playing: false  
       })
       return 
     }

     if(mMgr.src== this.properties.src) {
       this.setData({
         playing: true
       })
     }
   },

   _monitorSwitch: function() {
     mMgr.onPlay(()=> {
       this._recoverStatus()
     })
     mMgr.onPause(()=> {
       this._recoverStatus()
     })
     mMgr.onStop(()=> {
       this._recoverStatus()
     })
     mMgr.onEnded(()=> {
       this._recoverStatus()
     })
   }
  }
})
