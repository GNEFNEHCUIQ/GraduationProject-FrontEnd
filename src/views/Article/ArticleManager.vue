<template>
    <div class="ArticleManager">
        <el-row>
            <el-col>
                <el-card>
                    <div class="articleManage">
                        <div class="head" style="height: 100px">
                            <el-button type="success" round @click="handleAddArticle">添加文章</el-button>
                        </div>
                        <div class="contentTable">
                            <el-table
                                    :data="articleList"
                                    style="width: 100%">
                                <el-table-column prop="article_id" label="编号" width="100"></el-table-column>
                                <el-table-column prop="title" label="标题" width="450"></el-table-column>
                                <el-table-column prop="sort" label="分类" width="150"></el-table-column>
                                <el-table-column prop="user_name" label="作者" width="200"></el-table-column>
                                <el-table-column prop="creation_time" label="日期" width="200"></el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="warning"
                                                icon="el-icon-edit"
                                                circle
                                                @click="handleEditArticle(scope.$index, scope.row)"></el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                icon="el-icon-delete"
                                                circle
                                                @click="deleteArticle(scope.$index, scope.row)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total:="this.pageForm.totalSize"
                                    :page-count="this.pageForm.totalPages"
                                    @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!--增加文章的模态框-->
        <el-dialog
                class="model"
                :visible.sync="addArticleFromVisible"
                title="添加文章"
                :width="dialogWidth"
                center>
            <el-form
                    :label-position="labelPosition"
                    :model="addArticleFrom"
                    ref="createDemandForm"
                    label-width="90px"
                    class="dialogForm"
            >
                <el-form-item label="标题" prop="title">
                    <el-input type="text" :rows="2" v-model="addArticleFrom.title"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="addArticleFrom.sort" placeholder="请选择分类">
                        <el-option label="通知公告" value="通知公告"></el-option>
                        <el-option label="比赛事项" value="比赛事项"></el-option>
                        <el-option label="创新教育" value="创新教育"></el-option>
                        <el-option label="政策相关" value="政策相关"></el-option>
                        <el-option label="其他咨询" value="其他资讯"></el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="内容"  prop="content">
                        <!--<el-input type="text" :rows="2" v-model="addArticleFrom.content"></el-input>-->

                        <richText ref="addRichText" />
                    </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addArticleFromVisible = false">取消</el-button>
                <el-button type="primary" @click="addArtcle() ">确定</el-button>
            </div>
        </el-dialog>


        <!--修改文章的模态框-->

        <el-dialog
                class="model"
                :visible.sync="editArticleFromVisible"
                title="修改文章"
                :width="dialogWidth"
                center>
            <el-form
                    v-model="labelPosition"
                    :model="editArticleFrom"
                    ref="createDemandForm"
                    label-width="90px"
                    class="dialogForm"
            >
                <el-form-item label="标题" prop="title">
                    <el-input type="text" :rows="2" v-model="editArticleFrom.title"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="editArticleFrom.sort" placeholder="请选择分类">
                        <el-option label="通知公告" value="通知公告"></el-option>
                        <el-option label="比赛事项" value="比赛事项"></el-option>
                        <el-option label="创新教育" value="创新教育"></el-option>
                        <el-option label="政策相关" value="政策相关"></el-option>
                        <el-option label="其他咨询" value="其他资讯"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容"  prop="content">
                    <!--<el-input type="text" :rows="2" v-model="addArticleFrom.content"></el-input>-->
                    <richText ref="editRichText" />
                </el-form-item>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editArticleFromVisible = false">取消</el-button>
                    <el-button type="primary" @click="editArticle() ">确定</el-button>
                </div>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import richText from '../../components/richText'

    export default {
        name: "ArticleManager",
        components:{
            richText
        },
        data(){
            return{
                dialogWidth:'65%',
                labelPosition:'top',

                addArticleFromVisible:false,
                addArticleFrom:{
                    title:'',
                    sort:'',
                    content:''
                },

                editArticleFromVisible:false,
                editArticleFrom:{
                    article_id:0,
                    title:'',
                    sort:'',
                    content:'',
                    author:0
                },

                articleList:[],
                searchForm:{
                    searchTitle:''
                },
                // 分页插件
                pageForm: {
                    pageNum: 1, // 当前的页码
                    totalSize: 0, // 总条目数
                    totalPages: 0,  // 总页数
                }
            }
        },
        mounted() {
            this.findAllArticleWithPage()
        },
        methods:{
            findAllArticleWithPage:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        pageNum:this.pageForm.pageNum,
                        pageSize: this.global._allArticlePageSize
                    },
                    method:'get',
                    url:'/article/basic/findAllArticleWithPage',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        console.log("res.data.data : "+JSON.stringify(res.data.content))
                        this.articleList=res.data.content
                        this.pageForm.pageNum=res.data.pageNum
                        this.pageForm.totalSize=res.data.totalSize
                        this.pageForm.totalPages=res.data.totalPages
                        console.log("this.pageForm:"+JSON.stringify(this.pageForm))
                        console.log("articleList : "+JSON.stringify(this.articleList))
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            addArtcle:function () {
                /*alert("title:"+this.addArticleFrom.title)
                alert("sort:"+this.addArticleFrom.sort)
                alert("content:"+this.$refs.addRichText.content)*/
                /*this.axios.post("/admin/operation/addArticle",{
                    title:this.addArticleFrom.title,
                    sort:this.addArticleFrom.sort,
                    content:this.$refs.addRichText.content
                }).then(res=>{

                })*/
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        title:this.addArticleFrom.title,
                        sort:this.addArticleFrom.sort,
                        content:this.$refs.addRichText.content
                    },
                    method:'POST',
                    url:'/admin/operation/addArticle',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        location.reload();
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            editArticle:function () {
                alert("title:"+this.addArticleFrom.title)
                alert("sort:"+this.addArticleFrom.sort)
                alert("content:"+this.$refs.editRichText.content)
            },
            deleteArticle:function () {

            },
            handleAddArticle:function(){
                this.addArticleFromVisible=true
            },
            handleEditArticle:function(){
                this.editArticleFromVisible=true
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
    .dialogForm{
        width: 800px;
        height:80vh;
        margin-left:50px;
    }

</style>