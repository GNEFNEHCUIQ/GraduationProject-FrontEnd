<template>
    <div class="AllTeamMember">
        <div class="MemberList" v-for="v of memberList">
            <div class="memberId">{{v.memberId}}</div>
            <div class="userId">{{v.userId}}</div>
            <div class="teamId">{{v.userId}}</div>
            <div class="role">{{v.role}}</div>
        </div>
        <div class="pager" v-if="count>pageSize">
            <Pager :totalSizes="count" :pageSize="pageSize" v-model="pageNum"></Pager>
        </div>
    </div>



</template>

<script>
    import pager from "@/components/pager";

    export default {
        name: "AllTeamMember",
        components : {
            pager
        },
        data(){
            return{
                memberList:[],
                count:0,
                pageNum:1,
                pageSize:5,
                //searchList:[],
                //searchVal:''
            }
        },
        watch:{

        },
        mounted() {
            this.findAllTeamMember()
            this.getArticlePageCount()
        },
        methods:{
            findAllTeamMember:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    dataType: "json",
                    params:{
                        pageNum
                    },
                    method:'GET',
                    url:'/team/findAllTeamMember',
                }).then((res)=>{
                    console.log("pageNum : "+pageNum)
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
            },
            getArticlePageCount:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method:'GET',
                    url:'/team/getArticlePageCount',
                }).then((res)=>{
                    console.log("res : "+res)
                    console.log("res.data : "+res.data.data)
                    console.log("res.data.msg : "+res.data.msg)
                    //let response=res.data
                    this.count=res.data[0].totalSizes
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