<template>
    <div class="home">
        <el-header>SegmentFault</el-header>
        <el-container style="height: 887px; border: 1px solid #eee">
            <el-aside width="200px" style="backgroundColor: #eef6f6">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#18c79c"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
            </el-aside>
        
            <el-container>
                <el-header class="second-nav">
                    当前位置是xxx
                </el-header>
                <el-header class="handlemodel">
                    <el-input v-model="input" placeholder="请输入内容" size="small" style="width: 200px;"></el-input>    
                    <el-button type="success" size="small">查询</el-button>
                    <el-button type="success" size="small">新增</el-button>
                </el-header>
                <el-main>
                    <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
        <el-footer>
            <p>Copyright © 2011-2019 SegmentFault. 当前呈现版本 19.02.27</p>
            <p>浙ICP备 15005796号-2   浙公网安备 33010602002000号 杭州堆栈科技有限公司版权所有</p>
        </el-footer>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data(){
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                };
            return {
                    tableData: Array(20).fill(item),
                    input: ''
                }
        },
        methods:{
            handleOpen(){

            },
            handleClose(){

            }
        }
    }
</script>

<style lang="scss">
    .home{
        .el-header {
            background-color: #18c79c;
            line-height: 60px;
            color: #fff;
            font-size: 20px;
        }
        .second-nav{
            background-color: #fff;
            font-size: 15px;
            color: #000;
        }
        .handlemodel{
            background-color: #f2f2f2;
        }
        .el-aside {
            color: #333;
        } 
        .el-footer {
            background-color: #18c79c;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 13px;
            p{
                height: 30px;
                line-height: 30px;
            }
        }
    }
</style>


