<template>
    <!--<el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" >-->
        <el-menu router unique-opened :collapse="isCollapse">
        <h3>众</h3>
        <el-submenu v-for="(item,index) in routes"
                    :key="index"
                    v-if="!item.hidden"
                    :index="index + ''"
        >
            <template slot="title">
                <i :class="item.icon" style="color: #ddd"></i>
                <span slot="title">{{item.name}}</span>
            </template>
                <el-menu-item
                        v-for="(children,childrenIndex) in item.children"
                        :index="children.path"
                        :key="childrenIndex">
                    {{children.name}}
                </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "sideBar",
        data() {
            return {
                //isCollapse: true
                isCollapse:true
            };
        },
        computed:{
            routes(){
                return this.$store.state.routes
            }
        }
        /*methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }*/
    }
</script>

<style scoped>

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu{

        height: 100vh;
        background-color: #48525c;
    }
    .i{
        color: #000;
    }
</style>