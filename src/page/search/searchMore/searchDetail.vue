<template>
  <div id="detail">
    <section class="titleBox">
      <div class="titleCtx">
        <p class="title fl">{{bookData.name}}</p>
        <p class="back fr" @click="back">返回</p>
      </div>
    </section>
    <section class="bookBox">
      <div class="bookCtx">
        <div class="imgBox">
          <img :src="defaultImg">
        </div>
        <div class="info">
          <p class="stage">
            <span class="distance">作者：</span>
            {{bookData.author}}
          </p>
          <p class="stage">
            <span class="distance">出版社：</span>
            {{bookData.fkPressName}}
          </p>
          <p class="stage">
            <span class="distance">译者：</span>
          </p>
          <p class="stage">
            <span class="distance">出版日期：</span>
            {{bookData.publishingTime}}
          </p>
          <p class="stage">
            <span class="distance">分类号：</span>
            {{bookData.fkTypeCode}}
          </p>
          <p class="stage">
            <span class="distance">ISBN：</span>
            {{bookData.isbn}}
          </p>
          <!-- <p class="stage">
            <span class="distance">索书号：</span>
            {{bookData.codeNumber}}
          </p> -->
          <p class="stage">
            <span class="distance">价格：</span>
            {{bookData.price}}
          </p>
        </div>
        <div class="context">
          <p class="stage">
            <span class="distance">相关资源</span>
						<span>无</span>
          </p>
          <p style="margin-bottom: 10px;">内容简介</p>
          <p class="content">{{bookData.introduction}}</p>
        </div>
        <!-- 侧边组件警告 -->
        <div class="operateBox">
          <div class="iconBox">
            <div class="share">
              <div class="shareIcon">
                <p class="size">
                  <i class="size el-icon-share"></i>
                </p>
                <p>
                  <span>分享</span>
                </p>
              </div>
              <div class="select">
                <sharebook :url="url" :title="title"></sharebook>
              </div>
            </div>
            <div class="collect" @click="collectBtn">
              <p class="size">
                <i :style="{color:isCollect?'#f15a4a':'#757575'}" class="el-icon-star-on"></i>
              </p>
              <p>
                <span :style="{color:isCollect?'#f15a4a':'#757575'}">收藏</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 馆藏信息 -->
    <section class="book-detail">
      <div class="touchBox">
        <span class="clickBox">馆藏信息</span>
        <span class="tranle"></span>
      </div>

      <div class="book-content">
        <div class="selectBox">
          <el-form :model="selectForm" :inline="true">
            <el-form-item label="馆内状态:">
              <el-select style="width:160px;" v-model="selectForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
                <el-option label="在架" value="1"></el-option>
                <el-option label="借出" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableBox">
          <el-table header-cell-class-name="tableHead" :data="tableData" style="width: 100%">
            <el-table-column align="center" prop="code" label="条码号"></el-table-column>
            <el-table-column align="center" prop="callNumber" label="索书号"></el-table-column>
            <el-table-column align="center" prop="place" label="所属分馆"></el-table-column>
            <el-table-column align="center" prop="locationNam" label="馆藏所在地"></el-table-column>
            <el-table-column align="center" prop="filterLend" label="馆藏状态"></el-table-column>
            <el-table-column align="center" prop="planReturnTime" label="应还时间"></el-table-column>
            <el-table-column align="center" prop="renarks" label="备注"></el-table-column>
            <el-table-column align="center" prop="renarks" label="操作">
              <template slot-scope="scope">
                <span class="preBtn" @click="orderBtn(scope.row)" style="margin-left: 10px">预约</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const ip = window.url
import { detailInt, selectInt } from "@/request/api/search";
import { orderInt, collectInt } from "@/request/api/collect";
import sharebook from '@/layout/share.vue'
import { type } from "os";

