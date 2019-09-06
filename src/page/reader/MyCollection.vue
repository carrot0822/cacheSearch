<template>
    <div id="MyCollection" class="ReaderCenter zyfPage haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">我的收藏</div>
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
                        prop="creatTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteCollection(scope.row)" type="text" size="small">删除收藏</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="10%"
                :before-close="handleClose">
            <span style="color: #12B494">{{popContent}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {myCollectFun ,deleteCollectFun} from '@/request/api/readerCenter'
    export default {
        data(){
            return {
                titleIcon:require('../../common/img/borrowIcon/newBook.png'),
                formLabelAlign:{
                    name:'',//书名
                    author:'',//作者
                    isbn:''//Isbn
                },
                pageSize:13,
                currentPage:1,
                Total:0,
                tableData:[],
                popContent:"",
                dialogVisible:false,

            }
        },
        methods:{
            
            handleClose(){
                this.dialogVisible=false
                this.searchApi()
            },
            deleteCollection(row){
                //删除收藏
                let ids=[]
                ids.push(row.id)
                deleteCollectFun(ids).then((res)=>{
                    console.log('删除收藏后返回的数据',res)
                    if(res.data.state==true){
                        this.popContent=res.data.msg;
                        this.dialogVisible=true
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            searchApi(){
                myCollectFun(
                    this.formLabelAlign.name,
                    this.formLabelAlign.author,
                    this.formLabelAlign.isbn,
                    this.pageSize,
                    this.currentPage
                ).then((res)=>{
                    console.log('查询我的收藏返回的数据',res)
                    if(res.data.state==true){
                        this.tableData=res.data.row;
                        this.Total=res.data.total;
                    }else{
                        this.$message.error(res.data.msg)
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
