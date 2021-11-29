<template>
    <div class="login">
        <form>
            uid：<input type="text" id="uid" name="uid" v-model="uid" placeholder="请输入uid">
            密码：<input type="password" id="password" v-model="password" name="password" placeholder="请输入密码">
            <button id="login" type="button" @click="login">提交</button>
        </form>
        <p>uid is: {{ uid }}</p>
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
    </div>
</template>

<script>


    export default {
        name: "Login",
        data:function(){
            return{
                uid: null,
                password: '',
            }
        },
        mounted() {
        },
        methods:{

            login:function () {
                if(this.uid==''||this.password=='') {
                    alert('uid或密码不能为空')
                }else{
                    this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method:'POST',
                        url:'/user/doLogin',
                        params:{
                            uid: this.uid,
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
            }
        },



    }
</script>

<style scoped>

</style>