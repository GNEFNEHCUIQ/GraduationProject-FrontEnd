<template>
    <div class="userInfo">
        <div class="userInfoBox" v-for="v of userInfoList">
            <div class="info resumeId">resumeId : {{v.resumeId}}</div>
            <div class="info user_id">userId : {{v.user.userId}}</div>
            <div class="info username">user.name : {{v.user.name}}</div>
            <div class="info password">user.password : {{v.user.password}}</div>
            <div class="info real_name">realName : {{v.realName}}</div>
            <div class="info age">birthday : {{v.birthday}}</div>
            <div class="info gender">gender : {{v.gender}}</div>
            <div class="info phone">phone : {{v.phone}}</div>
            <div class="info education">education : {{v.education}}</div>
            <div class="info school">school : {{v.school}}</div>
            <div class="info experience">experience : {{v.experience}}</div>
            <div class="info self_assessment">selfAssessment : {{v.selfAssessment}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data(){
            return{
                userId:1,  //没做验证时拿出来用的 临时变量 以后要修改
                userInfoList:[
                    {
                        resumeId: 0,
                        userId: 0,
                        realName: '',
                        gender: '',
                        birthday: '',
                        phone: '',
                        school: '',
                        education: '',
                        experience: '',
                        selfAssessment: '',
                         user: {
                             userId: 0,
                             password: "",
                             name: "",
                             role: 0
                         },
                        password: "",
                        role: 0,
                        name: ""
                    }
                ]
            }
        },
        mounted() {
            this.getUserInfo()
        },
        methods:{
            getUserInfo:function () {
                /*this.axios.post('/user/getUserInfoByUserId', this.uid,{
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
                    })*/
                this.axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method:'POST',
                    url:'/user/getUserInfoByUserId',
                    params:{
                        userId:1
                    }
                }).then((res)=>{
                    console.log(res)
                    console.log(res.data)
                    console.log(res.data[0])
                    //this.userInfoList.resumeId=res.data.data[0].resumeId
                    this.userInfoList=res.data.data
                    console.log("this.userInfoList : "+this.userInfoList)
                    //console.log("this.userInfoList.data : "+res.data.data[0].resumeId)
                    //this.$router.replace('/home')
                    //location.href='/home';
                }).catch((err)=>{
                    console.log(err)
                    alert(err)
                })

            }
        }
    }
</script>

<style scoped>

</style>