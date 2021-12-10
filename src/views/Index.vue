<template>
    <div class="HomePage">
            <el-container style="height: 100vh">
            <el-aside width="auto">
                <CommonSider></CommonSider>
            </el-aside>
            <el-container>
                <el-header style="height: 12vh;background-color: white"><common-header></common-header></el-header>
                <el-main>
                    <router-view :key="key" />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import CommonSider from "../components/CommonSider";
    import CommonHeader from "../components/CommonHeader";

    export default {
        name: "Index",
        components: {CommonHeader, CommonSider},
        methods:{

        },
        computed: {
            key(){
                return this.$route.fullPath
            }
        },
    }
</script>

<style scoped>

    .el-aside{
        height: 100vh;
        position: relative;
        background-color: #333;
    }
</style>