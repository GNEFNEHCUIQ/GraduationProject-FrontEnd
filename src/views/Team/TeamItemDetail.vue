<template>
    <div class="TeamItemDetail">
        <el-row>
            <el-col>
                <el-card>
                    <el-button type="primary" @click="handleCreate">添加需求</el-button>

                    <el-table
                            :data="ItemProgressList"
                            height="70vh"
                            style="width: 100%"
                            row-key="progress_id"
                            border
                            default-expand-all
                            :tree-props="{children: 'children'}">
                        <el-table-column
                                fixed
                                prop="demand"
                                label="需求"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                prop="user_name"
                                label="负责人"
                                width="110">
                        </el-table-column>
                        <el-table-column
                                prop="priority"
                                label="优先级"
                                width="160">
                        </el-table-column>
                        <el-table-column
                                prop="statue"
                                label="状况"
                                width="110">
                            <template slot-scope="scope">
                            <el-tag
                                    v-if="scope.row.statue==0"
                                    type="info"
                                    effect="dark">
                                未完成
                            </el-tag>
                            <el-tag
                                    v-else="scope.row.statue==1"
                                    type="success"
                                    effect="dark">
                                完成
                            </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="progress_describe"
                            label="描述"
                            width="360">
                    </el-table-column>
                        <el-table-column
                                prop="creation_time"
                                label="创建时间"
                                width="110">
                        </el-table-column>
                        <el-table-column
                                prop="handle_time"
                                label="处理时间"
                                width="360">
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="165">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        icon="el-icon-plus"
                                        circle
                                        @click="handleAdd(scope.$index, scope.row)"></el-button>
                                <el-button
                                        size="mini"
                                        type="success"
                                        icon="el-icon-check"
                                        circle
                                        @click="handleCheck(scope.$index, scope.row)"></el-button>
                                <el-button
                                        size="mini"
                                        type="primary"
                                        icon="el-icon-edit"
                                        circle
                                        @click="handleEdit(scope.$index, scope.row)"></el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle
                                        @click="handleDelete(scope.$index, scope.row)"></el-button>
                            </template>
                        </el-table-column>

                    </el-table>

                </el-card>
            </el-col>
        </el-row>

        <el-dialog
                :visible.sync="createDemandFormVisible"
                title="创建需求">
            <el-form
                    :model="createDemandForm"
                    ref="createDemandForm"
                    label-position="left"
                    label-width="90px"
                    style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="需求：" prop="demand">
                    <el-input type="text" :rows="2" v-model="createDemandForm.demand"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="createDemandForm.principal_id" placeholder="请选择负责人">
                        <el-option label="2" value="2"></el-option>
                        <el-option label="user" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-select v-model="createDemandForm.priority" placeholder="请选择优先级">
                        <el-option label="最高" value="最高"></el-option>
                        <el-option label="较高" value="较高"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="较低" value="较低"></el-option>
                        <el-option label="低" value="低"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述：" prop="progress_describe">
                    <el-input type="text" :rows="2" v-model="createDemandForm.progress_describe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="createItemProgress(createDemandForm) ">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                :visible.sync="createFunctionFormVisible"
                title="创建功能">
            <el-form
                    :model="createFunctionForm"
                    ref="createDemandForm"
                    label-position="left"
                    label-width="90px"
                    style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="功能：" prop="demand">
                    <el-input type="text" :rows="2" v-model="createFunctionForm.demand"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="createFunctionForm.principal_id" placeholder="请选择负责人">
                        <el-option label="2" value="2"></el-option>
                        <el-option label="4" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-select v-model="createFunctionForm.priority" placeholder="请选择优先级">
                        <el-option label="最高" value="最高"></el-option>
                        <el-option label="较高" value="较高"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="较低" value="较低"></el-option>
                        <el-option label="低" value="低"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述：" prop="progress_describe">
                    <el-input type="text" :rows="2" v-model="createFunctionForm.progress_describe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取消</el-button>
                <el-button type="primary" @click="createItemProgress(createFunctionForm) ">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                :visible.sync="editAffairFormVisible"
                title="修改">
            <el-form
                    :model="tempEditForm"
                    ref="createDemandForm"
                    label-position="left"
                    label-width="90px"
                    style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="事务：" prop="demand">
                    <el-input type="text" :rows="2" v-model="tempEditForm.demand"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="tempEditForm.principal_id" placeholder="请选择负责人">
                        <el-option label="2" value="2"></el-option>
                        <el-option label="user" value="user"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-select v-model="tempEditForm.priority" placeholder="请选择优先级">
                        <el-option label="最高" value="最高"></el-option>
                        <el-option label="较高" value="较高"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="较低" value="较低"></el-option>
                        <el-option label="低" value="低"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述：" prop="progress_describe">
                    <el-input type="text" :rows="2" v-model="tempEditForm.progress_describe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editAffairFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editItemProgress(tempEditForm) ">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "TeamItemDetail",
        data(){
            return{
                createDemandFormVisible:false,
                createFunctionFormVisible:false,
                editAffairFormVisible:false,
                item_id:this.$route.params.id,
                ItemProgressList:[],
                tempParentInfo:{
                    exist:0,
                    parent:0,
                    level:0
                },
                createDemandForm:{
                    demand:'',
                    principal_id:null,
                    priority:'',
                    progress_describe:''
                },
                createFunctionForm:{
                    demand:'',
                    principal_id:null,
                    priority:'',
                    progress_describe:''
                },
                tempEditForm:{
                    progress_id:0,
                    demand:'',
                    principal_id:null,
                    priority:'',
                    progress_describe:''
                }
            }
        },
        mounted() {
            this.getItemProgressList()
        },
        methods:{
            getItemProgressList:function () {
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        item_id:this.item_id
                    },
                    method:'get',
                    url:'/team/item/manager/getItemProgress',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        /*console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))*/
                        this.ItemProgressList = res.data
                        console.log("yourTeamList : "+JSON.stringify(this.ItemProgressList))
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            /*createDemand:function () {
                console.log("form:"+JSON.stringify(this.createDemandForm.demand))
                if (this.createDemandForm.demand!='' &&this.createDemandForm.principal_id!='' &&this.createDemandForm.priority!='' ){
                    this.axios.post('/team/item/manager/createDemand', {
                        item_id:this.item_id,
                        demand:this.createDemandForm.demand,
                        principal_id:this.createDemandForm.principal_id,
                        priority:this.createDemandForm.priority,
                        progress_describe:this.createDemandForm.progress_describe
                    })
                        .then(res =>{
                            console.log("res : "+JSON.stringify(res))
                            console.log("res.data : "+JSON.stringify(res.data))
                            location.reload();
                        })
                        .catch()
                } else {
                    this.$message.error("不能为空")
                }
            },*/

            createItemProgress:function(form){
                console.log("form:"+JSON.stringify(form))
                /*let row=rows
                if (row){
                    var progress_level=row.progress_level+1
                    var parent_item_id=row.progress_id
                    console.log("row")
            }else{
                    var progress_level=1
                    var parent_item_id=null
                    console.log("wu")
            }*/
                if (this.tempParentInfo.exist=1) {
                    var progress_level=++this.tempParentInfo.level
                    var parent_item_id=this.tempParentInfo.parent
                    //alert("progress_level:"+progress_level+",parent_item_id"+parent_item_id)
                }else{
                    var progress_level=1
                    var parent_item_id=0
                    //alert("progress_level:"+progress_level+",parent_item_id"+parent_item_id)
                }
                if (form.demand!='' ){
                    this.axios.post('/team/item/manager/createDemand', {
                        item_id:this.item_id,
                        demand:form.demand,
                        principal_id:form.principal_id,
                        priority:form.priority,
                        progress_level:progress_level,
                        parent_item_id:parent_item_id,
                        progress_describe:form.progress_describe
                    })
                        .then(res =>{
                            console.log("res : "+JSON.stringify(res))
                            console.log("res.data : "+JSON.stringify(res.data))
                            location.reload()
                        })
                        .catch()
                } else {
                    this.$message.error("不能为空")
                }
            },

            editItemProgress:function(form){
                console.log("editItemProgress--form:"+JSON.stringify(form))
                if (form.demand!='' ){
                    this.axios.put('/team/item/manager/updateProgress', {
                        progress_id:form.progress_id,
                        demand:form.demand,
                        principal_id:form.principal_id,
                        priority:form.priority,
                        progress_describe:form.progress_describe
                    })
                        .then(res =>{
                            console.log("res : "+JSON.stringify(res))
                            console.log("res.data : "+JSON.stringify(res.data))
                            //location.reload();
                        })
                        .catch()
                } else {
                    this.$message.error("不能为空")
                }
            },

            handleCreate:function () {
                this.createDemandFormVisible = true
            },
            handleAdd:function(index,row){
                //alert("handleAdd--index:"+JSON.stringify(index)+",row:"+JSON.stringify(row))
                /*if (row.progress_level==1){
                    this.createDemandFormVisible = true
                } else*/ if (row.progress_level==1 || 2){
                    this.createFunctionFormVisible = true
                    row.children=null
                    this.row=row
                    this.tempParentInfo.exist=1
                    this.tempParentInfo.parent=row.progress_id
                    this.tempParentInfo.level=row.progress_level
                    //alert("handleAdd:"+JSON.stringify(this.row)+"-----parent:"+this.tempParentInfo.parent+"this.tempParentInfo.level"+this.tempParentInfo.level)
                } else {
                    this.$message.error("暂时不支持三级需求再创建下级")
                }
            },
            handleClose:function(){
                this.createFunctionFormVisible = false
                this.tempParentInfo.exist=0
                this.tempParentInfo.parent=0
                this.tempParentInfo.level=1
            },
            handleCheck:function(index,row){
                //alert("index:"+JSON.stringify(index)+",row:"+JSON.stringify(row.progress_id))
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        progress_id:row.progress_id
                    },
                    method:'PUT',
                    url:'/team/item/manager/checkProgress',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        location.reload();
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            handleEdit:function (index,row) {
                //alert("handleEdit--index:"+JSON.stringify(index)+",row.progress_id:"+JSON.stringify(row.progress_id))
                this.editAffairFormVisible=true
                /*提取对应事务的然后赋值到临时的的数组，给弹窗提取，关闭时清空*/
                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        progress_id:row.progress_id
                    },
                    method:'GET',
                    url:'/team/item/manager/getOneProgressById',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        //console.log("res.data : "+JSON.stringify(res.data))
                        this.tempEditForm.progress_id=res.data.progress_id
                        this.tempEditForm.demand=res.data.demand
                        this.tempEditForm.principal_id=res.data.principal_id
                        this.tempEditForm.priority=res.data.priority
                        this.tempEditForm.progress_describe=res.data.progress_describe
                        console.log("this.tempEditForm:"+JSON.stringify(this.tempEditForm))
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            handleDelete:function (index,row) {
                //alert("handleDelete--index:"+JSON.stringify(index)+",row:"+JSON.stringify(row.progress_id))

                this.axios({
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    params:{
                        progress_id:row.progress_id
                    },
                    method:'DELETE',
                    url:'/team/item/manager/deleteProgress',
                    dataType:"json"
                }).then((res)=>{
                    if (res!=null) {
                        console.log("res : "+JSON.stringify(res))
                        console.log("res.data : "+JSON.stringify(res.data))
                        location.reload();
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>