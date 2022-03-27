<template>
    <div class="TeamManage">
        <el-row >
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>我管理的队伍</span>
                    </div>
                        <el-table
                                :data="myTeamList"
                                style="width: 100%">
                            <el-table-column
                                    prop="team_name"
                                    label="队名"
                                    width="180">
                                <template slot-scope="scope">
                                    <router-link :to="{name:'team/manage/teamManaging',params:{id:scope.row.team_id}}">{{scope.row.team_name}}</router-link>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="category"
                                    label="分类"
                                    width="180">
                            </el-table-column>
                        </el-table>
                </el-card>

            </el-col>

            <el-col :span="12">
                <el-card >
                    <div slot="header" class="clearfix">
                        <span>入队申请</span>
                    </div>
                    <div>
                        <el-table
                                :data="JoinTeamReview"a
                                style="width: 100%">
                            <el-table-column
                                    prop="applicant_id"
                                    label="申请人Id"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="team_id"
                                    label="队伍Id"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="165">
                                <template slot-scope="scope">

                                    <el-button
                                            size="mini"
                                            type="success"
                                            icon="el-icon-check"
                                            circle
                                            @click="handleJoinTeam(scope.row.review_id,1)"></el-button>
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            icon="el-icon-close"
                                            circle
                                            @click="handleJoinTeam(scope.row.review_id,-1)"></el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "TeamOpera",
        data(){
            return{
                myTeamList:[],
                JoinTeamReview:[]
            }
        },
        mounted() {
            this.getMyTeamList()
            this.getJoinTeamReview()
        },
        methods:{
            getMyTeamList:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/team/basic/getYourTeam',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        /*console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))*/
                        this.myTeamList = res.data
                        /*console.log("this.myTeamList : "+JSON.stringify(this.myTeamList))*/

                    }
                }).catch((err)=>{
                    console.log(err)
                })

            },
            getJoinTeamReview:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/team/manage/getJoinTeamReview',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.JoinTeamReview=res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            handleJoinTeam:function (review_id,t_approved) {
                alert("review_id:"+JSON.stringify(review_id)+",t_approved:"+JSON.stringify(t_approved))
                /*this.putRequest('/team/manage/reviewJoinTeamAppl',{
                    review_id:review_id,
                    t_approved:t_approved
                }).then(res=>{

                })*/
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        review_id:review_id,
                        t_approved:t_approved
                    },
                    method:'PUT',
                    url:'/team/manage/reviewJoinTeamAppl',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        location.reload();
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>