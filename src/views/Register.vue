<template>
    <div class="register">
        <form action="">
            name: <input type="text" v-model="name" placeholder="4~16">
            password: <input type="password" v-model="pwd" placeholder="4~16">
            <button type="button" @click="register">register</button>
            <br>
            name:{{ name }}
            pwd:{{ pwd }}
        </form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                name:"",
                pwd:"",

            }
        },
        methods:{
            register:function () {
                let userTemp=JSON.stringify({
                    name: this.name,
                    password: this.pwd,
                })
                let patten= /^[a-zA-Z0-9_-]{4,16}$/
                if (!patten.test(this.name)){
                    alert("要4~16名字")
                } else if (!patten.test(this.pwd)) {
                    alert("要4~16密码")
                }else{
                    /*this.axios({
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        dataType:"text",
                        charset:"utf-8",
                        method:'POST',
                        url:'/user/doRegister',
                        params:{
                            user
                        }
                    }).then((res)=>{
                        console.log(res)
                        console.log(res.data)
                        alert(res.data.msg)
                        //this.$router.replace('/home')
                        //location.href='/home';
                    }).catch((err)=>{
                        console.log(err)
                        alert(err)
                    })*/
                    this.axios.post('/doRegister', userTemp,{
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"  //头部信息
                        }
                    })
                        .then(function(response) {
                            alert(response.data[0].message)
                        })
                        .catch(function(error) {
                            console.log(error);
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>