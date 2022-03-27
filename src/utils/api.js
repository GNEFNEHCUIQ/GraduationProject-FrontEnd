import axios from 'axios'
import { Message } from "element-ui";
import router from '../router'
//import {json} from "express";

axios.interceptors.request.use(config => {
    //判断如果存在token，请求携带这个token
    //console.log("window.sessionStorage.getItem('tokenStr'):"+window.sessionStorage.getItem('tokenStr'))
    if (window.sessionStorage.getItem('tokenStr')) {
        //让被拦截的请求携带token，放在请求体 Authorization 中
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error => {
    console.log("携带config的拦截器error："+error);
})

axios.interceptors.response.use(success=>{
    if (success.status && success.status == 200){
        if (success.data.flag != 200) {
            Message.error({message:JSON.stringify(success.data.message)});
            console.log("拦截器结果2："+JSON.stringify(success.data.flag))
            console.log("拦截器结果3："+JSON.stringify(success))
            return;
        }
        if (success.data.message){
            Message.success({message:success.data.message});
        }
    }
    return success.data
}),error=>{
    if (error.response.code==504 ||error.response.code==504 ) {
        Message.error({message:'服务器异常'})
    }else if (error.response.code==401){
        Message.error({message:'尚未登录，请登录'})
        router.replace('/')
    }else {
        //如果以上的错误都不是，打印出这个错误信息
        if (error.response.data.message) {//判断打印的信息是否存在，如果存在的话就打印
            Message.error({message: error.response.data.message});
        } else {//错误信息都没有，未知的错误
            Message.error({message: '服务器挂了，未知的错误'})
        }
    }
    return null;
}

let base = '';//如果不加就为空，需要加就吧要加的路径在这里写上

export const postRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 post 方法
        method: 'post',
        //请求路径
        url: `${base}${url}`,
        //数据
        headers: {
            "Content-Type": "application/json;charset=utf-8"  //头部信息
        },
        dataType: "json",
        data: params
    })
}
export const getRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 post 方法
        method: 'get',
        //请求路径
        url: `${base}${url}`,
        //数据
        headers: {
            "Content-Type": "application/json;charset=utf-8"  //头部信息
        },
        dataType: "json",
        data: params
    })
}
export const putRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 post 方法
        method: 'PUT',
        //请求路径
        url: `${base}${url}`,
        //数据
        headers: {
            "Content-Type": "application/json;charset=utf-8"  //头部信息
        },
        dataType: "json",
        data: params
    })
}
export const deleteRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 post 方法
        method: 'delete',
        //请求路径
        url: `${base}${url}`,
        //数据
        headers: {
            "Content-Type": "application/json;charset=utf-8"  //头部信息
        },
        dataType: "json",
        data: params
    })
}