//拦截文件
 
import axios from 'axios';
//创建一个实例
const instance = axios.create({
    baseURL: '/api',
    //请求延时为3000毫秒
    timeout: 3 * 1000,
})
 
// 拦截器 请求拦截
instance.interceptors.request.use(config =>{ 
    //配置项  携带的数据(部分接口需要拿到token)
    let token = localStorage.getItem('token');
    //如果有token 就把token的值给配置文件的headers中
    if( token ){
        console.log("token登陆成功")
        // config.headers.token = token;
        //如果token有其他的名字 如：a-token
        config.headers = {
            "a-token": token
        }
    }
    return config;
}, err =>{
    return Promise.reject(err);
});
 
//拦截器 响应拦截
// instance.interceptors.response.use(res =>{
//     return res;
// }, err =>{
//     return Promise.reject(err);
// });
instance.interceptors.response.use(res =>{
    return res;
}, function(err){
    console.log(err.response.data)
    switch (err.response.status){
        case 403:
        Toast({
            message: '拒绝访问',
            position: 'top',
            duration: 2000
        });
        break
        case 500:  //可以使用其他的提示框架，根据环境使用，MessageBox弹窗可执行promise操作，使在点击确定后执行某些操作
        if(data.message=='Token失效，请重新登录'){
            Toast({    
            message: '登录已过期，请重新登录',
            position: 'top',
            duration: 2000
            });
        }
        break
        case 404:
        Toast({
            message: '很抱歉，资源未找到',
            position: 'top',
            duration: 2000
        });
        break
        case 504:
        Toast({
            message: '网络超时',
            position: 'top',
            duration: 2000
        });
        break
        case 401:
        Toast({
            message: '未授权，请重新登录',
            position: 'top',
            duration: 2000
        });
    }
    return Promise.reject(err);
});
//整体导出
export default instance;