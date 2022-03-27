<template>
    <div id="opCertifyTeacher">
        <el-row>
            <el-col>
                <el-card>
                    <div class="reviewCT">
                        <el-table
                                :data="unreviewCATA"
                                style="width: 100%">
                            <el-table-column prop="review_id" label="编号" width="50">
                            </el-table-column>
                            <el-table-column prop="applicant_id" label="申请人" width="250">
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
        name: "opCertifyTeacher",
        data(){
            return{
                unreviewCATA:[]
            }
        },
        mounted() {
            this.getUnreviewCATA()
        },
        methods:{
            getUnreviewCATA:function () {
                this.axios.get('/admin/operation/findUnreviewedCATA')
                    .then(res=>{
                        console.log("getUnreviewCATA:"+JSON.stringify(res.data))
                        this.unreviewCATA=res.data
                    })
            }
        }
    }
</script>

<style scoped>

</style>