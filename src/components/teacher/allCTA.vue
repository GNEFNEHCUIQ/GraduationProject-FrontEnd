<template>
    <div class="allCTA">
        <el-row>
            <el-col>
                <el-card>
                    <div class="reviewCT">
                        <el-table
                                :data="allreviewCTA"
                                style="width: 100%">
                            <el-table-column prop="review_id" label="编号" width="50">
                            </el-table-column>
                            <el-table-column prop="team_name" label="队伍名" width="250">
                            </el-table-column>
                            <el-table-column prop="applicant_id" label="申请人" width="150">
                            </el-table-column>
                            <el-table-column prop="team_describe" label="描述" width="350">
                            </el-table-column>
                            <el-table-column prop="creation_time" label="创建时间" width="350">
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
        name: "allCTA",
        data(){
            return{
                allreviewCTA:[]
            }
        },
        mounted() {
            this.getAllReviewCT()
        },
        methods:{
            getAllReviewCT:function () {
                //alert("getReviewCreateTeam")
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/teacher/basic/findATeachersAllCTA',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        /*console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))*/
                        this.allreviewCTA=res.data
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