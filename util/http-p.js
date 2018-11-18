import {
    config
} from '../config.js'
const tips = {
    1: '抱歉，出现了服务器错误',
    1005: 'appkey无效，请申请正确的appkey',
    3000: '期刊不存在'
}
class HTTP {
    // 对象的解构赋值
    
    request( {url, data={}, method='GET'} ) {
         return  new Promise((resolve, reject)=>{
             this._request(url, resolve, reject, data, method)
         })
    }


    _request(url, resolve, reject, data={}, method='GET') {
        //params中携带url,data,method,但是注意下，params中携带的参数url只是末端需要和配置文件相加
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                const code = res.statusCode.toString()
                //es6中的两个新增方法，startWith endsWith  以.开头结尾,
                //res.statusCode结果是一个数字而非字符串，需要toString()转换下
                if (code.startsWith('2')) {
                    //调用 params下面的 success回调函数 然后把res 传递进去

                    // if(params.success)  因为如果不传递success回调函数，则会报错。
                    // params.success(res.data) // 判定params.success 是否存在success回调函数
                    resolve(res.data)
                    //如果左边为false，右面不执行，只有左面为true，右面才执行。
                } else {
                    //错误处理
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                reject()
                this._show_error(1)
            }
        })
    }
    //定义_开头的私有变量，不要在类外调用它
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip?tip:tips[1],
            icon: "none",
            deration: 2000
        })
    }
}
export {
    HTTP
}