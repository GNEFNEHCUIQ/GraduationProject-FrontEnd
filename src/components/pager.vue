<template>
    <div class="pager">
        <ul class="p">
            <li :class="{disabled:pageNum===1}" @click="pageNum=1">|<</li>
            <li :class="{disabled:pageNum===1}" @click="pageNum--"><<</li>
            <li
                    class="item"
                    v-for="item in pageCount"
                    @click="pageNum=item"
                    :class="{active:pageNum===item}"
            >
                item:{{item}}
            </li>
            <li :class="{disabled:pageNum===pageCount}" @click="pageNum++">>></li>
            <li :class="{disabled:pageNum===pageCount}" @click="pageNum=pageCount">|></li>
        </ul>
        item:
    </div>
</template>

<script>
    export default {
        name: "pager",
        props:{
            totalSize:{
                type:Number,
                required:true
            },
            pageNumber:{
                type:Number,
                required:true
            } ,
            pageSize:{
                type:Number,
                required:true
            }
        },
        data(){
            return{
                pageNum:this.pageNumber
            }
        },
        computed:{
            pageCount(){
                return Math.ceil(this.totalSize/this.pageSize)
            }
        },
        watch:{
            pageNum(val){
                if (val<1) this.pageNum=1;
                else if(val>this.pageCount) this.pageNum=this.pageCount;
                this.$emit('input',val)
            }
        }
    }
</script>

<style scoped>
    /*.pager{
        width: 1188px;
        margin: 0 auto;
    }
    .p{
        float: right;
        margin: 0 40px 0 0;
    }
    .p a{

        text-decoration: none;
    }
    .p li{
        line-height: 53px;
        list-style: none;
        width: 1188px;
        display:inline;
        padding: 5px 10px 5px;
        border: 1px solid #ccc;
        border-radius:5px;
        margin:0 3px 0;
    }
    .p li.disabled{
        color: #ccc;
    }
    .p li:not(.disabled):hover{
        background-color: #bbb;
    }
    .p li.active{
        background-color: #ddd;
    }*/
</style>