<template>
    <div class="homeMain">
        <el-row :gutter="5">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="labal">banner</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="labal">你最近做的项目的进度</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="labal">notice</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="labal">优秀团队</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="labal">近期比赛</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="labal">创新介绍</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="labal">介绍</div>
                    <div class="content"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                newsList:[]
            }
        },
        mounted(){

        },
        methods:{
            getRecentNews:function () {
                console.log("getRecentNews")
            },

        }
    }
</script>

<style scoped>
    .el-card{
        height: 45vh;
        margin: 5px;
        background-color: #fff;
    }

</style>