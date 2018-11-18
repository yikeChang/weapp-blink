import {
  KeywordModel
} from '../../models/keywords.js'
const keywordModel = new KeywordModel()
import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
import {
  paginationBev
} from '../behaviors/pagination.js'
Component({
  /**
   * 组件的属性列表
   */

  behaviors: [paginationBev],
  properties: {
    cMore: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据  记住 如果wxml中存在{{}}所需的变量，必须用this.setData({}),来更新数据
   * 如果只是在js 中使用可以用this.data.变量 = 新值改变变量。
   * 
   */
  data: {
    historyWords: [],
    hotWords: [],
    finished: false,
    q: '',
    loadingCenter: false,
    hiddenLike: false
  },

  attached() {
    //简化代码
    // let historyWords = keywordModel.getHistory()
    // let hotWords = keywordModel.getHot()

    this.setData({
      // historyWords
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //observer的实际方法
   
    loadMore() {
      if (!this.data.q) {
        return
      }
      //加上一把load锁，值为 false 所以可以加载数据 执行bookModel
      if (this.isLocked()) {
        return
      }
      //传入的值就是dataArray数组的长度
      // const length = this.data.dataArray.length

      if (this.hasMore()) {
        // 把锁锁住 防止频繁调用加载数据 当值为true时候 再次执行_loadMore()时候会卡在62代码那里
        this.locked()
        // this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          console.log(res.books)
          console.log('bug')
          // const tempArray = this.data.dataArray.concat(res.books)
          // this.setData({
          //   dataArray: tempArray
          // })
          this.setMoreData(res.books)
          this.unLocked()
          // this.data.loading = false
          //继续解锁 
        }, () => {
          // 失败了也要解锁，防止死锁。
          this.unLocked()
        })
      }
    },

    onTap(event) {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
      this._showResult()
    },

    onDelete() {
      this.initialize()
      console.log('删除')
      this._closeResult()
    },

    onConfirm(event) {
      let words = event.detail.value || event.detail.text
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      this.setData({
        q: words
      })
      bookModel.search(0, words).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(words)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        finished: true
      })
    },
    _closeResult() {
      this.setData({
        finished: false,
        q: ''
      })
    }
  }
})