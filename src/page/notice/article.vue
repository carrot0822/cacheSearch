<template>
  <div class="articleBox">
    <div class="conBox" >
      <section class="backBox">
        <i @click="back" class="backtext el-icon-back"><span class="back">返回</span></i>
      </section>
			<div v-if="dataList.length">
				<section class="title">
				  <h1 class="titleCon">{{dataList[0].title}}</h1>
				</section>
				<!-- 作者时间等 -->
				<div class="undefLine"></div>
				<section class="InfoBox">
				  <p class="InfoCon">
				    <span class="author">作者:{{dataList[0].username}}</span>
				    <span class="time">发布日期:{{dataList[0].createTime}}</span>
				  </p>
				</section>
				<!-- 富文本框内容 -->
				<section class="contentBox">
				  <div class="content ql-editor" v-html="dataList[0].content"></div>
				</section>
				<!-- 附件 -->
				
				<section class="fileBox">
				  <h2>附件下载</h2>
				  <div class="fileList">
				    <p v-for="(item,index) of fileList" :key="index" download="附件下载">
				      <a  :href="item.fileDown">{{item.fileName}}</a>
				    </p>
				  </div>
				</section>
				<div class="undefLine"></div>
			</div>
      
    </div>
    <div v-if="!dataList.length" class="loading">
			查询失败
		</div>
  </div>
</template>

<script>
import { articleInt,showUrl } from "@/request/api/article";
import loading from "@/layout/loading";
export default {
  data() {
    return {
      content: [],
      fileList: [],
      dataList: []
    };
  },
	components: {
	  loading,
	},
  methods: {
    back(){
      this.$router.go(-1)
    },
		
    _search(obj){
      let data = obj
      articleInt.concrete(data).then((res)=>{
        if (res.data.state == true) {
            let data = res.data.row;
            this.fileList = data.sysTbEnclosures;
            for (let item of this.fileList) {
              item.fileDown =
                showUrl +
                item.fileAddress +
                "?fileName=" +
                item.fileName;
            }
            this.dataList.push(data);
            console.log("数组列表", this.dataList);
            console.log("文件列表", this.fileList);
          } else {
            
          }
      })
    }
  },
  created() {
    let obj = this.$route.params;
    console.log(obj)
    this._search(obj)
  }
};
</script>

<style scoped>
.undefLine{
  background-color: #dddddd;
  width: 90%;
  height: 1px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.contentBox{
  width: 90%;
  margin: 0 auto;
}
.conBox{
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #ffffff;
  position: relative;
}
.backBox{
  padding-left: 30px;
}
.back{
  padding-left: 5px;
  display: inline-block;
}
.backtext{
  cursor: pointer;
}
.backtext:hover{
  color: #30d5b4;
}
.title{
  margin-bottom: 20px;
}
.titleCon {
  font-size: 28px;
  line-height: 32px;
  text-align: center;
}
.InfoCon {
  text-align: center;
  font-size: 14px;
  color: #666;
}
.author{
  margin-right: 10px;
  display: inline-block;
}
.fileBox{
  width: 90%;
  margin: 0 auto;
  margin-bottom: 30px;
}
.loading{
	position: relative;
	left: 50%;
}
</style>

