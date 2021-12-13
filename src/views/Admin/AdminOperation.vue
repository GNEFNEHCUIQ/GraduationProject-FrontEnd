<template>
    <div class="AdminOperation">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="入队申请管理" name="opReviewCreateTeam"><opReviewCreateTeam /></el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import opReviewCreateTeam from '../../components/operation/opReviewCreateTeam'
    export default {
        name: "AdminOperation",

        data() {
            return {
                activeName: 'opReviewCreateTeam'
            };
        },
        components:{
            opReviewCreateTeam
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