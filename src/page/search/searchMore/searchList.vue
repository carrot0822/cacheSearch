<template>
  <div id="searchList">
    <section class="searchBox">
      <search-input @emit-search="_searchto"></search-input>
    </section>
    <section class="changeBox">
      <div class="leftBox">
        <div class="change">
          <div class="tab bor">
            <i class></i>
            <span class="text">通借通还藏馆({{total}})</span>
          </div>
          <!-- <div class="tab ">
            <i class></i>
            <span class="text">本馆图书馆藏（12）</span>
          </div>-->
          <p class="searchData">
            共有
            <span style="color:#ff4a4a;">{{total}}</span>
            条记录
          </p>
        </div>
      </div>
     <!--  <div class="rightBox">
        <p class="rightText">
          <i></i>
          <span>排序方式</span>
        </p>
        <div class="selectBox">
          <el-select v-model="sortValue" placeholder="请选择排序方式">
            <el-option
              v-for="(item,index) in sortOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div> -->
    </section>
    <!-- 列表页 -->
    <section class="listPage">
      <div class="aside-left">
        <launch @son-click="searchPlace" :key=10 :dataArr="placeArr" :init="initArr[0]"></launch>
        <launch @son-click="searchIndex" :key=12 :dataArr="indexArr" :init="initArr[1]"></launch>
        <launch @son-click="searchauthor" :key=13 :dataArr="authorArr" :init="initArr[2]"></launch>
        <launch @son-click="searchpublicTime" :key=14 :dataArr="publicTimeArr" :init="initArr[3]"></launch>
        <launch @son-click="searchtype" :key=15 :dataArr="typeArr" :init="initArr[4]"></launch>
      </div>

      <div class="aside-right">
        <!--- 暂无数据 --->
        <div class="no-data" v-if="!collectionList.length">
         <img src="../../../common/img/no-data.jpg">
        </div>
        <!-- 数据展示 -->
        <div v-if="collectionList.length" class="rightBox">
          <!-- 分页器 -->
          <section class="pagation">
            <pagation
              :allData="total"
              :pageSize="pageSize"
              :current="currentPage"
              @pageChange="pageChangeBtn"
            ></pagation>
          </section>
          <section class="bookBox">
            <animation>
              <div
                class="protect"
                :data-index="index"
                v-for="(item,index) of collectionList"
                :key="index"
              >
                <book-block :data="item"></book-block>
              </div>
            </animation>
          </section>
        </div>
      </div>
    </section>
    <!-- 漂浮公告 -->
    <section class="noticeBox">
      <div class="notice">
        <div class="noticeBr top"></div>
        <div class="content">
          <p class="title">最新公告</p>
          <p class="text">
            <span class="circle"></span>giaogao
          </p>
          <p class="text">
            <span class="circle"></span>giaogao
            版权所有 copyright © www.kuiniu.com 智慧图
          </p>
        </div>
        <div class="noticeBr bottom"></div>
      </div>
    </section>
  </div>
</template>

