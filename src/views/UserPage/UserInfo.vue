<template>
    <div class="userInfo">
        <div class="userInfoBox" v-for="v of userInfoList">
            <div class="info user_id">{{v.user_id}}</div>
            <div class="info username">{{v.username}}</div>
            <div class="info password">{{v.password}}</div>
            <div class="info real_name">{{v.real_name}}</div>
            <div class="info age">{{v.age}}</div>
            <div class="info gender">{{v.gender}}</div>
            <div class="info education">{{v.education}}</div>
            <div class="info school">{{v.school}}</div>
            <div class="info experience">{{v.experience}}</div>
            <div class="info self_assessment">{{v.self_assessment}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data(){
            return{
                uid:1,  //没做验证时拿出来用的 临时变量 以后要修改
                userInfoList:[]
            }
        },
        mounted() {
        },
        methods:{
            getUserInfo:function () {
                this.axios.post('/user/getUserInfoByUid', uid,{
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
        }
    }
</script>

<style scoped>

</style>