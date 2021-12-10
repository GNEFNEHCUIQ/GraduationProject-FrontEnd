<template>
    <div class="register">
        <!--<form action="">
            name: <input type="text" v-model="name" placeholder="4~16">
            password: <input type="password" v-model="pwd" placeholder="4~16">
            <button type="button" @click="register">register</button>
            <br>
        </form>-->
        <el-form ref="user" :model="user" label-width="80px" class="RegisterContainer">
            <router-link id="toLogin" to="/"><el-link  target="_blank"><-返回登录</el-link></router-link>
            <h3 class="RegisterTitle">注册账号</h3>
            <el-form-item label="用户名">
                <el-input type="text" v-model="user.user_name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="user.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <div class="buttonBox">
                <div class="loginBox">
                    <el-button id="loginBtn" type="success" @click="register" style="width: 100%">注册</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                user:{
                    user_name:"",
                    password:"",
                }

            }
        },
        methods:{
            register:function () {
                let patten= /^[a-zA-Z0-9_-]{4,16}$/
                if (!patten.test(this.user.user_name)){
                    this.$message.error("要4~16名字")
                } else if (!patten.test(this.user.password)) {
                    this.$message.error("要4~16密码")
                }else{

                    this.axios.post('/register', this.user,{
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"  //头部信息
                        }
                    }).then((response) => {
                            this.$router.replace('/login')
                        }).catch(function(error) {
                            console.log(error);
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .RegisterContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .RegisterTitle {
        margin: 0px auto 40px auto;
        text-align: center;
    }
    #toLogin{
        left: -1vw;
    }
</style>