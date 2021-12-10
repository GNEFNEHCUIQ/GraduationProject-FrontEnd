import {getRequest} from "./api"
import axios from 'axios'

export const initMenu = (router,store)=>{
    /*if (store.state.routes.length>0){
        return
    }*/
    /*console.log("InitMenu1")*/
    /*getRequest('/menu/getMenu',null).then(data=>{
        console.log("InitMenu")
        if (data){
            let fmtRoutes=formatRoutes(data)
            router.addRoutes(fmtRoutes)
            store.commit('initRoutes',fmtRoutes)
        }
    })*/
    if (store.state.routes.length > 0) {
        /*console.log("null了吗")*/
        return null;
    }else if (store.state.routes.length==0) {
        /*console.log("前store.state.routes.length:"+store.state.routes.length)*/
            axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            dataType: "json",
            method:'get',
            url:'/menu/getMenu',
        }).then((res)=>{
            /*console.log("store.state.routes.length:"+store.state.routes.length)
            console.log("res : "+JSON.stringify(res))
            console.log("res.data : "+JSON.stringify(res.data))*/
            if (res){
                let fmtRoutes=formatRoutes(res.data)
                router.addRoutes(fmtRoutes)
                store.commit('initRoutes',fmtRoutes)
            }
        }).catch((err)=>{
            console.log(err)
            //alert(err)
        })
    }
}

export const formatRoutes=(router) =>{
    let fmtRoutes = []
    router.forEach(router=>{
        let {
            path,
            component,
            name,
            icon,
            children
        } = router
        if (children && children instanceof Array){
            children = formatRoutes(children)
        }
        let fmRouter = {
            path:path,
            name:name,
            icon:icon,
            children:children,
            component(resolve){
                if (component.startsWith('Index')) {
                require(['../views/' + component + '.vue'], resolve);
                }else if(component.startsWith('Team')){
                    require(['../views/Team/' + component + '.vue'], resolve);
                }else if(component.startsWith('Article')){
                    require(['../views/Article/' + component + '.vue'], resolve);
                }else if(component.startsWith('Admin')){
                    require(['../views/Admin/' + component + '.vue'], resolve);
                }else if(component.startsWith('Compete')){
                    require(['../views/Compete/' + component + '.vue'], resolve);
                }else if(component.startsWith('Teacher')){
                    require(['../views/Teacher/' + component + '.vue'], resolve);
                }
            }
        }
        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes
}