<template>
    <div class="AllArticle">
        <div class="MemberList" v-for="v of articleList">
            <div class="memberId">{{v.title}}</div>
            <div class="userId">{{v.author}}</div>
            <div class="teamId">{{v.creationTime}}</div>
        </div>
        <div class="pager" v-if="count>pageSize">
            <Pager :totalSize="count" :pageSize="pageSize" :pageNumber="pageNum" v-model="pageNum"></Pager>
        </div>
    </div>
    <!--<button type="button" @click="findAllArticleWithPage">findAllArticleWithPage</button>-->
</template>

<script>
    import Pager from "@/components/pager";

    export default {
        name: "AllArticle",
        components: {
            Pager
        },
        data(){
            return{
                articleList:[],
                count:0,
                pageNum:1,
                pageSize:5,
            }
        },

        watch:{
            pageNum(){
                this.findAllArticleWithPage()
            }
        },
        mounted() {
            this.findAllArticleWithPage()
        },
        methods:{
            findAllArticleWithPage:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    dataType: "json",
                    method:'POST',
                    url:'/article/findAllArticleWithPage',
                    params:{
                        pageNum: this.pageNum,
                        pageSize: this.global._recentlyArticlePageSize
                    }
                }).then((res)=>{
                    console.log("res : "+res)
                    console.log("res.data : "+res.data.data)
                    console.log("res.data.data : "+res.data.data)
                    this.articleList=res.data.content
                    this.count=res.data.totalSize
                    this.pageNum=res.data.pageNum
                    this.pageSize=res.data.pageSize
                    console.log("this.articleList : "+this.articleList)
                    console.log("this.count : "+this.count)
                    console.log("this.pageNum : "+this.pageNum)
                    console.log("this.pageSize : "+this.pageSize)

                    /*let response=res.data
                    this.articleList=response*/
                    console.log("articleList : "+this.articleList)
                    //this.$router.replace('/home')
                    //location.href='/home';
                }).catch((err)=>{
                    console.log(err)
                    alert(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>