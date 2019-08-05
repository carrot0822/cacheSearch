<template>
    <div id="BasicInfo" class=" zyfPage ReaderCenter">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">基本信息</div>
            </div>
            <div></div>
        </div>

        <div class="flexLayoutRow">
            <div class="headIcon">
                <img  src="../../common/img/header.png">
            </div>
            <div>
                <p>读者卡号： <span>{{readerInfo.cardNumber}}</span></p>
                <p>开户馆： <span>{{readerInfo.libraryName}}</span> </p>
                <p>启用日期： <span>{{readerInfo.cardCreatTime}}</span></p>
                <p>押金： <span>{{readerInfo.balance}}</span></p>
            </div>
            <div>
                <p>姓名： <span>{{readerInfo.readerName}}</span></p>
                <p>证件类别： <span>{{readerInfo.fkPapersTypeName}}</span></p>
                <p>终止日期： <span>{{readerInfo.cardExpireTime}}</span></p>
                <p>总欠款： <span>{{readerInfo.overdueExpenses}}</span></p>
            </div>
            <div>
                <p>读者卡状态： <span>{{readerInfo.cardState==0?'正常':'挂失'}}</span></p>
                <p>证件编号： <span>{{readerInfo.readerCard}}</span></p>
                <p>卡等级名称： <span>{{readerInfo.fkGradeName}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { readerInfoFun } from "@/request/api/readerCenter";
    export default {
        data(){
            return {
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                readerInfo:{
                    cardNumber:"",
                    libraryName:'',
                    cardCreatTime:'',
                    balance:"",
                    readerName:'',
                    fkPapersTypeName:'',
                    cardExpireTime:"",
                    overdueExpenses:"",
                    cardState:"",
                    readerCard:"",
                    fkGradeName:""
                }
            }
        },
        created(){
            this.initializeApi()
        },
        methods:{
            //初始化用户
            initializeApi(){
                readerInfoFun().then((res)=>{
                    console.log('初始化的读者基本信息',res)
                    if(res.data.state==true){
                        this.readerInfo=res.data.row
                    }else{
                        this.message.error('错了哦，这是一条错误消息');
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .headIcon{
        width: 130px;
        height: 180px;
        background-color: #DADADA;
        margin-right: 70px;
        text-align: center;
    }
    .headIcon img{
        width: 100%;
        height: 100%;
    }
    p{
        color: #2a2a2a;
        height: 45px;
        line-height: 40px;
        font-size: 15px;
        width: 243px;
    }
    span{
        color: #12B494;
    }
</style>