<script>
const init = [
  {
    title: "所属馆",
    icon: "icon-tu"
  },
  {
    title: "文献类型",
    icon: "icon-wenxianku"
  },
  {
    title: "著作者",
    icon: "icon-zuozhe"
  },
  {
    title: "出版日期",
    icon: "icon-riqi1"
  },
  {
    title: "分类",
    icon: "icon-fenlei_"
  }
];
import SearchInput from "@/components/SearchInput";
import BookBlock from "@/components/bookBlock";
import launch from "@/components/launch";
import animation from "@/components/animate/listFade";
import pagation from "@/components/pagation";
import { searchInt } from "@/request/api/search";
export default {
  data() {
    return {
      launch: false, // 是否分类
      sortValue: "", // 数据排序
      tableData: [], // 渲染数据
      sortOptions: [
        {
          label: "匹配度升序",
          value: "1"
        },
        {
          label: "匹配度升序",
          value: "1"
        },
        {
          label: "匹配度升序",
          value: "1"
        },
        {
          label: "匹配度升序",
          value: "1"
        }
      ],
      // no-data数据
      noData:'',
      // 组件传递数据 馆藏列表
      collectionList: [],
      placeArr: [], // 馆藏地
      indexArr: [], // 索引类型
      authorArr: [], // 作者
      publicTimeArr: [], // 出版时间
      typeArr: [], // 出版时间
      initArr: [],
      condition: null, // 搜索条件缓存
      //分页器
      total: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    // 普通检索
    _searchto(val) {
      this.$router.push({ path: "searchList", query: val });
      this._allSearch(val);
    },
    // 附加馆藏地搜索
    searchPlace(val) {
      let obj = {};
      obj.libData = val;
      obj.currentPage = 1
      this.condition = Object.assign(this.condition, obj);
      this._allSearch(this.condition);
      console.log("合并之后的数据", this.condition, this.$route.query);
    },
    // 索引类型搜索
    searchIndex(val) {
      let obj = {};
      obj.documentTypeData = val;
      obj.currentPage = 1
      this.condition = Object.assign(this.condition, obj);
      this._allSearch(this.condition);
      console.log("合并之后的数据", this.condition, this.$route.query);
    },
    // 著作者搜索
    searchauthor() {
      let obj = {};
      obj.authorData = val;
      obj.currentPage = 1
      this.condition = Object.assign(this.condition, obj);
      this._allSearch(this.condition);
      console.log("合并之后的数据", this.condition, this.$route.query);
    },
    // 发布日期搜索
    searchpublicTime() {
      let obj = {};
      obj.publicationTimeData = val;
      obj.currentPage = 1
      this.condition = Object.assign(this.condition, obj);
      this._allSearch(this.condition);
      console.log("合并之后的数据", this.condition, this.$route.query);
    },
    // 类型搜索
    searchtype() {
      let obj = {};
      obj.typeData = val;
      obj.currentPage = 1
      this.condition = Object.assign(this.condition, obj);
      this._allSearch(this.condition);
      console.log("合并之后的数据", this.condition, this.$route.query);
    },
    // 全局搜索
    _allSearch(data) {
      let obj = data;
      searchInt.allSearchInt(data).then(res => {
        let data = res.data.row;
        this.collectionList = data.dataList;
        this.placeArr = data.libNum;
        this.indexArr = data.documentTypeNum;
        this.authorArr = data.authorNum;
        this.publicTimeArr = data.publicationTimeNum;
        this.typeArr = data.typeNum;
        this.total = res.data.total;
        console.log(res);
      });
    },
    // 匹配度排序
    // 分页按钮
    pageChangeBtn(val) {
      let obj = {};
      obj.currentPage = val;
      this.condition = Object.assign(this.condition, obj);

      this._allSearch(this.condition);
      console.log("当前页码", val, this.$route);
    }
  },
  components: {
    SearchInput,
    BookBlock,
    launch,
    animation,
    pagation
  },
  created() {
    let container = this.$route.query;
    this.pageSize = Number(container.pageSize);
    this.currentPage = Number(container.currentPage);
    this.condition = container;
    console.log("起始数据", this.condition);
    this._allSearch(this.condition);
    this.initArr = init;
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/variables.scss';
#searchList {
  .searchBox {
    width: 1200px;
    margin-bottom: 30px;
  }
  .changeBox {
    border-bottom: 2px solid #12b494;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .leftBox {
      .change {
        display: flex;
        flex-direction: row;

        .tab {
          border: solid 2px #12b494;
          border-right: none;
          border-bottom: none;
          color: #2a2a2a;
          font-size: 20px;
          font-weight: bold;
          padding: 18px 24px 12px 24px;
          cursor: pointer;
          width: 260px;
          box-sizing: border-box;
        }
        .active {
          color: #129f83;
        }
        .bor {
          border-right: solid 2px #12b494;
        }
        .searchData {
          padding: 28px 0px 12px 14px;
          color: #898989;
          font-size: 14px;
        }
      }
    }
    .rightBox {
      display: flex;
      flex-direction: row;
      .rightText {
        color: #2a2a2a;
        font-size: 16px;
        padding-top: 21px;
        padding-right: 10px;
      }
      .selectBox {
        padding-top: 8px;
        width: 170px;
      }
    }
  }
  .listPage {
    padding-top: 5px;
    display: flex;
    flex-direction: row;
    .aside-left {
      width: 247px;
    }
    .aside-right {
      margin-left: 32px;
      position: relative;
      min-height: 143px;
      width: 75%;
      .no-data {
        img{
          padding-left: 100px;
          object-fit: cover;
          width: 800px;
        }
      }
      .rightBox {
        .pagation {
          height: 40px;
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
        }
        .bookBox {
          .protect {
          }
        }
      }
    }
  }
    .noticeBox {
    position: fixed;
    top: 35%;
    right: 20px;

    .notice {
      .noticeBr {
        width: 315px;
        height: 18px;
        border-radius: 5px;
      }
      .top {
        background-color: #09bd99;
      }
      .bottom {
        background-color: #38df93;
      }
      .content {
        width: 280px;
        padding-top: 13px;
        padding-bottom: 23px;
        margin: 0 auto;
        min-height: 220px;
        border: 3px solid;
        border-top: none;
        border-bottom: none;
        box-sizing: border-box;
        border-image: repeating-linear-gradient(45deg, #09bd99, #38df93 30px) 60;
        .title {
          font-size: 14px;
          color: #ff2424;
          padding-left: 14px;
          margin-bottom: 10px;
        }
        .text {
          padding: 0 18px;
          line-height: 27px;
          width: 100%;
          box-sizing: border-box;
          cursor: pointer;
          word-break: break-all;
          .circle {
            width: 6px;
            height: 6px;
            background-color: $green;
            border-radius: 50%;
            display: inline-block;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
.selectBox {
}
</style>

