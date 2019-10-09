<template>
    <div id="HistoryLoanEnquiry" class="ReaderCenter zyfPage haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">财务查询</div>
            </div>
            <div></div>
        </div>

        <div class="flexLayoutRow">
            <el-form :model="ruleForm" status-icon  class="demo-ruleForm flexLayoutRow" style="height: 35px">
                <el-form-item label="起始时间：" label-width="110px" class="dateInput">
                    <el-date-picker type="date" placeholder="开始时间" value-format="yyyy-MM-dd" v-model="ruleForm.startTime"></el-date-picker>
                    <span style="padding:0px 5px 0px 2px">-</span>
                    <el-date-picker type="date" placeholder="结束时间" value-format="yyyy-MM-dd" v-model="ruleForm.endTime"></el-date-picker>
                </el-form-item>
                <span class="serchBtn" @click="jumpBtn">搜索</span>
            </el-form>
            <div class="flexLayoutRow pagingDiv pagingBut" style="margin-top: 15px">
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
                        prop="createTime"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="消费类别">
                </el-table-column>
                <el-table-column
                        prop="serialNumber"
                        label="流水号">
                </el-table-column>
                <el-table-column
                        prop="libraryName"
                        label="经费所属馆">
                </el-table-column>
                <el-table-column
                        label="金额"
                        prop="moneyFloat">
                    <template slot-scope="scope">
                        <span>{{scope.row.moneyFloat}}元</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {FinanceFun} from '@/request/api/readerCenter'
    export default {
        data(){
            return {
                titleIcon:require('../../common/img/borrowIcon/newBook.png'),
                ruleForm:{
                    startTime:'',//开始时间
                    endTime:'',//结束时间
                },
                tableData:[],//表格展示数据
                pageSize:13,//条数
                currentPage:1,//页码
                Total:0,//返回的总条数
            }
        },
        methods:{
            //初始化表格展示数据
            searchApi(currentPageVal){
				console
                FinanceFun(
                    this.ruleForm.startTime,
                    this.ruleForm.endTime,
                    this.pageSize,
                    currentPageVal
                ).then((res)=>{
                    console.log('初始化表格查询',res)
                    if(res.data.state==true){
                        this.tableData=res.data.row;
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
					console.log('增加')
                }
                this.searchApi(this.currentPage)
            },
			searchBtn(){
				this.currentPage = 1
				this.searchApi(this.currentPage)
			}
        },
        created(){
            this.searchApi(this.currentPage)
        }
    }
</script>

<style scoped>
    .serchBtn{
        height: 30px;
        width: 60px;
        line-height: 30px;
        background-color: #12B494;
        color: white;
        margin-top:5px;
        border-radius: 3px;
        margin-left: 5px;
        font-size: 15px;
        text-align: center;
        cursor: default;
    }
    .serchBtn:hover{
        background-color: #12b494a6;
    }
</style>
