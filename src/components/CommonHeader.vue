<template>
    <header>
        <div class="l-content inline">
            <a href="#"><i class="el-icon-arrow-left" onClick="javascript :history.back(-1);"></i></a>
        </div>
        <div class="r-content inline">
            <el-button id="logoutBtn" type="primary" @click="logout">logout</el-button>
        </div>
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
                    /*store.state.routes=null*/
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

<style>
    /*header{
        background-color: #fff;
        height: 23vh;
    }*/

    .inline{
        display:inline
    }
    .l-content{
        position: relative;
        right: 0vw;
        top: 5vh;
    }
    #logoutBtn{
        position: relative;
        left: 85vw;
        top: 5vh;
    }
</style>