<template>
    <div class="table">
        <section>   
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
                    <el-table-column prop="birth" label="生日" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" width="300">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="500"
                    >
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="primary" size="small" icon="el-icon-edit" circle></el-button>
                            <el-button @click="handleDelete(scope.$index,scope.row)" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="danger" @click="batchRemove" class="batchRemove" size="small" disabled>批量删除</el-button>
                <el-pagination 
                    background 
                    layout="prev, pager, next, sizes, total, jumper"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pagesize"
                    :total="tableData.length"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                >
                </el-pagination>

                <!-- 编辑界面 -->
                <el-dialog title="用户信息编辑" :close-on-click-modal="false" :visible.sync="editFormVisible"> 
                    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="editForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="editForm.sex">
                                <el-radio class="radio" :label="1">男</el-radio>
                                <el-radio class="radio" :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                        </el-form-item>
                        <el-form-item label="生日">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input type="textarea" v-model="editForm.addr"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="editFormVisible = false">取消</el-button>
                        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </section>
    </div>
</template>

<script>
    import { getHomeData } from '../../../requests/index'
    export default {
        name: "Table",
        data(){
            return{
                tableData: [],
                input: '',
                total: 0,
                loading: false,
                pagesize: 10, // 每页条数
                currentpage: 1, // 起始页
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                // 编辑界面规则
                editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
                //编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
            }
        },
        created(){
            this.$http.getHomeData()
                .then(resp => {
                    this.tableData = resp.tableData
                    this.total = resp.total
                })
        },
        methods:{
            // 显示编辑模块
            handleEdit(index,row){
                console.log(index,row,456)
                this.editFormVisible = true
                this.editForm = Object.assign({}, row);
            },
            // 编辑操作

            // 显示删除模块
            handleDelete(index,row){

            },
            handleSelectionChange(val) {
                console.log(val) // 当前页的10个对象
                this.multipleSelection = val;
            },
            // 批量删除
            batchRemove(){

            },
            // currentPage改变时会触发
            handleCurrentChange(cpage) {
                this.currentpage = cpage;
            },
            // pagesize改变时会触发
            handleSizeChange(psize) {
                this.pagesize = psize;
            },
        }
    }
</script>

<style lang="scss">
    .table{
        .handlemodel{
            background-color: #f2f2f2;
            line-height: 60px;
        }
        .batchRemove{
            float: left;
            margin-top: 30px; 
        }
        .el-pagination{
            float: right;
            margin-top: 30px; 
        }
    }
</style>