<template>
    <div class="login">
        <!--<form>
            user_id：<input type="text" id="user_id" name="user_id" v-model="user_id" placeholder="请输入user_id">
            密码：<input type="password" id="password" v-model="password" name="password" placeholder="请输入密码">
            <button id="login" type="button" @click="login">提交</button>
        </form>-->

        <el-form ref="form" :model="form" label-width="80px" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item label="用户名">
                <el-input type="text" v-model="form.user_name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input type="text" v-model="form.code" placeholder="点击图片更换验证码"></el-input>
            </el-form-item>
            <img src="" alt="">
            <el-button type="primary" @click="login">登录</el-button>
        </el-form>
    </div>
</template>

<script>


    export default {
        name: "Login",
        data:function(){
            return{

                form: {
                    user_name:'',
                    password: '',
                    code:''
                }
            }
        },
        mounted() {
        },
        methods:{
            login:function () {
                if(this.form.user_name=='') {
                    this.$message.error('用户名不能为空');
                    //alert('user_id或密码不能为空')
                }else if (this.form.password==''){
                    this.$message.error('密码不能为空');
                } else{
                    this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method:'POST',
                        url:'/doLogin',
                        params:{
                            user_name: this.user_name,
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
</style>