<template>
    <div class="ArticleBasic">
        <el-row class="headBox" :gutter="24">
            <el-col :span="24">
                <el-card>
                    <div class="head left">

                    </div>
                    <div class="head right">
                        <el-form ref="searchForm" :inline="true" :model="searchForm">
                            <el-form-item label="搜索文章">
                                <el-input id="searchText" v-model="searchForm.searchTitle"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="head under"></div>
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-card>
                    <div class="articleContainer">
                        <el-table
                                :data="articleList"
                                style="width: 100%">
                            <el-table-column prop="title" label="标题" width="350">
                                <template slot-scope="scope">
                                    <router-link :to="{name:'article/basic/articleContent',params:{id:scope.row.article_id}}">{{scope.row.title}}</router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sort" label="分类" width="350">
                            </el-table-column>
                            <el-table-column prop="author" label="作者" width="350">
                            </el-table-column>
                            <el-table-column prop="creation_time" label="时间" width="350">
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
                </el-card>
            </el-col>
        </el-row>
        <!--<el-button @click="findAllArticleWithPage">findAllArticleWithPage</el-button>-->
    </div>
</template>

<script>
    export default {
        name: "ArticleBasic",
        data() {
            return {
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
        mounted(){
            this.findAllArticleWithPage()
        },
        methods: {
            search: function () {
                console.log("this.searchForm.searchTitle:"+this.searchForm.searchTitle)
                if (this.searchForm.searchTitle!='' && this.searchForm.searchTitle!=null){
                    this.axios({
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        params:{
                            pageNum:this.pageForm.pageNum,
                            pageSize: this.global._recentlyArticlePageSize,
                            title:this.searchForm.searchTitle
                        },
                        method:'get',
                        url:'/article/basic/searchArticle',
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
                } else {
                    this.$message.error("不能为空")
                }
            },
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
            toContent:function(article_id){
                this.$router.push({
                    name:"/article/basic/articleContent/",
                    params: {
                        content:article_id
                    }
            });
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
    .ArticleBasic{
        height: 100%;
        width: 100%;
        border: 1px solid;
        padding: 0;
        margin:0;
    }
    .headBox{
        border: 1px solid #00f;
        padding: 0;
        margin: 0 auto;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
        border: 1px solid #0f0;
        height: 6vh;
    }
    .under{
        border: 1px solid #ff0;
    }
    .articleContainer{
        border: 1px solid #f00;
    }
</style>