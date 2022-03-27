<template>
    <div class="login">
        <!--<form>
            user_id：<input type="text" id="user_id" name="user_id" v-model="user_id" placeholder="请输入user_id">
            密码：<input type="password" id="password" v-model="password" name="password" placeholder="请输入密码">
            <button id="login" type="button" @click="login">提交</button>
        </form>-->
        <el-form ref="user" :model="user" label-width="80px" class="loginContainer">
            <h3 class="loginTitle">登录系统</h3>
            <el-form-item label="用户名">
                <el-input type="text" v-model="user.user_name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="user.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <!--<el-form-item label="验证码">
                <el-input type="text" v-model="form.code" placeholder="点击图片更换验证码"></el-input>
            </el-form-item>
            <img src="" alt="">-->
            <!--<el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>-->
            <div class="buttonBox">
                <div class="loginBox">
                    <el-button id="loginBtn" type="success" @click="login" style="width: 100%">登录</el-button>
                </div>

                <div class="regBox">
                    <router-link to="/register"><el-button id="registerBtn" type="primary" to='/register'style="width: 100%">注册</el-button></router-link>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>



    export default {
        name: "Login",
        data:function(){
            return{
                user: {
                    user_name:'',
                    password: ''
                },
                checked: true,
                code:''
            }
        },
        mounted() {
        },
        methods:{
            login:function () {
                if(this.user.user_name=='') {
                    this.$message.error('用户名不能为空');
                    //alert('user_id或密码不能为空')
                }else if (this.user.password==''){
                    this.$message.error('密码不能为空');
                } else{
                    /*this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=Utf-8'
                        },
                        method:'POST',
                        url:'/login',
                        dataType: "json",
                        params:{
                            user:{
                                user_name: this.form.user_name,
                                password: this.form.password
                            }
                        }
                    }).then((res)=>{
                        console.log(res)
                        console.log(res.data)
                        //alert(res.data.msg)
                        this.$router.replace('/home')
                        //location.href='/home';
                    }).catch((err)=>{
                        console.log(err)
                        //alert(err)
                        this.$message.error(err)
                    })*/
                    /*this.axios.post('/login', userTemp,{
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"  //头部信息
                        }
                    })
                        .then(function(response) {
                            alert(response.data.message)
                            that.$router.replace('/home')
                        })
                        .catch(function(error) {
                            console.log(error);
                        })*/
                    /*this.postRequest('/login',this.user).then(res=>{
                        //if (res)
                        if (res){
                            console.log("-------------------------------------------------------")
                            console.log("res:"+JSON.stringify(res))
                            console.log("res.data:"+JSON.stringify(res.data))
                            console.log("-------------------------------------------------------")
                            const tokenStr=res.data.tokenHead+res.data.token
                            window.sessionStorage.setItem("tokenStr",tokenStr)
                            console.log("-------------------------------------------------------")
                            console.log("tokenStr:"+JSON.stringify(tokenStr))
                            this.$router.replace('/index')
                        }
                    })*/
                    this.axios.post('/login', this.user,{
                        headers: {
                            "Content-Type": "application/json"  //头部信息
                        },
                        dataType:"json"
                    }).then( (response) => {
                        if (response) {
                            /*console.log("-------------------------------------------------------")
                            console.log("response:"+response[0])
                            console.log("json response:"+JSON.stringify(response[0]))
                            console.log("response.data:"+JSON.stringify(response.data))
                            console.log("-------------------------------------------------------")
                            const tokenStr=response.data.tokenHead+res.data.token
                            window.sessionStorage.setItem("tokenStr",tokenStr)
                            console.log("-------------------------------------------------------")
                            console.log("tokenStr:"+JSON.stringify(tokenStr))*/
                            console.log("response.data.tokenHead:"+response.data.tokenHead)
                            console.log("response.data.token:"+response.data.token)
                            const tokenStr = response.data.tokenHead + ' ' + response.data.token;
                            //将登录成功，拼接后的token存入全局，
                            window.sessionStorage.setItem('tokenStr', tokenStr);
                            this.$router.replace('/home')
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        })

                }
            }

        },



    }
</script>

<style scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle {
        margin: 0px auto 40px auto;
        text-align: center;
    }
    .buttonBox{
        #border: 1px solid;
    }
    
</style>