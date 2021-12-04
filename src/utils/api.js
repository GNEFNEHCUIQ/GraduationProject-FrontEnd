import axios from 'axios'
import { Message } from "element-ui";
import router from './router'

axios.interceptors.response.use(sucess=>{
    if (sucess.status && sucess.status == 200){
        if (sucess.data.flag != 1) {
            Message.error({message:sucess.data});
            return;
        }
        if (sucess.data.message){
            Message.success({message:sucess.data.message});
        }
    }
    return;sucess.data
}),error=>{
    if (error.response.code==504 ||error.response.code==504 ) {
        Message.error({message:'服务器异常'})
    }else if (error.response.code==401){
        Message.error({message:'尚未登录，请登录'})
        router.replace('/')
    }
}