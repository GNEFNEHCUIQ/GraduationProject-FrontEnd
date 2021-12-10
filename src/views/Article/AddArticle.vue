<template>
    <div class="addArticle">
        <form action="">
            <div class="form-group">
            <label class="form-group">title:</label>
                <input type="text" v-model="title" class="form-control" id="title"  placeholder="请输入文章标题">
            </div>
            <div class="select">
                　　<select  v-on:change="indexSelect($event)">
                　　　　<option v-for="(item,key) in sortIndex" v-bind:value="item.indexId" :key="key">{{item.indexId}}{{item.name}}</option>
                　　</select>
            </div>
            <input type="textarea" v-model="content" placeholder="请输入文章内容">
            <button type="button" @click="addArticle">addArticle</button>
        </form>


    </div>
</template>

<script>
    export default {
        name: "AddArticle",
        data(){
            return{
                title:'',
                sortId:1,
                sort:'',
                content:'',
                sortIndex: [{
                    "indexId":1,
                    "name": "通知公告"
                }, {
                    "indexId":2,
                    "name": "创新教育"
                }, {
                    "indexId":3,
                    "name": "比赛事项"
                }, {
                    "indexId":4,
                    "name": "相关新闻"
                }]
            }
        },
        methods:{
            addArticle:function(){
                console.log("title:"+this.title)
                console.log("sort:"+this.sort)
                console.log("content:"+this.content)
                if (null==this.title || ''==this.title){
                    alert("title不能为空")
                }else if (null==this.content || ''==this.content) {
                    alert("content不能为空")
                }else{
                    this.axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method:'POST',
                        url:'/article/addArticle',
                        params:{
                            title: this.title,
                            sort:this.sortIndex[this.sortId-1].name,
                            content: this.content,
                        }
                    }).then((res)=>{
                        console.log(res)
                        console.log(res.data)
                        alert(res.data.msg)
                        //this.$router.replace('/home')
                        //location.href='/home';
                    }).catch((err)=>{
                        console.log(err)
                        alert(err)
                    })
                }

            },

            indexSelect(event){
                this.sortId=event.target.value
                console.log(this.sortId)

                console.log(this.sortIndex[this.sortId-1].name)
            }
        }
    }
</script>

<style scoped>

</style>