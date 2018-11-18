//config公共配置参数

// 封装wx.request请求所需要的参数  使用export import 来让其他js使用config变量
// 可以用 export 需要导出的文件,也可以在最后写export{config, fun1, fun2},如果不想将
// config 变成 config1 使用as 即 export{ config as config1}
const config = {
    api_base_url: 'http://bl.7yue.pro/v1/',
    appkey: "AbhC31IG7ruCDp57"
}

export {config}