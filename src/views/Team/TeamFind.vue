<template>
    <div class="Team TeamFind">
        <button @click="getTeamList">getTeamList</button>
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
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row >

            <el-col :span="6">
                <el-card style="height: 100%">category</el-card>
            </el-col>

            <el-col :span="18">
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
                            </el-table-column>
                            <el-table-column prop="category" label="分类" width="350">
                            </el-table-column>
                            <!--<el-table-column prop="creation_time" label="时间" width="350">
                            </el-table-column>-->
                            <!--来个队员人数 奖项数-->
                        </el-table>
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
                teamList:[],
                pageForm: {
                    pageNum: 1, // 当前的页码
                    totalSize: 0, // 总条目数
                    totalPages: 0,  // 总页数
                }
            }
        },
        mounted() {
            this.getTeamList()
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
            handleCurrentChange: function(currentPage){
                this.pageForm.pageNum = currentPage;
                console.log("第几页："+this.pageForm.pageNum)  //点击第几页
                this.findAllArticleWithPage()
            }

        }
    }
</script>

<style scoped>

</style>