let paginationBev = Behavior({
  properties: {

  },
  data: {
    start: 0,
    count: 20,
    dataArray: [],
    empty: false,
    ending: false,
    total: null,
    loading: false
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if (this.data.total == 0) {
        this.setData({
          empty: true
        })
      }
    },

    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        console.log(this.data.total)
        return false
      } else {
        return true
      }
    },
    initialize() {
      this.setData({
        dataArray: [],
        empty: false,
        loading: false
      })
      this.data.total = null
    },

    isLocked() {
      this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})


export {
  paginationBev
}