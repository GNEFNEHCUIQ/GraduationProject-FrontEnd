<template>
    <div class="Team TeamFind">
        <el-row class="headBox" :gutter="24">
            <el-col :span="24">
                <el-card>
                    <div class="head left">

                    </div>
                    <div class="head right">
                        <el-form ref="searchForm" :inline="true" :model="searchForm">
                            <el-form-item label="搜索队伍">
                                <el-input id="searchText" v-model="searchForm.searchTeamName"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="search()">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row >

            <!--<el-col :span="6">
                <el-card style="height: 100%">category</el-card>
            </el-col>-->

            <el-col :span="24">
                <el-card>
                    <div class="articleContainer">
                        <el-table
                                :data="teamList"
                                style="width: 100%">
                            <!--<el-table-column prop="title" label="标题" width="350">
                                <template slot-scope="scope">
                                    &lt;!&ndash;<router-link :to="{name:'article/basic/articleContent',params:{id:scope.row.article_id}}">{{scope.row.title}}</router-link>&ndash;&gt;
                                </template>
                            </el-table-column>-->
                            <el-table-column prop="team_name" label="团队名称" width="350">
                                <template slot-scope="scope">
                                    <a href="#" @click="handleAdd(scope.row)">{{scope.row.team_name}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="category" label="分类" width="350">
                            </el-table-column>
                            <!--<el-table-column prop="creation_time" label="时间" width="350">
                            </el-table-column>-->
                            <!--来个队员人数 奖项数-->
                        </el-table>

                        <el-dialog
                                title="提示"
                                :visible.sync="teamInfoVisible"
                                width="30%">
                            <span>团队名：{{this.the_team.team_name}}</span><br>
                            <span>分类：{{this.the_team.category}}</span><br>
                            <span>教师：{{this.the_team.teacher_id}}</span><br>
                            <span>领队：{{this.the_team.leader_id}}</span><br>
                            <span>团队描述：{{this.the_team.team_describe}}</span><br>
                                <span slot="footer" class="dialog-footer">
                                <el-button @click="teamInfoVisible = false">取 消</el-button>
                                <el-button type="primary" @click="applyToJoinTeam()">确 定</el-button>
                            </span>
                        </el-dialog>

                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :total:="this.pageForm.totalSize"
                                :page-count="this.pageForm.totalPages"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div class="float-button" @click="handleCreateTeam">
            <i class="el-icon-circle-plus-outline"></i>
        </div>

        <el-dialog :visible.sync="createTeamFormVisible">
            <el-form
                    :model="createTeamForm"
                    ref="dataForm"
                    label-position="left"
                    label-width="90px"
                    style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="队伍名：" prop="team_name">
                    <el-input type="text" :rows="2" v-model="createTeamForm.team_name"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select
                            v-model="createTeamForm.category"
                            class="filter-item"
                            placeholder="选择分类"
                    >
                        <el-option
                                v-for="item in categoryList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="教师id" prop="teacherRealName">
                    <!--<el-input v-model="createTeamForm.teacherRealName" />-->
                    <el-select
                            v-model="createTeamForm.teacher_id"
                            class="filter-item"
                            placeholder="选择指导老师"
                    >
                        <el-option
                                v-for="item in teacherList"
                                :key="item.user_id"
                                :label="item.real_name"
                                :value="item.user_id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="团队描述" prop="teamDescribe">
                    <el-input type="textarea"  v-model="createTeamForm.teamDescribe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createTeamFormVisible = false">取消</el-button>
                <el-button type="primary" @click="createTeam() ">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "TeamFind",
        data(){
            return{
                searchForm:{
                    searchTeamName:'',
                },
                teamInfoVisible:false,
                createTeamFormVisible:false,
                teamList:[],
                the_team:[],
                createTeamForm:{
                    team_name:'',
                    category:'',
                    teacher_id:"",
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
                ],
                teacherList:[

                ],
                pageForm: {
                    pageNum: 1, // 当前的页码
                    totalSize: 0, // 总条目数
                    totalPages: 0,  // 总页数
                }
            }
        },
        mounted() {
            this.getTeamList()
            this.getTeacherList()
        },
        methods:{
            search:function(){
              this.$message.success("search")
            },
            getTeamList:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/team/basic/findAllTeam',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        console.log("res.data.data : "+JSON.stringify(res.data.content))
                        this.teamList = res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getTeacherList:function(){
                this.axios.get('/team/basic/getTeacherList').then(res=>{
                    console.log("res.data:"+JSON.stringify(res.data))
                    this.teacherList=res.data
                    console.log("this.teacherList:"+JSON.stringify(this.teacherList))
                })
            },
            handleAdd:function(team){
                this.the_team=team
                this.teamInfoVisible=true
            },
            handleCreateTeam:function(){
                this.createTeamFormVisible=true
            },
            applyToJoinTeam:function(){
                //alert(this.the_team.team_id)
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        team_id:this.the_team.team_id
                    },
                    method:'POST',
                    url:'/user/applyJoinTeam',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        /*console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))*/
                        this.$message.success("申请成功！正等待团队管理员审核！")
                        location.reload();
                    }
                }).catch((err)=>{
                    console.log(err)
                })
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
                            teamDescribe:this.createTeamForm.teamDescribe,
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
            },
            handleCurrentChange: function(currentPage){
                this.pageForm.pageNum = currentPage;
                console.log("第几页："+this.pageForm.pageNum)  //点击第几页
                this.findAllArticleWithPage()
            }

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