<template>
    <div class="TeamManage">
        <el-row >
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>我的队伍</span>
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
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "TeamManage",
        data(){
            return{
                myTeamList:[]
            }
        },
        mounted() {
            this.getMyTeamList()
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
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.myTeamList = res.data
                        console.log("this.myTeamList : "+JSON.stringify(this.myTeamList))

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