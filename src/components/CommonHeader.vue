<template>
    <header>
        <div class="l-content">
<router-link to="/login">login</router-link>
            <button type="button" @click="logout">logout</button>
        </div>
        <div class="r-content"></div>
    </header>
</template>

<script>
    export default {
        name: "CommonHeader",
        methods:{
            logout:function(){
                this.$confirm('此操作将退出登陆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 注销处理
                    this.postRequest('/logout')
                    // 清除 session 缓存
                    window.sessionStorage.removeItem("tokenStr")
                    // 跳转到登录页
                    this.$router.replace('/login');
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消'
                    });
                });

            }
        }
    }
</script>

<style scoped>
    header{
        background-color: #fff;
        #height: 200px;
    }
</style>