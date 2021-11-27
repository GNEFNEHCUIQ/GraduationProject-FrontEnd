<template>
    <div class="AllTeamMember">
        <div class="MemberList" v-for="v of memberList">
            <div class="memberId">{{v.memberId}}</div>
            <div class="userId">{{v.userId}}</div>
            <div class="teamId">{{v.userId}}</div>
            <div class="role">{{v.role}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AllTeamMember",
        data(){
            return{
                memberList:[],
                //count:0,
                //pageIndex:1,
                //pageSize:5,
                //searchList:[],
                //searchVal:''
            }
        },
        watch:{

        },
        mounted() {
            this.findAllTeamMember()
        },
        methods:{
            findAllTeamMember:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    dataType: "json",
                    method:'GET',
                    url:'/team/findAllTeamMember',
                }).then((res)=>{
                    console.log("res : "+res)
                    console.log("res.data : "+res.data.data)
                    console.log("res.data.msg : "+res.data.msg)
                    let response=res.data
                    this.memberList=response
                    console.log("memberList : "+this.memberList)
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