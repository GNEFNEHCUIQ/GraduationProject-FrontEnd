<template>
    <div class="unreviwedCIA">
        <el-row>
            <el-col>
                <el-card>
                    <div class="reviewCT">
                        <el-table
                                :data="unreviewCIA"
                                style="width: 100%">
                            <el-table-column prop="review_id" label="编号" width="50">
                            </el-table-column>
                            <el-table-column prop="item_name" label="项目名" width="250">
                            </el-table-column>
                            <el-table-column prop="applicant_team_id" label="申请队伍" width="150">
                            </el-table-column>
                            <el-table-column prop="item_describe" label="描述" width="350">
                            </el-table-column>
                            <el-table-column prop="creation_time" label="创建时间" width="350">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200">
                                <template slot-scope="scope">
                                    <el-button @click="approved(scope.row.review_id,1)" type="success" round size="small">接受</el-button>
                                    <el-button @click="approved(scope.row.review_id,-1)" type="danger" round size="small">拒绝</el-button>
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
        name: "unreviwedCIA",
        data(){
            return{
                unreviewCIA:[]
            }
        },
        mounted() {
            this.getUnreviewedCIA()
        },
        methods:{
            getUnreviewedCIA:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/teacher/basic/getUnreviewedCIA',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.unreviewCIA = res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            approved:function (review_id,approved) {
                /*alert("req:"+JSON.stringify(review_id)+"app"+approved)*/
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        review_id:review_id,
                        t_approved:approved
                    },
                    method:'PUT',
                    url:'/teacher/basic/reviewTeacherCIA',
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