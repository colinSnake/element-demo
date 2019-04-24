<template>
    <div class="home">
        <el-header>SegmentFault</el-header>
        <el-container style="height: 887px; border: 1px solid #eee">
            <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
                <!-- 导航栏展开 -->
                <el-menu 
                    :default-active="$route.path" 
                    class="el-menu-vertical-demo" 
                    @open="handleOpen"
                    @close="handleClose" 
                    router
                    unique-opened
                    :collapse="collapsed"
                    style="width: 200px;"
                >
                    <template 
                        v-for="(item,index) in navs"
                    >
                        <el-submenu 
                            :index="index+''" 
                            :key="index"
                            v-if="!item.hidden"
                        >
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" :v-if="!child.hidden">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
                <!-- 导航栏折叠 -->
                

            </aside>
        
            <el-container>
                <el-header class="second-nav">
                    <span></span>
                    <span></span>
                </el-header>
                <el-header class="handlemodel">
                    <el-input v-model="input" placeholder="请输入内容" size="small" style="width: 200px;"></el-input>    
                    <el-button type="success" size="small">查询</el-button>
                    <el-button type="success" size="small">新增</el-button>
                </el-header>
                <el-main>
                    <el-table 
                        ref="multipleTable"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :data="tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            width="120"
                            label="序号"
                        >
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" width="120">
                        </el-table-column>
                        <el-table-column prop="age" label="年龄" width="120">
                        </el-table-column>
                        <el-table-column prop="createAt" label="创建日期" width="300">
                        </el-table-column>
                        <el-table-column prop="address" label="地址" width="300">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="500"
                        >
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="small" icon="el-icon-edit" circle></el-button>
                                <el-button @click="handleDelete(scope.row)" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background 
                        layout="prev, pager, next, sizes, total, jumper"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagesize"
                        :total="tableData.length"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                    >
                    </el-pagination>
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
    import { getHomeData } from '../../requests/index'
    export default {
        name: 'Home',
        data(){
            return {
                    tableData: [],
                    input: '',
                    total: 0,
                    loading: false,
                    pagesize: 10, // 每页条数
                    currentpage: 1, // 起始页
                    isCollapse: true,
                    navs: this.$router.options.routes,
                    collapsed: false
                }
        },
        created(){
            console.log(this.$router,666)
            this.$http.getHomeData()
                .then(resp => {
                    this.tableData = resp.tableData
                    this.total = resp.total
                })
        },
        methods:{
            handleOpen(){
                console.log(1)
            },
            handleClose(){
                console.log(2)
            },
            handleClick(obj){
                console.log(obj)
                obj.address = '成都信息工程大学18栋'
            },
            handleDelete(obj){

            },
            handleSelectionChange(val) {
                console.log(val) // 当前页的10个对象
                this.multipleSelection = val;
            },
            // currentPage改变时会触发
            handleCurrentChange(cpage) {
                this.currentpage = cpage;
            },
            // pagesize改变时会触发
            handleSizeChange(psize) {
                this.pagesize = psize;
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
        .cell{
            text-align: center;
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
        .el-pagination{
            display: flex;
            justify-content: center;
            margin-top: 30px; 
        }
    }
</style>



