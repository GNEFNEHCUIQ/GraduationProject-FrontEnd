<template>
    <div class="articleContent">

        <el-row class="articleCard" :gutter="20">
            <el-col>
                <el-card>
                    <div class="articleBox">
                        <div class="title"><h1>{{articleDetail.title}}</h1></div>
                        <div class="infoBox">
                            <div class="info sort">分类：{{articleDetail.sort}}</div>
                            <div class="info author">作者：{{articleDetail.author}}</div>
                            <div class="info creation_date">{{articleDetail.creation_time}}</div>
                        </div>
                        <br />
                        <div class="content">
                            <!--{{articleDetail.content}}-->
                            <span v-html="articleDetail.content"></span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ArticleContent",
        data() {
            return {
                article_id: this.$route.params.id,
                articleDetail: []
            }
        },
        mounted() {
            this.initContent()
        },
        methods: {
            initContent: function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params: {
                        article_id: this.article_id
                    },
                    method: 'get',
                    url: '/article/basic/findArticleById',
                    dataType: "json"
                }).then((res) => {
                    if (res != null) {
                        console.log("res : " + JSON.stringify(res))
                        console.log("res.data : " + JSON.stringify(res.data))
                        this.articleDetail=res.data
                        console.log("res.data.data : " + JSON.stringify(res.data.content))
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .articleCard{
        display: flex;

    }
    .articleBox{
        width: 80vw;
        margin: 5vh auto;
    }
.title{
    text-align:center;
    font-size:30px;
}
    .info{
        display:inline
    }
    .sort{
        float: left;
        text-align:left
    }
    .author{
        position: relative;
        left: 42vw;
    }
    .creation_date{
        float: right;
        text-align:right;
    }
    .content{
        font-size:24px;
        width: 75vw;

        /*border: 1px solid #000;*/

        margin: auto;
    }
</style>