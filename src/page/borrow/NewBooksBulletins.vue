<template>
    <div class="zyfPage outerDiv flexLayoutColumn haveTablePage">
        <div class="flexLayoutRow">
            <div class="flexLayoutRow title">
                <img :src="titleIcon" class="titleImg">
                <div  class="titleFont">新书通报</div>
            </div>
            <div></div>
        </div>
        <div class="flexLayoutRow">
            <el-form label-width="80px" :model="formLabelAlign" class="flexLayoutRow">
                <el-form-item label="时间范围 :">
                    <el-select v-model="formLabelAlign.TimeFrame" placeholder="请选择活动区域">
                        <el-option label="最近一周" value="week1"></el-option>
                        <el-option label="最近一个月" value="month1"></el-option>
                        <el-option label="最近三个月" value="month3"></el-option>
                        <el-option label="最近六个月" value="month6"></el-option>
                    </el-select>
                </el-form-item>
                <span class="serchBtn" @click="searchApi">搜索</span>
            </el-form>
            <div></div>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%"
                >
            <el-table-column
                    prop="name"
                    :show-overflow-tooltip="true"
                    label="书名">
            </el-table-column>
            <el-table-column
                    prop="author"
                    :show-overflow-tooltip="true"
                    label="作者">
            </el-table-column>
            <el-table-column
                    prop="fkTypeName"
                    :show-overflow-tooltip="true"
                    label="类型名">
            </el-table-column>
            <el-table-column
                    prop="pageNumber"
                    label="页码">
                <template slot-scope="scope">
                    <span>{{scope.row.pageNumber == null || scope.row.pageNumber=='' ?'---':scope.row.pageNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格">
                <template slot-scope="scope">
                    <span>{{scope.row.price}}元</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="searchNumber"
                    :show-overflow-tooltip="true"
                    label="索取号">
                <template slot-scope="scope">
                    <span>{{scope.row.searchNumber == null || scope.row.searchNumber=='' ?'---':scope.row.searchNumber}}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {getNewbookFun} from "@/request/api/loan";

    export default {
        data(){
            return{
                formLabelAlign:{
                    TimeFrame:''//时间范围
                },
                titleIcon:require('../../common/img/borrowIcon/newBook.png'),
                tableData:[]
            }
        },
        methods:{
            searchApi(){
                getNewbookFun(
                    this.formLabelAlign.TimeFrame
                ).then((res)=>{
                    console.log('查询新书通报返回的数据',res)
                    if(res.data.state==true){
                        this.tableData=res.data.row;
                    }else{
                        this.messageFix.error(res.data.msg)
                    }
                })
            }
        },
        created(){
            this.searchApi()
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
        margin-left: 10px;
        font-size: 15px;
        text-align: center;
        cursor: default;
    }
    .serchBtn:hover{
        background-color: #12b494a6;
    }
</style>

