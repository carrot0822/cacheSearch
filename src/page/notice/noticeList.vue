<template>
  <div id="Notice">
    <section class="title">
      <P 公告列表></P>
    </section>
    <section class="pagation">

    </section>
    <section class="articleBox">
      <div class="list">
        <div class="contentBox">
          <div class="infoBox">
            <div class="title">
              shijian
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { articleInt } from "@/request/api/article";

export default {
  data() {
    return {
      /*====== 2.0表单搜索区域 ======*/
      searchForm: {
        // 接受搜索表单的数据
        name: "",
        beginTime: "",
        endTime: "",

      },
      tableLoading: true,
      currentPage: 1,
      pageInput: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    };
  },
  methods: {
    // 查询按钮

    // 跳转按钮
    jumpArticle(id){
      this.$router.push({path:`/article/${id}`})
      console.log(id)
    },
    /*------ Api ------*/
    _search(obj){
      let data = obj
      articleInt.allList(data).then((res) => {
        console.log('文章列表',res)
      })
    }
  },
  created() {
    this._search()
  }
};
</script>

<style scoped>
#Notice {
  background: #ffffff;
  padding: 30px;
}
#Notice .searchBox{
    display: flex;
    justify-content: space-between;
}
.sonTitle .titleName {
  border-left: 4px solid #0096ff;
  padding-left: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(135, 135, 135, 1);
  display: inline-block;
  margin-bottom: 33px;
}
.page_div {
  text-align: center;
  margin-top: 30px;
}
.confirm_bt {
  display: inline-block;
  text-align: center;
  width: 70px;
  padding: 8px 8px;
}

.button_s {
  width: 90px;
  font-size: 16px;
  text-align: center;
}

#loginrecord {
  background: #ffffff;
}

.time_p {
  margin-left: 30px;
}

/*.el-select-dropdown__item {*/
/*color: #878787;*/
/*}*/
.operate{
  cursor: pointer;
}
.textLeft{
  text-align: left;
}
/* .textLeft:hover{
  color: #1e9eff;
  cursor: pointer;
} */
#title {
  display: inline-block;
  padding-left: 10px;
  border-left: 5px solid #1e9eff;
  color: #878787;
}

#loginrecord .el-table {
  border: 1px solid #eaeaea;
  /*border-width: 0 1px 1px 1px ;*/
  border-bottom: 0;
}
.buttonBox .add {
    background: rgba(255, 146, 49, 1);
    border-radius: 10px;
    margin-right: 30px;
}
.buttonBox .add .addIcon {
  margin-right: 6px;
}
.buttonBox button {
    padding-left: 18px;
    padding-right: 18px;
    height: 40px;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: none;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
}
</style>
