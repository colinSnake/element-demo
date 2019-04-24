<template>
    <div class="login">
        <h3 class="title">SegmentFault后台系统</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="userName">
                <el-input type="text" v-model="ruleForm.userName" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>    
        </el-form>
    </div>
</template>

<script>
    import { getLogin } from '../requests/index'
    export default {
        name: "Login",
        data(){
            return{
                logining: false,
                ruleForm: {
                    userName: 'admin',
                    password: 'admin'
                },
                rules: {
                    userName: [
                        { message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { message: '请输入密码', trigger: 'blur' },
                    ]
                },
                checked: false
            }
        },
        methods:{
            handleSubmit(e){
                console.log(this.$refs.ruleForm.validate)
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        console.log(valid) // true
                        this.logining = true
                        let loginParams = { userName: this.ruleForm.userName, password: this.ruleForm.password };
                        this.$http.getLogin(loginParams)
                            .then(resp => {
                                this.logining = false
                                const {
                                    userName,
                                    password,
                                    msg,
                                    avatar
                                } = resp.loginInfo
                                sessionStorage.setItem('user', JSON.stringify({userName,avatar}));
                                this.$router.push({ path: '/admin/table' });
                            })
                            .catch(error => {
                                console.log(error)
                            })
                            
                    }else {
                        console.log('提交出错！');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .login{
        width: 500px;
        height: 500px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: #18c79c;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px; 
        .title{
            width: 100%;
            color: #fff;
            font-weight: bold;
            font-size: 25px;
            text-align: center;
            height: 80px;
            line-height: 80px;
        }
        .el-form{
            width: 400px;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .el-form-item__label{
                color: #fff;
                text-align: left;
                padding: 0;
            }
            .el-checkbox{
                color: #fff;
                margin-bottom: 25px;
            }
        }
    }
</style>


