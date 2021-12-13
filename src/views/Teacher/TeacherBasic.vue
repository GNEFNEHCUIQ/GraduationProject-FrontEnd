<template>
    <div class="TeacherBasic">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未审申请" name="unreviewedCTA"><unreviewedCTA /></el-tab-pane>
            <el-tab-pane label="所有申请" name="allCTA"><allCTA /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import unreviewedCTA from "../../components/teacher/unreviewedCTA"
    import allCTA from "../../components/teacher/allCTA"

    export default {
        name: "TeacherBasic",
        components:{
            unreviewedCTA,
            allCTA
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