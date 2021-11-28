<template>
    <div id="index">
        <div class="banner"></div>
        <div class="recently" v-for="v of articlesList">
            <div class="aid">{{v.articleId}}</div>
            <div class="title">{{v.title}}</div>
            <div class="sort">{{v.sort}}</div>
            <div class="content">{{v.content}}</div>
            <div class="author">{{v.author}}</div>
            <div class="date">{{v.creationTime}}</div>
            <br>
        </div>
        <div class="news"></div>
        <div class="notice"></div>
        <div class="competition"></div>
        <div class="education"></div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                articlesList: [],
                newsList: [],
                noticeList: [],
                competitionList: [],
                educationList: []

                //count:0,
                //pageIndex:1,
                //pageSize:5,
            }
        },
            mounted(){
                this.getRecentArticle()
            },
            methods:{

                getRecentArticle:function () {
                    this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method:'GET',
                        url:'/article/findAllArticle',
                    }).then(res=>{
                        /*console.log("res : "+res)
                        console.log("res.data : "+res.data.data)
                        console.log("res.data.msg : "+res.data.msg)*/
                        let response=res.data
                        this.articlesList=response/*
                        console.log("articlesList : "+this.articlesList)*/
                    })
                },

                getTotalCount:function () {
                    this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method:'GET',
                        url:"/article/getArticlePageCount"
                    }).then(res=>{
                        let response=res.data
                        this.count=res.data.totalCount
                    })
                }

            },
            

    }
</script>

<style scoped>

</style>