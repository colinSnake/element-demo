<template>
    <div class="home">
        <el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="isCollapse ? 'logo-collapse-width' : 'logo-width'">
				{{isCollapse ? '' : sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="handleSwitch">
					<img src="../../assets/align-justify.png">
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">欢迎您，{{sysUserName}}<img src="../../assets/pikachu.png" /></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="loginOut">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
        <el-container style="height: 887px; border: 1px solid #eee">
            <aside style="backgroundColor: #eef6f6;">
                <!-- 加动画来解决切换显示问题 -->
                <transition name="fade" mode="out-in">
                    <el-menu 
                        :default-active="$route.path" 
                        :class="isCollapse ? 'el-menu--collapse' : 'el-menu-vertical-demo'" 
                        @open="handleOpen"
                        @close="handleClose" 
                        router
                        unique-opened
                        :collapse="isCollapse"
                        style="backgroundColor: #eef6f6"
                        active-text-color="#18c79c"
                    >
                        <template 
                            v-for="(item,index) in navs"
                        >
                            <el-submenu 
                                :index="index+''" 
                                :key="index"
                            >
                                <template slot="title"><i :class="item.iconCls"></i>{{isCollapse ? '' : item.name}}</template>
                                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                                    {{child.name}}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </transition>
            </aside>
            <el-container>
                <el-header 
                    class="second-nav"
                >
                    <strong>{{$route.name}}</strong>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item
                            v-for="(item,index) in $route.matched"
                            :key="index"
                        >
                            {{item.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
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
            return {
                    navs: this.$router.options.routes.filter(item => !item.hidden),
                    isCollapse: false,
                    sysName:'SegmentFault',
                    sysUserName: '',
                    sysUserAvatar: '',
                }
        },
        created(){
            // 获取用户名和头像
            let user = JSON.parse(sessionStorage.getItem('user'))
            this.sysUserName = user.userName || ''
            this.sysUserAvatar = user.avatar || ''
        },
        methods:{
            handleOpen(){
                
            },
            handleClose(){
                
            },
            // 折叠导航栏
            handleSwitch(){
                this.isCollapse = !this.isCollapse
            },
            loginOut(){
                this.$confirm('确认退出吗？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    this.$router.push({path: '/admin/login'})
                }).catch(error => {
                    console.log(error)
                })
                
            }
        }
    }
</script>

<style lang="scss">
    .home{
        .header {
			height: 60px;
			line-height: 60px;
			background-color: #18c79c;
			color:#fff;
			.userinfo {
                height: 60px;
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
                    margin-left: 130px; 
                    display: flex;
                    align-items: center;
					img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
                        background-color: #fff;
                        margin-left: 10px; 
					}
				}
			}
			.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width: 201px;
			}
			.logo-collapse-width{
				width: 66px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
                img{
                    width: 25px;
                    height: 25px;
                }
			}
		}
        // 不折叠的宽度
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .second-nav{
            // width: 100%;
            background-color: #fff;
            font-size: 13px;
            color: #d8ccbb;
            display: flex;
            justify-content: space-between;
            align-items: center;
            strong{
                font-size: 15px;
                color: #475669;
            }
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
    }
</style>


