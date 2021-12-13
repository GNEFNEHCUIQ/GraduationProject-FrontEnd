<template>
    <div class="TeamManaging">
        <el-row >
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>团队信息</span>
                    </div>
                    <div class="info">
                        团队名：{{teamInfo.team_name}},category:{{teamInfo.category}},teacher:{{teamInfo.teacher_id}},leader:{{teamInfo.leader_id}},describe:{{teamInfo.taem_describe}}
                        <!--<el-form
                                inline="true"
                                :model="teamInfo"
                                ref="dataForm"
                                label-position="left"
                                label-width="90px"
                                style="width: 400px; margin-left:50px;"
                        >
                            &lt;!&ndash;<el-form-item label="教师名" prop="teacherRealName">
                                <el-input v-model="createTeamForm.teacherRealName" />
                            </el-form-item>&ndash;&gt;
                            <el-form-item label="团队描述" prop="teamDescribe">
                                <el-input type="textarea"  v-model="teamInfo.teamDescribe"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="button">
                            <el-button>取消</el-button>
                            <el-button type="primary" @click="createTeam() ">确定</el-button>
                        </div>-->
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-card>
                    <el-table
                            :data="teamItemList"
                            height="250"
                            style="width: 100%">
                        <el-table-column
                                prop="item_name"
                                label="项目名"
                                width="360">
                            <template slot-scope="scope">
                            <router-link :to="{name:'team/item/itemDetail',params:{id:scope.row.item_id}}">{{scope.row.item_name}}</router-link>
                        </template>
                        </el-table-column>


                        <el-table-column
                                prop="item_status"
                                label="项目情况"
                                width="110">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    teammate
                </el-card>
            </el-col>
        </el-row>
        <div class="float-button" @click="handleCreate">
            <i class="el-icon-circle-plus-outline"></i>
        </div>

        <el-dialog :visible.sync="dialogFormVisible">

            <el-form
                    :model="createItemForm"
                    title="创建项目"
                    ref="dataForm"
                    label-position="left"
                    label-width="90px"
                    style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="项目名：" prop="team_name">
                    <el-input type="text" :rows="2" v-model="createItemForm.item_name"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="teamDescribe">
                    <el-input type="textarea"  v-model="createItemForm.item_describe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="createItem() ">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "TeamManaging",
        data(){
            return{
                dialogFormVisible:false,
                team_id: this.$route.params.id,
                teamInfo:[],
                teamItemList:[],
                teammateList:[],
                createItemForm:{
                    item_name:'',
                    item_describe:''
                }
            }
        },
        mounted() {
            this.getTeamInfo()
            this.getTeamItem()
            this.getTeammate()
        },
        methods:{
            getTeamInfo:function(){
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        team_id:this.team_id
                    },
                    method:'get',
                    url:'/team/basic/getTeamInfoByTeamId',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.teamInfo=res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getTeamItem:function(){
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        team_id:this.team_id
                    },
                    method:'get',
                    url:'/team/basic/findItemByTeamId',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.teamItemList=res.data
                        console.log("this.teamItemList : "+JSON.stringify(this.teamItemList))
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getTeammate:function(){
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        team_id:this.team_id
                    },
                    method:'get',
                    url:'/team/basic/findTeamMember',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        /*console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))*/
                        this.teammateList=res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            handleCreate:function () {
                this.dialogFormVisible = true
            },
            createItem:function () {
                console.log(JSON.stringify(this.createTeamForm))
                alert("this.createItemForm.item_name:"+this.createItemForm.item_name+"item_describe:this.createItemForm.item_describe:"+this.createItemForm.item_describe)
                return
                if (this.createItemForm.item_name!='' && this.createItemForm.item_describe!='' ){
                    this.axios({
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        params:{
                            applicant_team_id:this.team_id,
                            item_name:this.createItemForm.item_name,
                            item_describe:this.createItemForm.item_describe
                        },
                        method:'POST',
                        url:'applyToCreateItem',
                        dataType:"json"
                    }).then((res)=>{
                        if (res!=null) {
                            console.log("res : "+JSON.stringify(res))
                            console.log("res.data : "+JSON.stringify(res.data))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                } else {
                    this.$message.error("不能为空")
                }
            }
        }
    }
</script>

<style scoped>
    .el-card{
        height: 40vh;
    }
    .float-button{
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        position: fixed;
        height: 90px;
        width: 40px;
        bottom: 90px;
        right: 50px;
    }
</style>