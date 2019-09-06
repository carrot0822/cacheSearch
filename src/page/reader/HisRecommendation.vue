<template>
    <div id="BookRenewal" class="zyfPage ReaderCenter haveTablePage">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">历史荐购</div>
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
                        prop="isbn"
                        :show-overflow-tooltip="true"
                        label="ISBN">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        :show-overflow-tooltip="true"
                        label="创建时间">
                </el-table-column>
                
                <el-table-column
                        prop="reason"
                        :show-overflow-tooltip="true"
                        label="荐购理由">
                    <template slot-scope="scope">
                        <span style="color: #2a2a2a">{{scope.row.reason == null || scope.row.reason=='' ?'---':scope.row.reason}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="toState"
                        :show-overflow-tooltip="true"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="examine"
                        :show-overflow-tooltip="true"
                        label="审核意见">
                    <template slot-scope="scope">
                        <span style="color: #2a2a2a">{{scope.row.examine == null || scope.row.examine=='' ?'---':scope.row.examine}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {hisRecommendFun} from '@/request/api/readerCenter'
    export default {
        data(){
            return {
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                currentPage:1,
                pageSize:13,
                Total:0,
                tableData:[]
            }
        },
        methods:{
            searchApi(){
                hisRecommendFun(
                    this.pageSize,
                    this.currentPage
                ).then((res)=>{
                    console.log('查询荐购历史返回的数据',res)
                    if(res.data.state==true){
                        
                        for(let item of res.data.row){
                            item.toState = this.toState(item.state);
                            item.toExamine= this.toNull(item.examine)
                        }
                        this.tableData=res.data.row;
                        this.Total=res.data.total
                    }else{
                        this.$message.error(res.data,msg)
                    }
                })
            },
            toState(num){
                let i = parseInt(num);
                let arr = ['未审核','驳回','同意']
                return arr[i];
            },
            toNull(value){
                return value?value:'无'
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
