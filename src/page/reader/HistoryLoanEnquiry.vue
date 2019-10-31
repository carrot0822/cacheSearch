<template>
  <div id="HistoryLoanEnquiry" class="ReaderCenter zyfPage haveTablePage">
    <div class="flexLayoutRow">
      <div class="title flexLayoutRow">
        <img :src="titleIcon" class="titleImg" />
        <div class="titleFont">历史借阅查询</div>
      </div>
      <div></div>
    </div>

    <div class="flexLayoutColumn">
      <div class="flexLayoutRow">
        <div></div>
        <el-form
          :model="ruleForm"
          status-icon
          class="demo-ruleForm flexLayoutRow"
          style="height: 35px"
        >
          <el-form-item label="创建时间：" label-width="110px" class="dateInput">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              format="yyyy-MM-dd"
              value-format="timestamp"
              :picker-options="pickerOptions0"
              v-model="ruleForm.startTime"
            ></el-date-picker>
            <span style="padding:0px 5px 0px 2px">-</span>
            <el-date-picker
              type="date"
              placeholder="结束时间"
              format="yyyy-MM-dd"
              value-format="timestamp"
              :picker-options="pickerOptions1"
              v-model="ruleForm.endTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ruleForm.bookName" placeholder="请输入书名" clearable class="textInput"></el-input>
          </el-form-item>
          <span class="serchBtn" @click="searchApi">搜索</span>
        </el-form>
      </div>
      <div class="flexLayoutRow">
        <div></div>
        <div class="flexLayoutRow pagingDiv pagingBut" style="margin-top: 15px">
          <el-button plain @click="homePageBtn">首页</el-button>
          <el-button plain @click="previousPageBtn">上一页</el-button>
          <el-button plain @click="nextPageBtn">下一页</el-button>
          <el-button plain @click="lastPageBtn">尾页</el-button>
          <input type="text" class="pageInput" v-model="currentPage" />
          <el-button plain @click="jumpBtn">跳转</el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 5px" class="tableStyle">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="bookName" :show-overflow-tooltip="true" label="书名"></el-table-column>
        <el-table-column prop="fkCardNumber" :show-overflow-tooltip="true" label="读者卡号"></el-table-column>
        <el-table-column prop="libraryBookCode" :show-overflow-tooltip="true" label="馆内码"></el-table-column>
        <el-table-column prop="createTime" :show-overflow-tooltip="true" label="创建时间"></el-table-column>
        <el-table-column prop="planReturnTime" :show-overflow-tooltip="true" label="计划归还时间"></el-table-column>
        <el-table-column prop="realityReturnTime" :show-overflow-tooltip="true" label="实际归还时间"></el-table-column>
        <el-table-column label="可借阅次数" prop="renewCount">
          <template slot-scope="scope">
            <span>{{scope.row.renewCount}}次</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { hisRenewFun } from "@/request/api/readerCenter";
import {format} from '@/common/js/util'
export default {
  data() {
    return {
      titleIcon: require("../../common/img/borrowIcon/newBook.png"),
      ruleForm: {
        startTime: "", //开始时间
        endTime: "", //结束时间
        bookName: "" //书名
      },
      pageSize: 13,
      currentPage: 1,
      Total: 0,
      tableData: [],
      pickerOptions0: {
        disabledDate: time => {
          if (this.ruleForm.endTime) {
            return;

            time.getTime() > this.ruleForm.endTime;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          if (this.ruleForm.startTime) {
            return (
              time.getTime() < this.ruleForm.startTime ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      }
    };
  },
  computed:{
    filterForm(){
      let obj = {}
      obj.startTime = this.ruleForm.startTime?format(this.ruleForm.startTime,'yyyy-MM-dd'):''
      obj.endTime = this.ruleForm.endTime ?format(this.ruleForm.endTime,'yyyy-MM-dd'):''
      return obj
    }
  },
  methods: {
    searchApi() {
      hisRenewFun(
        this.ruleForm.bookName,
        this.ruleForm.startTime,
        this.ruleForm.endTime,
        this.pageSize,
        this.currentPage
      ).then(res => {
        console.log("查询历史借阅记录返回的数据", res);
        if (res.data.state == true) {
          this.tableData = res.data.row;
          this.Total = res.data.total;
        } else {
          this.messageFix.error(res.data.msg);
        }
      });
    },
    //首页跳转按钮
    homePageBtn() {
      this.currentPage = 1;
      this.searchApi(this.currentPage);
    },
    //尾页跳转按钮
    lastPageBtn() {
      if (this.Total > 13) {
        this.currentPage = Math.ceil(this.Total / 13);
      } else {
        this.currentPage = 1;
      }
      this.searchApi(this.currentPage);
    },
    //上一页跳转按钮
    previousPageBtn() {
      if (this.currentPage == 1) {
        return;
      } else {
        this.currentPage--;
        this.searchApi(this.currentPage);
      }
    },
    //下一页跳转按钮
    nextPageBtn() {
      if (this.currentPage === Math.ceil(this.Total / 13)) {
        console.log("页面不进行跳转");
      } else {
        this.currentPage++;
        this.searchApi(this.currentPage);
      }
    },
    //依据页码跳转的按钮
    jumpBtn() {
      if (!this.currentPage || this.currentPage == 0) {
        this.currentPage = 1;
      } else {
        let ym = Math.round(this.currentPage);
        this.currentPage = ym;
      }
      this.searchApi(this.currentPage);
    }
  },
  created() {
    this.searchApi();
  }
};
</script>

<style scoped>
.serchBtn {
  height: 30px;
  width: 60px;
  line-height: 30px;
  background-color: #12b494;
  color: white;
  margin-top: 5px;
  border-radius: 3px;
  margin-left: 5px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
}
.serchBtn:hover {
  background-color: #12b494a6;
}
</style>
