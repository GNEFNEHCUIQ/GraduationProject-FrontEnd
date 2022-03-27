<template>
    <div class="AdminOperation">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="创建队伍申请" name="opReviewCreateTeam"><opReviewCreateTeam /></el-tab-pane>
            <el-tab-pane label="创建项目申请" name="opReviewCreateItem"><opReviewCreateItem /></el-tab-pane>
            <el-tab-pane label="验证教师身份" name="opCertifyTeacher"><opCertifyTeacher /></el-tab-pane>
            <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    import opReviewCreateTeam from '../../components/operation/opReviewCreateTeam'
    import opReviewCreateItem from '../../components/operation/opReviewCreateItem'
    import opCertifyTeacher from '../../components/operation/opCertifyTeacher'



    export default {
        name: "AdminOperation",

        data() {
            return {
                activeName: 'opReviewCreateTeam'
            };
        },
        components:{
            opReviewCreateTeam,
            opReviewCreateItem,
            opCertifyTeacher
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>