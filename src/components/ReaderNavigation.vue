<template>
    <div id="NavigationPage" class="outerDiv flexLayoutRow">
        <div style="width: 220px">
            <el-menu
                    :default-active="$route.path"
                    router
                    unique-opened
                    class="el-menu-vertical-demo"
                    >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="userIcon iconfont icon-yonghuxinxi"></i>
                        <span>用户信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/BasicInfo" >基本信息</el-menu-item>
                        <el-menu-item index="/DocumentProcessing">读者卡挂失/恢复</el-menu-item>
                        <el-menu-item index="/ChangePassword">修改密码</el-menu-item>
                        <!--<el-menu-item index="/ModifyLoginName">修改登录名</el-menu-item>-->
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="userIcon iconfont icon-borrow"></i>
                        <span>我的借阅</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/BookRenewal" >图书续借</el-menu-item>
                        <el-menu-item index="/CurrentBorrowingQueries">当前借阅查询</el-menu-item>
                        <el-menu-item index="/HistoryLoanEnquiry">历史借阅查询</el-menu-item>
                        <el-menu-item index="/MyCollection">我的收藏</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="userIcon iconfont icon-lease-resv-2room"></i>
                        <span>我的预约</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/CurrentAppointment" >当前预约</el-menu-item>
                        <el-menu-item index="/HistoricalAppointment">历史预约查询</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="userIcon iconfont icon-woyaozijian"></i>
                        <span>我的荐购</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/ReaderRecommendation" >读者自荐</el-menu-item>
                        <el-menu-item index="/Order">征订荐购</el-menu-item>
                        <el-menu-item index="/HisRecommendation">历史荐购</el-menu-item>
                        <el-menu-item index="/RecommendRanking">荐购排行</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="userIcon iconfont icon-ax-caiwu"></i>
                        <span>财经管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/FinancialManagement" >财经查询</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>

    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created(){
            this.fetchNavData();
        },
        methods:{
            fetchNavData (){
                //var cur_path = this.$route.path; //获取当前路由


            }
        }
    }
</script>

<style scoped>
.userIcon{
    font-size: 29px;
    color: #ffffff;
    margin-right: 22px;
}
</style>
