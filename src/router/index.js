import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/HomePage.vue'
import Index from "../views/IndexPage/Index.vue"

import AllArticle from "../views/ArticlePage/AllArticle"

import TeamMain from '../views/TeamPage/TeamMain.vue'
import AllTeamMember from '../views/TeamPage/AllTeamMember.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
    {
        path: '/teamMain',
        name: 'TeamMain',
        component: TeamMain
    },
    {
        path: '/allTeamMember',
        name: 'AllTeamMember',
        component: AllTeamMember
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/allArticle',
        name: 'AllArticle',
        component: AllArticle
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
