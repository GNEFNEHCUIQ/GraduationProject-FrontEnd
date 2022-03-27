import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'

import AllArticle from "../views/Article/AllArticle"

import TeamMain from '../views/Team/TeamMain.vue'
import AllTeamMember from '../views/Team/AllTeamMember.vue'
import AddArticle from "../views/Article/AddArticle";
import Register from "../views/Register";
import UserInfo from "../views/User/UserInfo";
import blank from "../views/blank";

import ArticleContent from "../views/Article/ArticleContent"

import TeamManaging from '../views/Team/TeamManaging.vue'
import TeamItemDetail from '../views/Team/TeamItemDetail.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/blank',
        name: 'blank',
        component: blank
    },
  {
        path: '/login',
        name: 'Login',
        component: Login,
        hidden:true
  },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        hidden:true
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        children:[
            {
                path:'/home',
                name:'Home',
                component:()=>import("../views/Home/Home"),
            },
            {
                path:'/article/basic/articleContent/:id',
                name:'article/basic/articleContent',
                component: ArticleContent
            },
            {
                path:'/userInfo',
                name:'UserInfo',
                component:UserInfo
            },
            {
                path:'/team/manage/teamManaging/:id',
                name:'team/manage/teamManaging',
                component: TeamManaging
            },
            {
                path:'/team/item/itemDetail/:id',
                name:'team/item/itemDetail',
                component: TeamItemDetail
            },
        ]
    },



    {
        path: '/allArticle',
        name: 'AllArticle',
        component: AllArticle,
        children:[
            {
                path: '/teamMain',
                name: 'TeamMain',
                component: TeamMain
            },
            {
                path: '/allTeamMember',
                name: 'AllTeamMember',
                component: AllTeamMember
            }
        ]
    },
    {
        path: '/addArticle',
        name: 'AddArticle',
        component: AddArticle,
        children:[
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/userInfo',
                name: 'UserInfo',
                component: UserInfo
            }
        ]
    }

  /*,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/
]



const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
