<template>
  <div id="classify">
    <div class="classifyBox">
      <aside class="leftBox">
        <div class="title">
          <i class="icon iconfont icon-fenleidaohang"></i>
          <span class="text">分类导航</span>
        </div>
        <div class="selectBox">
          <div class="select">
            <el-form :model="selectForm" label-width="85px" class="demo-ruleForm">
              <el-form-item label="所属馆：">
                <div class="size">
                  <el-select v-model="selectForm.embassyValue" placeholder="请选择">
                    <el-option
                      v-for="item in embassy"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="文献类型：">
                <div class="size">
                  <el-select v-model="selectForm.indexValue" placeholder="请选择">
                    <el-option
                      v-for="item in indexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <P class="data">
            数据总数：
            <span class="red">{{totalNumber}}种</span>
          </P>
        </div>
        <div class="searchEnd">
          <el-scrollbar style="height:100%">
            <div class="loadingBox">
              <loading :loading="loading"></loading>
            </div>

            <div class="treeBox" v-if="treeArr.length">
              <div class="tree-block" v-for="(item,index) of treeArr" :key="index">
                <div class="fatherBox">
                  <i class="icon iconfont icon-kinds" @click="openBtn(index)"></i>
                  <div @click="searchBtn(item)" class="flex">
                    <span class="name">{{item.letter}}-{{item.title}}</span>
                    <span class="red">({{item.number}})</span>
                  </div>
                </div>
                <el-collapse-transition>
                  <div class="hideSon" v-show="launch == index">
                    <p v-for="(son,num) of item.children" :key="num">
                      <span @click="searchBtn(son)">{{son.code}}-{{son.name}}</span>
                      <span class="red">({{son.num}})</span>
                    </p>
                  </div>
                </el-collapse-transition>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </aside>
      <!-- 右边的盒子 -->
      <section class="rightBox">
        <!-- <el-scrollbar style="height:100%">
          
        </el-scrollbar>-->
        <div v-if="!collectionList.length" >
          暂无数据 中图分类啊卡卡
        </div>
        <div class="content-class" v-if="collectionList.length">
          <div class="pagation">
            <pagation
              :allData="total"
              :pageSize="pageSize"
              :current="currentPage"
              @pageChange="pageChangeBtn"
            ></pagation>
          </div>
          <div  class="detailBox">
            <animation>
              <div
                v-bind:data-index="index"
                class="protect"
                v-for="(item,index) of collectionList"
                :key="index"
              >
                <book-block :data="item"></book-block>
              </div>
            </animation>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const typeArr = [
  "马列主义毛邓思想",
  "哲学、宗教",
  "社会科学总论",
  "政治、法律",
  "军事",
  "经济",
  "文化、科学、教育、体育",
  "语言、文字",
  "文学",
  "艺术",
  "历史、地理",
  "自然科学总论",
  "数理科学和化学",
  "天文学、地球科学",
  "生物科学",
  "医药、卫生",
  "农业科学",
  "工业技术",
  "交通运输",
  "航空、航天",
  "环境科学、安全科学",
  "综合性图书"
];
import { searchInt } from "@/request/api/search";
import { getBigLetter } from "@/common/js/util";
import BookBlock from "@/components/bookBlock";
import loading from "@/layout/loading";
import animation from "@/components/animate/listFade";
import pagation from "@/components/pagation";
const classArr = [""];
export default {
  data() {
    return {
      selectForm: {
        embassyValue: "",
        indexValue: ""
      },
      treeArr: [], // 树形菜单数组
      embassy: [], // 文献下拉数据
      indexOptions: [], // 索引下拉数据
      totalNumber: 0, // 总本书缓存变量
      launch: -1,
      isOpen: false,
      loading: true,
      collectionList: [], //
      // 搜索的条件
      searchRea: {
        pageSize:10,
        currentPage:1
      },
      // 分页数据
      total:0,
      pageSize:10,
      currentPage:1
    };
  },
  components: {
    BookBlock,
    loading,
    animation,
    pagation
  },
  methods: {
    pageChangeBtn(val){
      let obj = {};
      obj.currentPage = 1;
      this.searchRea = Object.assign(this.searchRea,obj)
      this._allSearch(this.searchRea);
      console.log(val)
    },
    /*------ opation ------*/
    openBtn(index) {
      if (this.launch == index) {
        this.launch = -1;
      } else {
        this.launch = index;
      }
    },
    searchBtn(val) {
      let obj = {};
      obj.typeCode = val.code;
      obj.currentPage = 1;
      this.searchRea = Object.assign(this.searchRea,obj)
      console.log("传递的值", obj);
      this._allSearch(this.searchRea);
    },
    /*------ api ------*/
    // 中图分类法
    _collect() {
      searchInt.collectInt().then(res => {
        console.log("中图分类法", res.data.row);
        this.treeArr = this._Fcollect(res.data.row);
        this.loading = false;
      });
    },
    // 检索
    _allSearch(data) {
      let obj = data;
      searchInt.allSearchInt(data).then(res => {
        let data = res.data.row;
        this.collectionList = data.dataList;
        this.total = res.data.total;
        console.log(res);
      });
    },
    /*------ 过滤 ------*/
    _Fcollect(arr) {
      let contrast = this.initArr();

      let twoC = contrast.length;
      let oneC = arr.length;
      for (let i = 0; i < oneC; i++) {
        this.totalNumber += arr[i].num;
        for (let j = 0; j < twoC; j++) {
          let str = arr[i].code;
          let conStr = contrast[j].code;
          if (str.indexOf(conStr) != -1) {
            contrast[j].number += arr[i].num;
            contrast[j].children.push(arr[i]);
          }
        }
      }
      console.log(this.totalNumber);
      console.log("过滤后", contrast);
      return contrast;
    },
    initArr() {
      let arr = [];
      let type = typeArr;
      let letter = getBigLetter(); // 26个初始字母
      letter.splice(11, 1);
      letter.splice(12, 1);
      letter.splice(-2, 1);
      letter.splice(-4, 1);
      for (let i = 0; i < letter.length; i++) {
        let obj = {};
        obj.code = letter[i];
        obj.title = type[i];
        obj.number = 0;
        obj.children = [];
        arr.push(obj);
      }

      return arr;
    }
  },
  created() {
    this._collect();
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variables.scss";
#classify {
  .classifyBox {
    display: flex;
    flex-direction: row;
    .leftBox {
      width: 260px;
      border: solid 1px $green;
      position: relative;
      margin-right: 20px;
      .title {
        background-color: $green;
        height: 66px;
        text-align: left;
        padding-left: 30px;
        line-height: 66px;
        color: #ffffff;
        .text {
          margin-left: 30px;
          font-size: 18px;
        }
        .icon {
          font-size: 18px;
          color: #ffffff;
        }
      }
      .selectBox {
        padding-top: 26px;
        padding-bottom: 24px;
        background-color: $lowGreen;
        border-bottom: 1px solid $green;
        .data {
          color: $green;
          font-size: 14px;
          padding-left: 16px;
          .red {
            color: $red;
          }
        }
      }
      .searchEnd {
        height: 500px;
        position: relative;
        .loadingBox {
          position: absolute;
          top: 200px;
          left: 80px;
        }
        .treeBox {
          padding-top: 12px;

          .tree-block {
            margin-bottom: 12px;
            .fatherBox {
              padding-left: 14px;
              margin-bottom: 12px;
              display: flex;
              flex-direction: row;
              .icon {
                font-size: 18px;
                color: $green;
              }
              .flex {
                cursor: pointer;
                .name {
                  font-size: 14px;
                  color: $green;
                }
                .red {
                  font-size: 14px;
                  color: $red;
                  margin-left: 5px;
                }
              }
              .icon {
                margin-right: 12px;
                cursor: pointer;
              }
            }
            .hideSon {
              padding-left: 57px;
              p {
                margin-bottom: 10px;
                font-size: 14px;
                line-height: 18px;
                color: $green;
                cursor: pointer;
                .red {
                  color: $red;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
    /* 右侧盒子 */
    .rightBox {
      
      border-bottom: 1px solid $green;
    }
  }
}
</style>
<style lang="scss">
@import "@/common/scss/variables.scss";
#classify {
  .el-select .el-input {
    width: 130px;
  }
  .el-form-item {
    margin-bottom: 10px;
    .el-form-item__label {
      color: $green;
      padding: 0;
    }
  }

  .el-input__inner {
    height: 30px;
    border-color: $green;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>




