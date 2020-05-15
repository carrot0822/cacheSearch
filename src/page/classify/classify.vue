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
            <p>所属馆：夔牛图书馆</p>
            <p>文献类型：图书</p>
			<P class="data">
			  数据总数：
			  <span class="red">{{totalNumber}}种</span>
			</P>
          </div>
        </div>
        <!-- <div class="selectBox">
          <div class="select">
            <el-form :model="selectForm" label-width="85px" class="demo-ruleForm">
              <el-form-item label="所属馆：">
                <div class="size">
                  <el-select @change="libNumChange" v-model="selectForm.libNum" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in libNumOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="文献类型：">
                <div class="size">
                  <el-select @change="indexChange" v-model="selectForm.documentTypeNum" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in indexOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
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
        </div> -->
        <!-- 树形菜单 -->
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
                    <span class="name">{{item.code}}-{{item.name}}</span>
                    <span class="red">({{item.num}})</span>
                  </div>
                </div>
                <el-collapse-transition>
                  <div class="hideSon" v-show="launch == index">
                    <p v-for="(son,num) of item.list" :key="num">
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
        <div style="width:920px; text-align: center;" v-if="!collectionList.length" >
          <img width="400px" height="400px"  :src="imgData" />
          <!-- <img width="400px" height="400px"  src="../../common/img/no-data.jpg" /> -->
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

import { searchInt } from "@/request/api/search";
import BookBlock from "@/components/bookBlock";
import loading from "@/layout/loading";
import animation from "@/components/animate/listFade";
import pagation from "@/components/pagation";
const classArr = [""];
export default {
  data() {
    return {
      imgData:require('../../common/img/no-data.jpg'),
      selectForm: {
        libNum: "全部",
        documentTypeNum: "全部",
      },
      treeArr: [], // 树形菜单数组
      libNumOptions: [], // 图书馆下拉数据
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
      // 类别 
      typeObj:{
        libData:"",
        documentTypeData:""
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
      obj.currentPage = parseInt(val);
			
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
      this.searchRea = Object.assign(this.searchRea,obj,this.typeObj)
      console.log("传递的值", obj);
      this._allSearch(this.searchRea);
    },
    libNumChange(val){
      console.log(val)
      this.typeObj.documentTypeData = this.selectForm.documentTypeNum=="全部"?"":this.selectForm.documentTypeNum
      this.typeObj.libData = val =="全部"?"":val;
      this._testCollect(this.typeObj) 
      console.log(this.typeObj)
    },
    indexChange(val){
      this.typeObj.libData = this.selectForm.libNum == "全部"?"":this.selectForm.libNum
      this.typeObj.documentTypeData = val == "全部"?"":val;
      this._testCollect(this.typeObj) 
      console.log(val)
    },
    /*------ api ------*/
    // 项目初始化 下拉框数据
		initData(){
      let data={bop:0}
			searchInt.allSearchInt(data).then(res => {
        /* let data = res.data.row;
        this.collectionList = data.dataList;
        this.total = res.data.total; */
        console.log('初始化',res)
        let data = res.data.row
        let addObj = {
          name:'全部',
          value:0
        }
        this.libNumOptions = data.libNum
        this.libNumOptions.unshift(addObj)
        this.indexOptions = data.documentTypeNum
        this.indexOptions.unshift(addObj)
        
      });
		},
    // 测试数据 中图分类法 树形数据
    _testCollect(data={bop:0}){
      let obj = data
      searchInt.testCollect(obj).then((res)=>{
        if(res.data.state){
          let result = res.data.rows.sort(this._sortTool('code'))
          console.log('过滤的结果',result)
          this.treeArr = result
          this.totalNumber = res.data.row
          this.loading = false;
          console.log()
          console.log(this.treeArr,this.totalNumber,'没执行吗？')
        }else{
          this.loading = false;
          this.messageFix.error(res.data.msg)
        }
        console.log(res.data.state,'？？？')
        console.log(res,'新版中图')
      })
    },
    // 检索
    _allSearch(data={bop:0}) {
      let obj = data;
      searchInt.allSearchInt(obj).then(res => {
        let data = res.data.row;
		    this.collectionList = []
        this.collectionList = data.dataList;
        this.total = res.data.total;
        console.log(res);
      });
    },
    /*------ 过滤 ------*/
    // 过滤工具函数
    _sortTool(property){
      return function(a,b){
        var value1 = a[property]
        var value2 = b[property]
        if(value1<value2){
          return -1
        } else if(value1 >value2){
          return 1
        } else{
          return 0
        }
      }
    }
    /**
     * 返回一个带对象的24个数据数组
     */

  },
  created() {
    let testArr= [{code:'F'},{code:'B'},{code:'D'}]
    let result = testArr.sort(this._sortTool('code'))
    console.log(result,'结果呢')
    this.initData()
    this._testCollect()
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
      height: 734px;
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
// 会被删除的样式
#classify .select p{
  padding-left: 20px;
  padding-bottom: 20px;
}
</style>




