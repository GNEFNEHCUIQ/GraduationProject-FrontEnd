<template>
    <div class="articleContent">
        articleContent
        啥情况
        <button @click="this.initContent">mounted()</button>

        <el-row class="articleBox" :gutter="24">
            <el-col>
                <el-card>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ArticleContent",
        data(){
            return{
                article_id: this.$route.params.id
            }
        },
        mounted() {
            this.initContent()
        },
        methods:{
            initContent:function () {
                console.log("啥情况")
                console.log("article_id:"+this.article_id)
            }
        }
    }
</script>

<style scoped>

</style>