export default {
  name: "detail",
  data() {
    return {
      
      selectForm: {
        region: "0"
      },
      defaultImg:require('../../../../public/cover.jpg'),
      isOutput: true, // 控制是否渲染
      bookData: {}, // 书籍数据
      bokId: "", // 书籍ID
      isCollect: false, // 控制收藏点击事件
      shareShow: false, // 控制分享框的显隐
      allTable: [], // 所有数据
      inlib: [], // 在馆
      outlib: [], // 借出
      // 分享的数据
      title:'',
      url:"",
      imgUrl:"",
    };
  },
  components:{
    sharebook
  },
  computed: {
    hasLogin() {
      console.log(this.$store.state.token);
      return this.$store.state.token ? true : false;
    },
    tableData() {
      let arr = [];
      switch (this.selectForm.region) {
        case "0":
          arr = this.allTable;
          break;
        case "1":
          arr = this.inlib;
          break;
        case "2":
          arr = this.outlib;
          break;
      }
      return arr;
    }
  },
  methods: {
    collectBtn() {
      if (this.hasLogin) {
        if (this.isCollect) {
          this._outCollect(this.bookId);
        } else {
          this._collect(this.bookId);
          console.log("??????");
        }
      } else {
        this.messageFix.error("请先登录");
      }
    },
    // 预约
    orderBtn(row) {
      if (this.hasLogin) {
        let obj = {};
        obj.bookId = row.id;
        this._order(obj);
      } else {
        this.messageFix.error("请先登录");
      }
      console.log("预约", row);
    },
    back() {
      this.$router.go(-1);
    },
    /*------ api ------*/
    // 预约
    _order(obj) {
      let data = obj;
      orderInt(data).then(res => {
        console.log(res);
        if (res.data.state == true) {
          this.messageFix.success("预约成功");
        } else {
          this.messageFix.error(res.data.msg);
        }
      });
    },
    // 详情查询
    _detail(id) {
      let data = id;
      detailInt(data).then(res => {
        console.log("详情", res);
        this.bookData = res.data.row;
        this.title = res.data.row.name
        console.log(this.title,'我要标题')
      });
    },
    // 简单查询
    _select(fkCataBookId) {
      let data = fkCataBookId;
      selectInt(data).then(res => {
        console.log("下拉", res);
        if (res.data.state == true) {
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
          this.inlib = res.data.row.filter(obj => {
            return obj.lendState == 1;
          });
          this.outlib = res.data.row.filter(obj => {
            return obj.lendState == 2;
          });
        }
      });
    },
    // 用户是否收藏
    _isCollect(id) {
      let data = id;
      collectInt.check(data).then(res => {
        console.log("是否收藏", res, typeof res.data.code);

        if (res.data.state == true) {
          if (res.data.code == 200) {
            this.isCollect = true;
          } else {
            this.isCollect = false;
          }
        } else {
        }
        console.log(this.isCollect);
      });
    },
    // 收藏
    _collect(id) {
      let obj = {
        fkBookId: id
      };
      collectInt.collect(obj).then(res => {
        console.log("收藏", res);
        if (res.data.state) {
          this.isCollect = true;
          this.messageFix.success("收藏成功");
        } else {
        }
      });
    },
    // 取消收藏
    _outCollect(id) {
      let arr = [];
      arr.push(id);
      collectInt.delect(arr).then(res => {
        console.log("取消收藏", res);
        if (res.data.state) {
          this.isCollect = false;
          this.messageFix.success("取消收藏成功");
        } else {
        }
      });
    }
  },
  created() {
    console.log("让我康康", this.hasLogin);
    let id = this.$route.params;
    this.url = ip  + '#' +this.$route.fullPath
    console.log(this.$route,'我要路由',this.url)
    this.bookId = id.id;
    let obj = {};
    obj.fkCataBookId = id.id;
    this._detail(id);
    this._select(obj);
    if (this.hasLogin) {
      this._isCollect(id);
    }
  }
};
</script>

<style lang="scss" scoped>
#detail {
  padding: 0 10px;
  .titleBox {
    .titleCtx {
      min-height: 40px;

      .title {
        color: #2a2a2a;
        font-size: 24px;
        font-weight: bold;
      }
      .back {
        font-size: 16px;
        color: #040404;
        cursor: pointer;
      }
    }
  }
  .bookBox {
    .bookCtx {
      min-height: 220px;
      position: relative;
      display: flex;
      flex-direction: row;
      .imgBox {
        width: 170px;
        height: 221px;
        
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info {
        width: 410px;
        margin-left: 30px;
        .stage {
          font-size: 14px;
          color: #2a2a2a;
          margin-bottom: 16px;
          .distance {
            display: inline-block;
            width: 70px;
          }
        }
      }
      .context {
        .stage {
          font-size: 14px;
          color: #2a2a2a;
          margin-bottom: 16px;
          .distance {
            display: inline-block;
            width: 70px;
          }
        }
        .content {
					text-indent: 24px;
          width: 315px;
					line-height: 24px;
        }
      }
      .operateBox {
        .iconBox {
          position: absolute;
          right: 0;
          bottom: 0;
          .share {
            margin-bottom: 17px;
            width: 64px;
            height: 64px;
            position: relative;
            &:hover {
              .select {
                width: 170px;
                opacity: 1;
              }
            }
            .shareIcon {
              width: 64px;
              height: 64px;
              background-color: #ffffff;
              border-radius: 10px;
              border: solid 1px #12b494;
              position: absolute;
              color: #12b494;
              z-index: 3;
              cursor: pointer;
              text-align: center;

              .size {
                font-size: 40px;
              }
            }
            .select {
              position: absolute;
              background-color: rgba(0, 0, 0, 0.2);
              width: 0px;
              opacity: 0;
              overflow: hidden;
              height: 64px;
              z-index: 1;
              right: 56px;
              
              box-sizing: border-box;
              padding: 15px 0px;
              padding-right: 13px;
              padding-left: 10px;
              transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
            }
          }
          .collect {
            width: 64px;
            height: 64px;
            background-color: #ffffff;
            border-radius: 10px;
            border: solid 1px #f15a4a;
            color: #f15a4a;
            text-align: center;
            cursor: pointer;
            .size {
              font-size: 40px;
            }
          }
        }
        .order {
          position: absolute;
          right: 97px;
          bottom: 0;
          font-size: 16px;
          color: #ffffff;
          background-color: #fca377;
          padding: 0 18px;
          height: 28px;
          line-height: 28px;
          cursor: pointer;
        }
      }
    }
  }
  .book-detail {
    padding-top: 20px;
    
    transition: height 3s;
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
    .book-content {
      padding-top: 20px;
    }

    .tableBox {
      .preBtn {
        cursor: pointer;
      }
    }
  }
}
</style>


<style>
#detail .tableHead {
  height: 30px;
  background-color: #efefef;
  font-size: 14px;
  color: #2a2a2a;
}
</style>
