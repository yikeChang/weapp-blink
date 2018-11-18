import {HTTP} from '../util/http-p.js'
class KeywordModel extends HTTP{
    key = 'q'
    maxLength = 10
    getHistory() {
        let words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
        //    return !words ? [] : words
    }
    addToHistory(keyword) {
        let words = this.getHistory()
        const has = words.includes(keyword)
        //判断words的长度，如果大于10,则删除末尾数，再添加新的数组。
        if (!has) {
            const length = words.length
            if (length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }

    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }
}

export {
    KeywordModel
}