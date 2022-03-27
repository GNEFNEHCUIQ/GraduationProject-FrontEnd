<template>
    <div class="TeamBasic">
        <el-row :gutter="10">
            <el-col :span="10">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>我所在的队伍</span>
                    </div>
                    <el-table
                            :data="yourTeamList"
                            height="250"
                            style="width: 100%">
                        <el-table-column
                                prop="team_name"
                                label="队伍名"
                                width="360">
                            <template slot-scope="scope">
                                <router-link :to="{name:'team/manage/teamManaging',params:{id:scope.row.team_id}}">{{scope.row.team_name}}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="category"
                                label="分类"
                                width="110">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>所有队伍项目</span>
                    </div>
                    <el-table
                            :data="yourItemList"
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
                                label="状况"
                                width="110">
                        </el-table-column>
                    </el-table>

                </el-card>
            </el-col>
        </el-row>

<!--        <div class="float-button" @click="handleCreate">-->
<!--            <i class="el-icon-circle-plus-outline"></i>-->
<!--        </div>-->

<!--        <el-dialog :visible.sync="dialogFormVisible">-->
<!--            <el-form-->
<!--                    :model="createTeamForm"-->
<!--                    ref="dataForm"-->
<!--                    label-position="left"-->
<!--                    label-width="90px"-->
<!--                    style="width: 400px; margin-left:50px;"-->
<!--            >-->
<!--                <el-form-item label="队伍名：" prop="team_name">-->
<!--                    <el-input type="text" :rows="2" v-model="createTeamForm.team_name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="分类">-->
<!--                    <el-select-->
<!--                            v-model="createTeamForm.category"-->
<!--                            class="filter-item"-->
<!--                            placeholder="选择分类"-->
<!--                    >-->
<!--                        <el-option-->
<!--                                v-for="item in categoryList"-->
<!--                                :key="item.key"-->
<!--                                :label="item.label"-->
<!--                                :value="item.key"-->
<!--                        />-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="教师名" prop="teacherRealName">-->
<!--                    <el-input v-model="createTeamForm.teacherRealName" />-->
<!--                </el-form-item>-->
<!--                    <el-form-item label="团队描述" prop="teamDescribe">-->
<!--                        <el-input type="textarea"  v-model="createTeamForm.teamDescribe"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogFormVisible = false">取消</el-button>-->
<!--                <el-button type="primary" @click="createTeam() ">确定</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->

    </div>

</template>

<script>
    export default {
        name: "TeamBasic",
        data(){
            return{
                /*dialogFormVisible:false,
                createTeamForm:{
                    team_name:'',
                    category:'',
                    teacherRealName:'',
                    teamDescribe:''
                },
                categoryList:[
                    { label: "计算机", key: "IT" },
                    { label: "新媒体", key: "NewMedia" },
                    { label: "物联网", key: "IOT" },
                    { label: "自动化", key: "automation" },
                    { label: "游戏", key: "game" },
                    { label: "金融", key: "financial" },
                    { label: "其他", key: "others" },
                ],*/
                yourTeamList:[],
                yourItemList:[]
            }
        },
        mounted() {
            this.getYourTeam()
            this.getYourItem()
        },
        methods:{
            getYourTeam:function () {
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
                        console.log("res.data : "+JSON.stringify(res.data))
                        console.log("res.data.data : "+JSON.stringify(res.data.content))*/
                        this.yourTeamList = res.data
                        /*console.log("yourTeamList : "+JSON.stringify(this.yourTeamList))*/
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getYourItem:function(){
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/team/item/basic/getYourItem',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.yourItemList=res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }/*,
            handleCreate:function () {
                this.dialogFormVisible = true
            },
            createTeam:function () {
                console.log(JSON.stringify(this.createTeamForm))
                if (this.createTeamForm.team_name!='' &&this.createTeamForm.category!='' &&this.createTeamForm.teacherRealName!='' && this.createTeamForm.teamDescribe!='' ){
                    this.axios({
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        params:{
                            team_name:this.createTeamForm.team_name,
                            category:this.createTeamForm.category,
                            teacherRealName:this.createTeamForm.teacherRealName,
                            teamDescribe:this.createTeamForm.teamDescribe
                        },
                        method:'POST',
                        url:'/team/basic/applyToCreateATeam',
                        dataType:"json"
                    }).then((res)=>{
                        if (res!=null) {
                            console.log("res : "+JSON.stringify(res))
                            console.log("res.data : "+JSON.stringify(res.data))
                            location.reload();
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                } else {
                    this.$message.error("不能为空")
                }
            }*/
        }
    }
</script>

<style scoped>
    .float-button{
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        position: fixed;
        height: 40px;
        width: 40px;
        bottom: 90px;
        right: 50px;
    }
</style>