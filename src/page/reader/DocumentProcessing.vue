<template>
    <div id="documentProcessing" class="zyfPage ReaderCenter">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
				
                <img  :src="titleIcon" class="titleImg">
                <div class="titleFont">读者卡挂失/恢复</div>
            </div>
            <div></div>
        </div>
        <div class="flexLayoutRow">
			<img v-if="headerAddress" :src="headerAddress" class="headIcon">
            
            <div>
                <p>读者卡号： <span>{{readerInfo.cardNumber}}</span></p>
                <p>开户馆： <span>{{readerInfo.libraryName}}</span> </p>
                <p>启用日期： <span>{{readerInfo.cardCreatTime}}</span></p>
                <p>押金： <span>{{readerInfo.balance}}</span></p>
            </div>
            <div>
                <p>终止日期： <span>{{readerInfo.cardExpireTime}}</span></p>
            </div>
        </div>
        <div class="processing flexLayoutColumn">
            <el-button type="primary" id="primaryBtn" @click="isreportLossApi()"></el-button>
            <p style="width: 500px">* 读者卡遗失时,可在此办理挂失,以确保您的合法权益不受侵害</p>
        </div>
        <!--弹窗-->
        <el-dialog
                :visible.sync="dialogVisible"
                width="10%"
                :before-close="handleClose">
            <span>{{successPointOut}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import { readerInfoFun, cardReportFun, cardReportCancelFun} from "@/request/api/readerCenter";
    export default {
        data(){
            return {
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                readerInfo:{
                    cardNumber:"",
                    libraryName:'',
                    cardCreatTime:'',
                    balance:"",
                    cardExpireTime:"",
                    cardState:''
                },
				headerAddress:'',
                successPointOut:'',
                dialogVisible: false
            }
        },
        methods:{
            //初始化用户
            initializeApi(){
                let btnName=""
                readerInfoFun().then((res)=>{
                    console.log('初始化的读者基本信息',res);
                    if(res.data.state==true){
                        this.readerInfo=res.data.row;
                        if(res.data.row.cardState==0){
                            btnName='挂 &nbsp; &nbsp; 失'
                        }else{
                            btnName='取 &nbsp; &nbsp; 挂'
                        }
						this.headerAddress = res.data.row.headerAddress
                        document.getElementById('primaryBtn').innerHTML=btnName
                    }
                })
            },
            //挂失按钮
            isreportLossApi(){
                if(this.readerInfo.cardState==0){
                    cardReportFun().then((res)=>{
                        console.log('挂失后返回的用户信息',res);
                        if(res.data.state==true){
                            this.initializeApi();
                            this.successPointOut=res.data.msg;
                            this.dialogVisible=true;
                        }else{
                            this.successPointOut=res.data.msg;
                            this.dialogVisible=true;
                        }
                    })
                }else{
                    cardReportCancelFun().then((res)=>{
                        console.log('取挂后返回的信息',res);
                        if(res.data.state==true){
                            this.initializeApi();
                            this.successPointOut=res.data.msg;
                            this.dialogVisible=true;
                        }else{
                            this.successPointOut=res.data.msg;
                            this.dialogVisible=true;
                        }
                    })
                }
            },
            handleClose(done) {
                this.dialogVisible=false
            }
        },
        created(){
            this.initializeApi()
        }
    }
</script>

<style scoped>
    .headIcon{
        width: 150px;
        height: 180px;
        background-color: #DADADA;
        margin-right: 30px;
    }
    p{
        color: #2a2a2a;
        height: 45px;
        line-height: 40px;
        font-size: 15px;
        width: 380px;
    }
    span{
        color: #12B494;
    }
    .processing p{
        color:  #FF3B31;
        margin-top: 10px;
    }
</style>
