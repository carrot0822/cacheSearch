<template>
    <div id="OrderPage" class="ReaderCenter zyfPage haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">征订荐购</div>
            </div>
            <div></div>
        </div>

        <el-form label-width="80px" :model="formLabelAlign" class="flexLayoutRow" >
            <el-form-item label="书名：">
                <el-input v-model="formLabelAlign.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="作者：">
                <el-input v-model="formLabelAlign.author" clearable></el-input>
            </el-form-item>
            <el-form-item label="ISBN：">
                <el-input v-model="formLabelAlign.isbn" clearable></el-input>
            </el-form-item>
            <span class="serchBtn" @click="searchApi">搜索</span>
        </el-form>
        <div class="flexLayoutRow">
            <div></div>
            <div class="flexLayoutRow pagingDiv pagingBut" style="margin-top: 10px">
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
                        <span>{{scope.row.num}}次</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="orderBtn(scope.row)" type="text" size="small">荐购</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="27%"
                title="荐购理由"
                :before-close="handleClose">
            <div class="">
                <el-input
                        type="textarea"
                        :rows="8"
                        resize="none"
                        v-model="orderAccount">
                </el-input>
                <div class="flexLayoutRow messageBtn">
                    <span style="background-color: #12B494" @click="confirmBtn">确 &nbsp; 定</span>
                    <span style="background-color: #b7b7b7" @click="cancelBtn">取 &nbsp; 消</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {orderFun ,addOrderFun} from "@/request/api/readerCenter";

    export default {
        data(){
            return {
                orderAccount:'',//荐购理由
                dialogVisible:false,
                titleIcon:require('../../common/img/borrowIcon/newBook.png'),
                formLabelAlign:{
                    name:'',//书名
                    author:'',//作者
                    isbn:''//Isbn
                },
                pageSize:13,//跳转的页数
                currentPage:1,
                Total:0,
                tableData:[],
                orderData:{}
            }
        },
        methods:{
            //弹框取消
            handleClose(){
                this.dialogVisible=false
            },
            //荐购操作
            orderBtn(row){
                this.dialogVisible=true
                this.orderData=row
            },
            //荐购确定按钮
            confirmBtn(){
                this.orderData["reason"]=this.orderAccount
                console.log('荐购的书籍数据',this.orderData)
                addOrderFun(this.orderData).then((res)=>{
                    console.log('书籍荐购返回的数据',res)
                    if(res.data.state==true){
                        this.messageFix.success(res.data.msg)
                        this.dialogVisible=false
                        this.searchApi()
                    }else{
                        this.messageFix.error(res.data.msg)
                    }
                })
            },
            //荐购取消按钮
            cancelBtn(){
                this.orderAccount=""
                this.dialogVisible = false;
            },
            searchApi(){
                orderFun(
                    this.formLabelAlign.name,
                    this.formLabelAlign.author,
                    this.formLabelAlign.isbn,
                    this.pageSize,
                    this.currentPage
                ).then((res)=>{
                    console.log('征订荐购查询返回的数据',res)
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
        cursor: pointer;
    }
    .serchBtn:hover{
        background-color: #12b494a6;
    }
    .messageBtn{
        width: 310px;
        margin: 30px auto 10px;
    }
    .messageBtn span{
        width: 130px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        color: white;
        font-size: 15px;
        cursor: default;
        cursor: pointer;
    }
</style>
