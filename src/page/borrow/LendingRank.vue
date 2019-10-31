<template>
    <div class="zyfPage outerDiv flexLayoutColumn haveTablePage">
        <div class="flexLayoutRow">
            <div class="flexLayoutRow title">
                <img :src="titleIcon" class="titleImg">
                <div  class="titleFont">借阅排行</div>
            </div>
            <div></div>
        </div>
        <div class="flexLayoutRow">
            <el-form label-width="80px" :model="formLabelAlign" class="flexLayoutRow">
                <el-form-item label="时间范围 :">
                    <el-select v-model="formLabelAlign.TimeFrame" clearable placeholder="请选择活动区域">
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
                    label="序号"
                    type="index"
                    width="100">
            </el-table-column>
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
                    prop="callNumber"
                    :show-overflow-tooltip="true"
                    label="索书号">
            </el-table-column>
            <el-table-column
                    prop="pressName"
                    :show-overflow-tooltip="true"
                    label="出版社">
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="借阅次数">
                <template slot-scope="scope">
                    <span>{{scope.row.count}}次</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {lendingRankFun} from "@/request/api/loan";

    export default {
        data(){
            return{
                formLabelAlign:{
                    TimeFrame:''//时间范围
                },
                titleIcon:require('../../common/img/borrowIcon/borrowReader.png'),
                tableData:[]

            }
        },
        methods:{
            searchApi(){
                lendingRankFun(
                    this.formLabelAlign.TimeFrame
                ).then((res)=>{
                    console.log('查询借阅排行返回的数据',res)
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
        cursor: pointer;
    }
    .serchBtn:hover{
        background-color: #12b494a6;
    }
</style>
