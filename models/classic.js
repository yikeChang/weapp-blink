import {HTTP} from '../util/http.js'
//因为classicModels也是类,所以可以采用继承方式来继承HTTP。
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res)=> {
                sCallback(res)
                console.log(res)
                // 缓存期刊号
                this._setLatestIndex(res.index)

                let key = this._getKey(res.index)
                wx.setStorageSync(key,res)
            }
        })
    }
    
    // getPrevious(index, sCallback) {
    //     this.request({
    //         url:'classic/' + index + '/previous',
    //         success: (res)=> {
    //             sCallback(res)
    //         }
    //     })
    // }

    //函数重构 将 getPrevious 和 getNext 提取成getClassic函数。

    getClassic(index, nextOrPrevious, sCallback) {
    // 添加缓存机制，如果缓存中有数据则在缓存中获取数据，如果没有，则向服务器发送API请求，
    // 同时将请求的数据写入。首先确定key，定义一个私有方法，用来产生key。
    //获取Key, 但是切记key在getClassic中index是next 或者 previous，需要进行判断。
        let key = nextOrPrevious == 'next' ? this._getKey(index+1) :this._getKey(index-1)
        
        let classic = wx.getStorageSync(key)
        if(!classic) {
            this.request({
                url: 'classic/' + index +'/' + nextOrPrevious,
                success: (res)=> {
                    // 设置缓存
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res)  //将数据回调回去
                }
            })
        }
        else {
            sCallback(classic) //将缓存数据回调出去 classic 里面存的就是数据对象。
        }
    }
    
    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex== index ? true : false
    }

    //用小程序的storage同步缓存最新期刊号，异步把sync的s去掉。
    // wx.setStorageSync({key,value})

    _setLatestIndex(index) {
        wx.setStorageSync('latest',index)
    }

    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index) {
        let key = 'classic-' + index
        return key 
    }
}

export {ClassicModel}