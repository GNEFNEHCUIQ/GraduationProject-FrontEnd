<template>
    <div class="login">
        <form>
            uid：<input type="text" id="uid" name="uid" v-model="uid" placeholder="请输入uid">
            密码：<input type="password" id="password" v-model="password" name="password" placeholder="请输入密码">
            <button id="login" type="button" @click="login">提交</button>
        </form>
        <p>uid is: {{ uid }}</p>
        <p>password is: {{ password }}</p>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data:function(){
            return{
                uid: null,
                password: ''
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
            }
        },



    }
</script>

<style scoped>

</style>