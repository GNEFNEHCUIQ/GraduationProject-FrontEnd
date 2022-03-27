<template>
    <div class="userInfo">
        <el-row>
            <el-col>
                <el-card class="resumeBox">
                    <a id="reviewTeacher" href="#" @click="handleTeacher()">我是教师</a>
                    <div class="head">
                        <!--<el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>-->
                        头像
                    </div>
                    <div class="formBox">
                        <!--<el-form :model="resumeList">-->
                        <el-form size="medium" labelPosition="top">

                            <el-form-item label="账号">
                                <el-input v-model="resumeList.user_id" disabled="disabled"></el-input>
                            </el-form-item>

                            <el-form-item label="真名">
                                <el-input v-model="resumeList.real_name"></el-input>
                            </el-form-item>

                            <el-form-item label="性别">
                                <el-select v-model="resumeList.gender" placeholder="请选择性别">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="出生日期">
                                <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择出生日期" v-model="resumeList.birth" style="width: 100%;"></el-date-picker>
                            </el-form-item>

                            <el-form-item label="电话">
                                <el-input v-model="resumeList.phone"></el-input>
                            </el-form-item>

                            <el-form-item label="自我介绍">
                                <el-input type="textarea" v-model="resumeList.self_assessment"></el-input>
                            </el-form-item>

                            <el-form-item label="入学年份">
                                <el-date-picker type="year" format="yyyy 年" value-format="yyyy-MM-dd" placeholder="选择出生日期" v-model="resumeList.time_of_enrollment" style="width: 100%;"></el-date-picker>
                            </el-form-item>

                            <el-form-item label="专业">
                                <el-input v-model="resumeList.major"></el-input>
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

                            <el-form-item label="个人经历">
                                <el-input type="textarea" v-model="resumeList.experience"></el-input>
                            </el-form-item>


                            <el-form-item>
                                <el-button type="primary" @click="onSubmit()">提交</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>

                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="teacherFormVisible">
            <el-form
                    :model="teacherForm"
                    ref="dataForm"
                    label-position="left"
                    label-width="90px"
                    style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="工号" prop="job_number">
                    <el-input type="text" :rows="2" v-model="teacherForm.job_number"></el-input>
                </el-form-item>
                <el-form-item label="职称">
                    <el-select
                            v-model="teacherForm.qualification"
                            class="filter-item"
                            placeholder="选择职称"
                    >
                        <el-option
                                v-for="item in qualificationList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select
                            v-model="teacherForm.category"
                            class="filter-item"
                            placeholder="选择分类"
                    >
                        <el-option
                                v-for="item in categoryList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="teamDescribe">
                    <el-input type="textarea"  v-model="teacherForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="teacherFormVisible = false">取消</el-button>
                <el-button type="primary" @click="certifiedAsTeacher() ">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data(){
            return{
                teacherFormVisible:false,
                teacherForm:{
                    job_number:'',
                    qualification:'',
                    category:'',
                    description:''
                },
                resumeList:[
                    {
                        resume_id: 0,
                        user_id:0,
                        real_name: '',
                        gender: '',
                        birth: '',
                        phone: '',
                        self_assessment: '',
                        major:'',
                        time_of_enrollment:'',
                        education: '',
                        experience: '',
                    }
                ],
                qualificationList:[
                    { label: "助教", key: "助教" },
                    { label: "讲师", key: "讲师" },
                    { label: "副教授", key: "副教授" },
                    { label: "教授", key: "教授" }
                ],
                categoryList:[
                    { label: "计算机", key: "计算机" },
                    { label: "新媒体", key: "新媒体" },
                    { label: "物联网", key: "物联网" },
                    { label: "自动化", key: "自动化" },
                    { label: "游戏", key: "游戏" },
                    { label: "金融", key: "金融" },
                    { label: "其他", key: "其他" },
                ],
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
                this.axios.put('/user/updateUserResume', {
                    resume_id:this.resumeList.resume_id,
                    real_name:this.resumeList.real_name,
                    gender: this.resumeList.gender,
                    birth: this.resumeList.birth,
                    phone: this.resumeList.phone,
                    self_assessment:this.resumeList.self_assessment,
                    major:this.resumeList.major,
                    time_of_enrollment:this.resumeList.time_of_enrollment,
                    education: this.resumeList.education,
                    experience: this.resumeList.experience,
                })
                    .then(res =>{
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        location.reload();
                    })
                    .catch()
            },
            handleTeacher:function(){
              this.teacherFormVisible=true
            },
            certifiedAsTeacher:function () {
                this.axios.post('/user/certifiedAsTeacher',{
                    job_number:this.teacherForm.job_number,
                    qualification:this.teacherForm.qualification,
                    category:this.teacherForm.category,
                    description:this.teacherForm.description
                }).then(res=>{

                })
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