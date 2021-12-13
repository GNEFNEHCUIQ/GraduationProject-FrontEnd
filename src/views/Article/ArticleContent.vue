<template>
    <div class="articleContent">

        <el-row class="articleBox" :gutter="24">
            <el-col>
                <el-card>
                    <div class="title"><h1>{{articleDetail.title}}</h1></div>
                    <div class="infoBox">
                        <div class="info sort">{{articleDetail.sort}}</div>
                        <div class="info author">{{articleDetail.author}}</div>
                        <div class="info creation_date">{{articleDetail.creation_time}}</div>
                    </div>
                    <div class="content">{{articleDetail.content}}</div>
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

</style>