<template>
    <div id="CurrentAppointmenr" class="zyfPage ReaderCenter haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">当前预约</div>
            </div>
            <div></div>
        </div>

        <div class="flexLayoutRow">
            <div></div>
            <div class="flexLayoutRow pagingDiv pagingBut">
                <el-button plain @click="homePageBtn">首页</el-button>
                <el-button plain @click="previousPageBtn">上一页</el-button>
                <el-button plain @click="nextPageBtn">下一页</el-button>
                <el-button plain @click="lastPageBtn">尾页</el-button>
                <input type="text" class="pageInput" v-model="currentPage">
                <el-button plain @click="jumpBtn">跳转</el-button>
            </div>
        </div>

        <div style="margin-top: 5px" class="tableStyle">
            <el-table
                    :data="tableData"
                    style="width: 100%"
            >
                <el-table-column
                        prop="bookName"
                        :show-overflow-tooltip="true"
                        label="书名">
                </el-table-column>
                <el-table-column
                        prop="author"
                        :show-overflow-tooltip="true"
                        label="著作者">
                </el-table-column>
                <el-table-column
                        prop="pressName"
                        :show-overflow-tooltip="true"
                        label="出版社">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        :show-overflow-tooltip="true"
                        label="预约创建时间">
                </el-table-column>
                <el-table-column
                        prop="beginTime"
                        :show-overflow-tooltip="true"
                        label="预约生效时间">
                    <template slot-scope="scope">
                        <span style="color: #2a2a2a">{{scope.row.beginTime == null || scope.row.beginTime=='' ?'---':scope.row.beginTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="subscribeState"
                        :show-overflow-tooltip="true"
                        label="预约状态">
                    <template slot-scope="scope">
                        <span style="color: #2a2a2a">{{scope.row.subscribeState == 0?'等待中':'生效中'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="subscribeState"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="renewalBtn(scope.row)" type="text" size="small">取消预约</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="10%"
                :before-close="handleClose">
            <span>{{popContent}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {nowSubscribeFun,cencalSubscribeFun} from '@/request/api/readerCenter'
    export default {
        data(){
            return {
                dialogVisible:false,
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                pageNum:'',//跳转的页数
                tableData:[],
                pageSize:13,
                currentPage:1,
                Total:0,
                popContent:'',//弹窗内容
            }
        },
        methods:{
            //预约/取消预约按钮
            renewalBtn(row){
                console.log(row)
                cencalSubscribeFun(row.id).then((res)=>{
                    console.log('取消预约后返回的消息',res)
                    if(res.data.state==true){
                        this.popContent=res.data.msg
                        this.dialogVisible=true
                        this.searchApi()
                    }else{
                        this.popContent=res.data.msg
                        this.dialogVisible=true
                    }
                })
            },
            handleClose(){
                this.dialogVisible=false
            },
            searchApi(){
                nowSubscribeFun(
                    this.pageSize,
                    this.currentPage
                ).then((res)=>{
                    console.log('当前预约表格查询返回的数据',res)
                    if(res.data.state==true){
                        this.tableData=res.data.row
                        this.Total=res.data.total
                    }else{
                        this.messageFix.error(res.data.msg)
                    }
                })
            },
            //首页跳转按钮
            homePageBtn(){
                this.currentPage=1
                this.searchApi(this.currentPage)
            },
            //尾页跳转按钮
            lastPageBtn(){
                if(this.Total>13){
                    this.currentPage=Math.ceil(this.Total/13)
                }else{
                    this.currentPage=1
                }
                this.searchApi(this.currentPage)
            },
            //上一页跳转按钮
            previousPageBtn(){
                if(this.currentPage==1){
                    return
                }else{
                    this.currentPage--;
                    this.searchApi(this.currentPage)
                }
            },
            //下一页跳转按钮
            nextPageBtn(){
                console.log(this.currentPage)
                console.log(Math.ceil(this.Total/13))
                if(this.currentPage===Math.ceil(this.Total/13)){
                    console.log('页面不进行跳转')
                }else{
                    this.currentPage++;
                    this.searchApi(this.currentPage)
                }

            },
            //依据页码跳转的按钮
            jumpBtn(){
                if(!this.currentPage||this.currentPage==0){
                    this.currentPage=1
                }else{
                    let ym=Math.round(this.currentPage)
                    this.currentPage=ym
                }
                this.searchApi(this.currentPage)
            },

        },
        created(){
            this.searchApi()
        }
    }
</script>

<style scoped>
    .pagingDiv{

    }
    span{
        color: #12B494;
    }
</style>
