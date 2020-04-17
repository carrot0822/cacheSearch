<template>
  <div id="bookBlock">
    <div class="book-block">
      <div class="bookCtx">
        <div  @click="toDetail(data.fkCataBookId)" class="imgBox">
          <img  class="imgSize" :src="defaultImg">
        </div>
        <div class="textBox">
          <p @click="toDetail(data.fkCataBookId)" class="title">
            <span>{{data.name}}</span>
          </p>
          <p class="info">{{data.author}} {{data.fkPressName}}，1990.10 {{data.callNumber}}</p>
          <p class="buy">
            <i @click="dingdang" class="buyFont iconfont icon-dangdang"></i>
            <i @click="dong" class="buyFont iconfont icon-jingdong"></i>
            <i @click="Amazon" class="buyFont iconfont icon-amazon"></i>
          </p>
          <div class="touchBox">
            <span @click="toggleShow(data.fkCataBookId)" class="clickBox">馆藏信息</span>
            <span class="tranle"></span>
          </div>
        </div>
        <div class="number">
          <p>
            <img src="@/common/img/searchList/07.png" />
          </p>
          <p>馆藏总数：{{data.numOfSameCata}}本</p>
        </div>
      </div>
      <div class="bookself">
        <img :src="selfImg" />
      </div>
      <transition name="push">
        <div v-if="toggleValue" class="book-detail">
          <div class="selectBox">
            <el-form :model="selectForm" :inline="true">
              <el-form-item label="馆内状态:">
                <el-select style="width:160px;" v-model="selectForm.region" placeholder="请选择">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="在馆" value="1"></el-option>
                  <el-option label="借出" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="tableBox">
            <el-table header-cell-class-name="tableHead" :data="tableData" style="width: 100%">
              <el-table-column align="center" prop="code" label="条码号"></el-table-column>
              <el-table-column align="center" prop="name" label="索书号"></el-table-column>
              <el-table-column align="center" prop="address" label="所属分馆"></el-table-column>
              <el-table-column align="center" prop="place" label="馆藏所在地"></el-table-column>
              <el-table-column align="center" prop="filterLend" label="馆藏状态"></el-table-column>
              <el-table-column align="center" prop="planReturnTime" label="应还时间"></el-table-column>
              <el-table-column align="center" prop="renarks" label="备注"></el-table-column>
            </el-table>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { selectInt } from "@/request/api/search";
import {shop} from '@/layout/share.js'
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      defaultImg:require('../../public/cover.jpg'),
      selfImg: require("@/common/img/searchList/bookself.png"),
      sortValue: "",
      sortOptions: [
        {
          label: "匹配度升序",
          value: "1"
        }
      ],
      
      selectForm: {
        region: "0"
      },
      
      toggleValue: false,
      isRequest: false,
      allTable: [], // 所有数据
      inlib: [], // 在馆
      outlib: [], // 借出
      shopObj:null,
      
    };
  },
  computed: {
    tableData() {
      let arr = []
      switch (this.selectForm.region) {
        case '0':
          arr = this.allTable;
          break;
        case '1':
          arr = this.inlib;
          break;
        case '2':
          arr = this.outlib;
          break;
      }
      return arr
    }
  },
  methods: {
    toggleShow(id) {
      this.toggleValue = !this.toggleValue;
		let obj = {};
		obj.fkCataBookId = id;
		this._select(obj);
		/*
      if (!this.isRequest) {
        let obj = {};
        obj.fkCataBookId = id;
        this._select(obj);
      }
	  */
    },
    toDetail(id) {
      let bookId = id;
      console.log(id);
      this.$router.push({ path: `/searchDetail/${bookId}` });
    },
    _select(fkCataBookId) {
      let data = fkCataBookId;
      selectInt(data).then(res => {
        console.log("下拉", res);

        for (let item of res.data.row) {
          switch (item.lendState) {
            case 0:
              item.filterLend = "不在架";
              break;
            case 1:
              item.filterLend = "在架";
              break;
            case 2:
              item.filterLend = "借出";
              break;
            case 3:
              item.filterLend = "剔除";
              break;
            case 4:
              item.filterLend = "损坏";
          }
        }
        this.allTable = res.data.row;
        this.inlib = res.data.row.filter((obj)=>{
          return obj.lendState == 1
        })
        this.outlib = res.data.row.filter((obj)=>{
          return obj.lendState == 2
        })
        this.isRequest = true;
      });
    },
    dingdang() {
      this.shopObj.shopDing();
    },
    Amazon() {
      this.shopObj.shopAmazon();
    },
    dong() {
      this.shopObj.shopJing();
    }
  },
  mounted(){
    this.shopObj = new shop(this.data.name)
    this.toggleValue = false

  },
  
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/variables.scss';
#bookBlock {
  .book-block {
    position: relative;

    .bookCtx {
      padding-left: 38px;
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      position: relative;
      z-index: 5;
      bottom: -12px;
      .imgBox {
        width: 100px;
        height: 130px;
        background-color: #2a2a2a;
        margin-right: 25px;
        cursor: pointer;
        .imgSize{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .textBox {
        padding-top: 13px;
        .title {
          margin-bottom: 16px;
          color: #2a2a2a;
          font-size: 14px;
          font-weight: bold;
          span {
            cursor: pointer;
          }
        }
        .info {
          margin-bottom: 21px;
          color: #2a2a2a;
          font-size: 14px;
        }
        .buy {
          margin-bottom: 13px;
          
          
          .buyFont{
            color: #444;
            font-size: 32px;
            margin-right: 20px;
            display: inline-block;
            cursor: pointer;
            &:hover{
              color: $green;
            }
          }
        }
        .touchBox {
          position: relative;
          .clickBox {
            display: inline-block;
            color: #fff;
            font-size: 14px;
            line-height: 25px;
            width: 100px;
            height: 25px;
            background-color: #12b494;
            text-align: center;
            cursor: pointer;
            position: relative;
            z-index: 3;
          }
          .tranle {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 10px solid #24a25c;
            top: 10px;
            left: 95px;
          }
          .active {
            background-color: #6ac9b6;
          }
        }
      }
      .number {
        position: absolute;
        right: 30px;
      }
    }
    .bookself {
    }
    .book-detail {
    }
  }
}
</style>
<style>
#bookBlock .tableHead {
  height: 30px;
  background-color: #efefef;
  font-size: 14px;
  color: #2a2a2a;
}
</style>
