<template>
    <div id="BookRenewal" class="zyfPage ReaderCenter haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">修改密码</div>
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
                        prop="libraryBookCode"
                        :show-overflow-tooltip="true"
                        label="馆内码">
                </el-table-column>
                <el-table-column
                        prop="barcode"
                        :show-overflow-tooltip="true"
                        label="ISBN">
                </el-table-column>
                <el-table-column
                        prop="renewCount"
                        :show-overflow-tooltip="true"
                        label="续借次数">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        :show-overflow-tooltip="true"
                        label="借阅开始时间">
                </el-table-column>
                <el-table-column
                        prop="planReturnTime"
                        :show-overflow-tooltip="true"
                        label="借阅归还时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="renewalBtn(scope.row)" type="text" size="small">续借</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="10%"
                :before-close="handleClose">
            <span>{{popCentent}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {renewTableFun , renewBookFun} from "@/request/api/readerCenter";

    export default {
        data(){
            return {
                dialogVisible:false,
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                tableData:[],
                popCentent:'',//弹窗内容
                pageSize:13,
                currentPage:1,
                Total:0
            }
        },
        methods:{
            //续借按钮
            renewalBtn(row){
                let ids=[]
                console.log(row)
                ids.push(row.id)
                renewBookFun(ids).then((res)=>{
                    console.log('书籍续借后返回的数据',res)
                    if(res.data.state==true){
                        this.popCentent=res.data.msg;
                        this.dialogVisible = true;
                        this.searchApi()
                    }else{
                        this.popCentent=res.data.msg;
                        this.dialogVisible = true;
                    }

                })
                this.dialogVisible=true
            },
            handleClose(){
                this.dialogVisible=false
            },
            searchApi(){
                renewTableFun(
                    this.pageSize,
                    this.currentPage
                ).then((res)=>{
                    console.log('查询续借列表数据',res)
                    if(res.data.state==true){
                        this.tableData=res.data.row
                        this.Total=res.data.total
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
            this.searchApi(this.currentPage)
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
