<template>
    <div id="changePassword" class="zyfPage ReaderCenter">
        <div class="flexLayoutRow">
            <div class="title flexLayoutRow">
                <img :src="titleIcon" class="titleImg">
                <div class="titleFont">修改密码</div>
            </div>
            <div></div>
        </div>

        <div class="formStyle">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                <el-form-item label="原密码：" prop="passWord">
                    <el-input v-model="ruleForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassWord">
                    <el-input v-model="ruleForm.newPassWord"></el-input>
                </el-form-item>
                <el-form-item label="新密码确认：" prop="confirmPassWord">
                    <el-input v-model="ruleForm.confirmPassWord"></el-input>
                </el-form-item>
                <el-form-item label-width="390px">
                    <el-button type="primary" @click="submitForm('ruleForm')">确 &nbsp; 认</el-button>
                    <el-button type="info" @click="resetForm('ruleForm')">重 &nbsp; 置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="placeHolderFont">* 温馨提示：密码必须为6-20位的数字和英文，已兼容短信服务﹑电话续借和自动借还终端密码输入</div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="10%"
                :before-close="handleClose">
            <span>{{popContent}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import { changePassWordFun } from "@/request/api/readerCenter";
    export default {
        data(){
            return {
                dialogVisible:false,
                titleIcon:require('../../common/img/readerIcon/BasicInfo.png'),
                ruleForm:{
                    passWord:"",//原密码
                    newPassWord:'',//新密码
                    confirmPassWord:''//新密码确认
                },
                popContent:"",//弹窗内容
                rules: {
                    passWord: [{ required: true, message: '原密码不能为空', trigger: 'blur' },],
                    newPassWord: [{ required: true, message: '新密码不能为空', trigger: 'blur' },],
                    confirmPassWord: [{ required: true, message: '确认密码不能为空', trigger: 'blur' },],
                },
            }
        },
        methods:{
            handleClose(done) {
                this.dialogVisible=false
                for(const i in this.ruleForm){
                    this.ruleForm[i]=""
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        if(this.ruleForm.newPassWord == this.ruleForm.passWord){
                            this.messageFix.error('新密码不得与原密码一致')
                            return
                        }
                        if(this.ruleForm.newPassWord==this.ruleForm.confirmPassWord){
                            changePassWordFun(this.ruleForm.passWord,this.ruleForm.newPassWord).then((res)=>{
                                console.log('修改密码后返回的结果',res)
                                if(res.data.state==true){
                                    this.popContent=res.data.msg;
                                    this.dialogVisible=true
                                }else{
                                    this.popContent=res.data.msg;
                                    this.dialogVisible=true
                                }
                            })
                        }else{
                            this.popContent='您的确认密码与新密码不相符，请重新输入！';
                            this.dialogVisible=true
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                for(const i in this.ruleForm){
                    this.ruleForm[i]=""
                }
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .formStyle{
        width: 700px;
        margin: 40px auto 30px;
    }
    span{
        color: #12B494;
    }
    .placeHolderFont{
        color: #FF3B31;
        width: 720px;
        margin-left: 200px;
    }
</style>
