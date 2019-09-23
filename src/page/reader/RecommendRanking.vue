<template>
    <div id="BookRenewal" class="zyfPage ReaderCenter haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">荐购排行</div>
            </div>
            <div></div>
        </div>

        <div class="flexLayoutRow">
            <el-form ref="form" :model="form" label-width="120px" class="flexLayoutRow">
                <el-form-item label="按时间筛选：">
                    <el-select v-model="form.time">
                        <el-option label="最近一周" value="week1"></el-option>
                        <el-option label="最近一个月" value="month1"></el-option>
                        <el-option label="最近三个月" value="month3"></el-option>
                        <el-option label="最近六个月" value="month6"></el-option>
                    </el-select>
                </el-form-item>
                <span class="serchBtn" @click="searchApi">搜索</span>
            </el-form>
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
                        label="书名">
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="著作者">
                </el-table-column>
                <el-table-column
                        prop="isbn"
                        label="ISBN">
                </el-table-column>
                <el-table-column
                        prop="publishingTime"
                        label="出版时间">
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="荐购次数">
                    <template slot-scope="scope">
                        <span style="color: #2a2a2a">{{scope.row.num}}次</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {rankRecommendFun} from "@/request/api/readerCenter";

    export default {
        data(){
            return {
                dialogVisible:false,
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                currentPage:1,
                pageSize:13,
                Total:0,
                form:{
                    time:''//按时间筛选
                },
                tableData:[]
            }
        },
        methods:{
            searchApi(){
                rankRecommendFun(
                    this.form.time,
                    this.pageSize,
                    this.currentPage
                ).then((res)=>{
                    console.log('荐购排行返回的数据',res)
                    if(res.data.state==true){
                        this.tableData=res.data.row,
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
        margin-top: 15px;
    }
    span{
        color: #12B494;
    }
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
