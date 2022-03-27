<template>
    <div class="TeacherBasic">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="未审入队申请" name="unreviewedCTA"><unreviewedCTA /></el-tab-pane>
            <el-tab-pane label="所有入队申请" name="allCTA"><allCTA /></el-tab-pane>
            <el-tab-pane label="未审项目申请" name="unreviwedCIA"><unreviwedCIA /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import unreviewedCTA from "../../components/teacher/unreviewedCTA"
    import allCTA from "../../components/teacher/allCTA"
    import unreviwedCIA from "../../components/teacher/unreviwedCIA"

    export default {
        name: "TeacherBasic",
        components:{
            unreviewedCTA,
            allCTA,
            unreviwedCIA
        },
        data(){
            return{
                activeName: 'unreviewedCTA'
            }
        },

        mounted() {
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>