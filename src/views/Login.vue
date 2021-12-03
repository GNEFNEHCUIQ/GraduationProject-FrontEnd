<template>
    <div class="login">
        <form>
            user_id：<input type="text" id="user_id" name="user_id" v-model="user_id" placeholder="请输入user_id">
            密码：<input type="password" id="password" v-model="password" name="password" placeholder="请输入密码">
            <button id="login" type="button" @click="login">提交</button>
        </form>
        <p>user_id is: {{ user_id }}</p>
        <p>password is: {{ password }}</p>
        <br>
        <router-link to="index"><button>index(homepage)</button></router-link>
        <br>
        <router-link to="allTeamMember"><button>allTeamMember</button></router-link>
        <br>
        <button type="button" @click="findAllArticleWithPage">get</button>
        <router-link to="AllArticle"><button>AllArticle</button></router-link>
        <button @click="alertFunction">global_</button>
        <router-link to="Register"><button>Register</button></router-link>
        <button @click="delArticle">del</button>
        <router-link to="UserInfo"><button>UserInfo</button></router-link>
        <router-link to="blank"><button>blank</button></router-link>
    </div>
</template>

<script>


    export default {
        name: "Login",
        data:function(){
            return{
                user_id: null,
                password: '',
            }
        },
        mounted() {
        },
        methods:{

            login:function () {
                if(this.user_id==''||this.password=='') {
                    alert('user_id或密码不能为空')
                }else{
                    this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method:'POST',
                        url:'/doLogin',
                        params:{
                            user_id: this.user_id,
                            password: this.password,
                        }
                    }).then((res)=>{
                        console.log(res)
                        console.log(res.data)
                        alert(res.data.msg)
                        this.$router.replace('/home')
                        //location.href='/home';
                    }).catch((err)=>{
                        console.log(err)
                        alert(err)
                    })

                }
            },
            findAllArticleWithPage:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method:'POST',
                    url:'/article/findAllArticleWithPage',
                    params:{
                        pageNum: 1,
                        pageSize: 5
                    }
                }).then((res)=>{
                    console.log(res)
                    console.log(res.data)
                    console.log(res.data[0])
                    //this.$router.replace('/home')
                    //location.href='/home';
                }).catch((err)=>{
                    console.log(err)
                    alert(err)
                })
            },
            alertFunction:function () {
                    console.log(this.global._recentlyArticlePageSize)
            },
            delArticle:function () {
                this.axios.post('/article/delArticle', 6,{
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"  //头部信息
                    }
                })
                    .then(function(res) {
                        console.log(res)
                        console.log(res.data)
                        this.userInfoList=res.data
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        },



    }
</script>

<style scoped>

</style>