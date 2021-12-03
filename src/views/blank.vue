<template>
    <div class="root">
        <table  border="1">
        <tr>
            <th>progress_id</th>
            <th>level</th>
            <th>parent_work_item_press_id</th>
        </tr>
            <tr>
    <div v-for="v of resultList">
        <td>{{v.progress_id}}</td>
        <td>{{v.level}}</td>
        <td>{{v.parent_work_item_press_id}}</td>
    </div>
            </tr>
        </table>

        <button type="button" @click="change">change</button>

        <br>
        <br>
        <br>
        <h1>sortList</h1>
        <br>
        <br>
        <table  border="1">
            <tr>
                <th>progress_id</th>
                <th>level</th>
                <th>parent_work_item_press_id</th>
            </tr>
            <tr>
                <div v-for="v of sortList">
                    <td>{{v.progress_id}}</td>
                    <td>{{v.level}}</td>
                    <td>{{v.parent_work_item_press_id}}</td>
                </div>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        name: "blank",
        data(){
            return{
                resultList:[
                    {
                        progress_id:1,
                        /*item_id:1,
                        title:'no.1',
                        principal:'1',
                        statue:1,*/
                        level:1,
                        parent_work_item_press_id:0
                    },
                    {
                        progress_id:2,
                        /*item_id:1,
                        title:'no.2',
                        principal:'1',
                        statue:1,*/
                        level:1,
                        parent_work_item_press_id:0
                    },
                    {
                        progress_id:3,
                        /*item_id:1,
                        title:'no.3',
                        principal:'1',
                        statue:1,*/
                        level:2,
                        parent_work_item_press_id:2
                    },
                    {
                        progress_id:4,
                        // item_id:1,
                        // title:'no.1',
                        // principal:'1',
                        // statue:1,
                         level:3,
                        parent_work_item_press_id:6
                    },
                    {
                        progress_id:5,
                        // item_id:1,
                        // title:'no.n',
                        // principal:'1',
                        // statue:1,
                         level:3,
                        parent_work_item_press_id:6
                    },
                    {
                        progress_id:6,
                        // item_id:1,
                        // title:'no.1',
                        // principal:'1',
                        // statue:1,
                         level:2,
                        parent_work_item_press_id:7
                    },
                    {
                        progress_id:7,
                        /*item_id:1,
                        title:'no.n',
                        principal:'1',
                        statue:1,*/
                        level:1,
                        parent_work_item_press_id:0
                    },
                    {
                        progress_id:8,
                        // item_id:1,
                        // title:'no.1',
                        // principal:'1',
                        // statue:1,
                         level:3,
                        parent_work_item_press_id:6
                    },
                    {
                        progress_id:9,
                        // item_id:1,
                        // title:'no.1',
                        // principal:'1',
                        // statue:1,
                         level:1,
                        parent_work_item_press_id:0
                    },
                    {
                        progress_id:10,
                        // item_id:1,
                        // title:'no.n',
                        // principal:'1',
                        // statue:1,
                         level:2,
                        parent_work_item_press_id:9
                    },
                    {
                        progress_id:11,
                        // item_id:1,
                        // title:'no.1',
                        // principal:'1',
                        // statue:1,
                         level:3,
                        parent_work_item_press_id:3
                    },
                    {
                        progress_id:12,
                        // item_id:1,
                        // title:'no.1',
                        // principal:'1',
                        // statue:1,
                         level:1,
                        parent_work_item_press_id:0
                    }

                ],
                sortList:[]
            }
        },
        mounted(){
            this.change()
        },
        methods:{
            change:function () {
                var list1=new Array();
                var list2=new Array();
                var list3=new Array();

                for (let i in this.resultList) {
                    //console.log(JSON.stringify(this.resultList[i].level))
                    if (this.resultList[i].level==1){
                        list1.push(this.resultList[i])
                    }else if (this.resultList[i].level==2) {
                        list2.push(this.resultList[i])
                    }else{
                        list3.push(this.resultList[i])
                    }
                }
                console.log("list1"+JSON.stringify(list1))
                console.log("list2"+JSON.stringify(list2))
                console.log("list3"+JSON.stringify(list3))

                console.log("------------------------------------------")

                let listII=new Array()
                //listII.push(JSON.stringify(list1[1]))

                //console.log("try"+listII)
                for (let i in list1){
                    listII[i]=new Array()
                    listII[i].push(list1[i])
                    //console.log("--listII["+i+"]:"+JSON.stringify(listII[i]))
                    for (let j in list2){
                        //let count=0
                        if (list2[j].parent_work_item_press_id==list1[i].progress_id)   {
                            listII[i].push(list2[j])
                        }
                        if (listII[i].length==1){
                            continue
                        } else{
                            for (let k in list3){
                                if (list3[k].parent_work_item_press_id==list2[j].progress_id && list2[j].parent_work_item_press_id==list1[i].progress_id) {//
                                    /*console.log("list3["+k+"].parent_work_item_press_id="+list3[k].parent_work_item_press_id)
                                    console.log("list2["+j+"].progress_id="+list2[j].progress_id)*/
                                    listII[i].push(list3[k])
                                }
                            }
                        }
                    }
                console.log("listII["+i+"]:"+JSON.stringify(listII[i]))
                }
                this.sortList=new Array()
                this.sortList=listII
            },
            outPut :function (num) {
                console.log("this.resultList:"+this.resultList)
                console.log("sortlist")
                
            }
        }
    }
</script>

<style scoped>

</style>