<template>
    <div class="userInfo">
        <el-row>
            <el-col>
                <el-card class="resumeBox">
                    <router-link id="reviewTeacher" to="/">验证教师身份</router-link>
                    <div class="formBox">
                        <!--<el-form :model="resumeList">-->
                        <el-form size="medium" labelPosition="top">
                            <el-form-item label="真名">
                                <el-input v-model="resumeList.real_name"></el-input>
                            </el-form-item>

                            <el-form-item label="性别">
                                <el-select v-model="resumeList.gender" placeholder="请选择活动区域">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="年龄">
                                <el-date-picker type="date" placeholder="选择出生日期" v-model="resumeList.birthday" style="width: 100%;"></el-date-picker>
                            </el-form-item>

                            <el-form-item label="电话">
                                <el-input v-model="resumeList.phone"></el-input>
                            </el-form-item>

                            <el-form-item label="学校">
                                <el-input v-model="resumeList.school"></el-input>
                            </el-form-item>

                            <el-form-item label="学历">
                                <el-select v-model="resumeList.education" placeholder="请选择最高学历">
                                    <el-option label="硕士或以上" value="硕士或以上"></el-option>
                                    <el-option label="本科" value="本科"></el-option>
                                    <el-option label="高中" value="高中"></el-option>
                                    <el-option label="初中" value="初中"></el-option>
                                    <el-option label="小学" value="小学"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="经历">
                                <el-input type="textarea" v-model="resumeList.experience"></el-input>
                            </el-form-item>

                            <el-form-item label="自我介绍">
                                <el-input type="textarea" v-model="resumeList.self_assessment"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">提交</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>

                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data(){
            return{
                userId:1,  //没做验证时拿出来用的 临时变量 以后要修改
                resumeList:[
                    {
                        resume_id: 0,
                        user_id: 0,
                        real_name: '',
                        gender: '',
                        birthday: '',
                        phone: '',
                        school: '',
                        education: '',
                        experience: '',
                        self_assessment: ''
                    }
                ]
            }
        },
        mounted() {
            this.getUserInfo()
        },
        methods:{
            getUserInfo:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method:'get',
                    url:'/user/getUserResume',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        this.resumeList=res.data
                        console.log("res.data : "+JSON.stringify(this.resumeList))
                    }
                }).catch((err)=>{
                    console.log(err)
                })

            },
            onSubmit:function () {
                alert("hi!")
            }
        }
    }
</script>

<style scoped>
    #reviewTeacher {
        position: relative ;
        left: 80vw;
    }
    .formBox{
        width: 25vw;
        margin:0 auto;
    }
    .el-input , .el-date-picker {
        width:25vw;
        margin:0 auto;
    }

</style>