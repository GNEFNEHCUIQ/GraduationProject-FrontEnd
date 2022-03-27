<template>
    <div id="rci">
        <el-row>
            <el-col>
                <el-card>
                    <div class="reviewCT">
                        <el-table
                                :data="unreviewCIA"
                                style="width: 100%">
                            <el-table-column prop="review_id" label="编号" width="50">
                            </el-table-column>
                            <el-table-column prop="applicant_team_id" label="队伍编号" width="250">
                            </el-table-column>
                            <el-table-column prop="item_name" label="项目名" width="200">
                            </el-table-column>
                            <el-table-column prop="item_describe" label="项目描述" width="350">
                            </el-table-column>
                            <el-table-column prop="teacher_id" label="教师id" width="350">
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
        name: "opReviewCreateItem",
        data(){
            return{
                unreviewCIA:[]
            }
        },
        mounted() {
            this.getUnreviewedCI()
        },
        methods:{
            getUnreviewedCI:function () {
                this.axios.get('/admin/operation/findUnreviewedCIA')
                    .then(res=>{
                        console.log("CI res.data:"+JSON.stringify(res.data))
                        this.unreviewCIA=res.data
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
                        h_approved:approved
                    },
                    method:'PUT',
                    url:'/admin/operation/reviewCIA',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        this.getUnreviewedCI()
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