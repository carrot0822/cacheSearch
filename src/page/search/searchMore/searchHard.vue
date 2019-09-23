<template>
  <div id="hardSearch">
    <div class="borderBox">
      <section class="search">
        <div class="inputBox">
          <el-input placeholder="请输入搜索内容" v-model="searchForm.one" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option
                v-for="(item,index) of optionsArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button @click="searchBtn" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入搜索内容" v-model="searchForm.two" class="input-with-select">
            <el-select v-model="select2" slot="prepend" placeholder="请选择">
              <el-option
                v-for="(item,index) of optionsArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-input>
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入搜索内容" v-model="searchForm.three" class="input-with-select">
            <el-select v-model="select3" slot="prepend" placeholder="请选择">
              <el-option
                v-for="(item,index) of optionsArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-input>
        </div>
      </section>
      <section class="basicReason">
        <p class="title">基本条件</p>
        <div class="selectBox">
          <span class="text">语言种类：</span>
          <el-radio-group v-model="language">
            <el-radio :label="''">全部</el-radio>
            <el-radio :label="'汉语'">汉语</el-radio>
            <el-radio :label="'英语'">英语</el-radio>
            <el-radio :label="'法语'">法语</el-radio>
            <el-radio :label="'德语'">德语</el-radio>
            <el-radio :label="'日语'">日语</el-radio>
            <el-radio :label="'俄语'">俄语</el-radio>
          </el-radio-group>
        </div>
        <div class="selectBox">
          <span class="text">文献类型：</span>
          <el-radio-group v-model="documentType">
            <el-radio :label="''">全部</el-radio>
            <el-radio :label="'图书'">图书</el-radio>
            <el-radio :label="'期刊'">期刊</el-radio>
            <el-radio :label="'古籍'">古籍</el-radio>
            <el-radio :label="'音像'">音像</el-radio>
          </el-radio-group>
        </div>
        <div class="selectBox nomalFlex">
          <span class="text">出版年份：</span>
          <div class="timeBox">
            <el-input v-model="startTime" placeholder="请输入起始时间"></el-input>
          </div>
          <p class="divide">----</p>

          <div class="timeBox">
            <el-input v-model="endTime" placeholder="请输入结束时间"></el-input>
          </div>
        </div>
        <div class="selectBox">
          <span class="text">每页显示行数：</span>
          <el-select v-model="pageSize" placeholder="请选择">
            <el-option
              v-for="(item,index) of pageOption"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </section>
      <!-- <section class="house">
        <p class="title">基本条件</p>
        <div class="checkBox">
          <div class="check">
            <span class="valideate">检索所属馆列表：</span>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="eachChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </section>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 多连搜索框
      searchForm: {
        one: "",
        two: "",
        three: ""
      },
      select: "name",
      select2: "author",
      select3: "isbn",
      // 二层选择框
      language: "", // 语言
      documentType: "", // 文献类型
      startTime: "",
      endTime: "",
      pageSize: "10",
      pageOption:['10','20','30'],
      // 阉割的分中心
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false,
      cities: ["上海", "北京", "广州", "深圳"],
      optionsArr: [
        {
          label: "任意词",
          value: "anyWord",
          index: "0"
        },
        {
          label: "ISBN",
          value: "isbn",
          index: "1"
        },
        {
          label: "馆藏码",
          value: "code",
          index: "2"
        },
        {
          label: "题名",
          value: "name",
          index: "3"
        },
        {
          label: "作者",
          value: "author",
          index: "4"
        },
        {
          label: "主题",
          value: "themeWord",
          index: "5"
        },
        {
          label: "分类号",
          value: "fkTypeName",
          index: "6"
        },
        {
          label: "索取号",
          value: "callNumber",
          index: "7"
        },
        {
          label: "出版社",
          value: "fkPressName",
          index: "8"
        },
        {
          label: "出版年",
          value: "publishingTime"
        }
      ]
    };
  },
  computed: {
    submitTimeForm() {
      let obj = {
        condition2: "and",
        condition3: "and",
        currentPage:1
      };
      obj.pageSize = this.pageSize
      obj.language = this.language;
      obj.literatureType = this.documentType;
      obj.startTime = this.startTime;
      obj.endTime = this.endTime;
      let key1 = this.select;
      let key2 = this.select2 + "2";
      let key3 = this.select3 + "3";
      obj[key1] = this.searchForm.one;
      obj[key2] = this.searchForm.two;
      obj[key3] = this.searchForm.three;

      return obj;
    }
  },
  methods: {
    searchBtn() {
      let arr = Object.values(this.searchForm);
      let juge = arr.findIndex(function(value, index, arr) {
        return value != "";
      });
      console.log(juge);
      if (juge != -1) {
        console.log("索引", this.searchForm);
        let val = this.submitTimeForm;
        console.log("跳转", val);
        this.$router.push({ path: "searchList", query: val });
      } else {
        this.messageFix.error("请至少输入一个搜索条件");
      }
    },
    // 全选按钮
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    eachChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style lang="scss" scoped>
#hardSearch {
  .borderBox {
    width: 1000px;
    padding-bottom: 45px;
    margin: 0 auto;
    border-radius: 8px;
    border: solid 1px #12b494;
    padding-top: 40px;
    .search {
      width: 840px;
      margin: 0 auto;

      .inputBox {
        margin-bottom: 20px;
      }
    }
    .basicReason {
      width: 840px;
      margin: 0 auto;
      margin-bottom: 20px;
      border: solid 1px #12b494;
      .title {
        font-size: 16px;
        height: 30px;
        color: #ffffff;
        line-height: 30px;
        padding-left: 25px;
        background-color: #12b494;
        margin-bottom: 20px;
      }
      .selectBox {
        padding-left: 25px;
        margin-bottom: 30px;
        .text {
          font-size: 14px;
          color: #2a2a2a;
          display: inline-block;
          width: 120px;
        }
      }
      .nomalFlex {
        display: flex;
        flex-direction: row;
        .text {
          line-height: 26px;
        }
        .timeBox {
          width: 130px;
        }
        .divide {
          padding: 0 6px;
          line-height: 24px;
        }
      }
    }
    .house {
      width: 840px;
      margin: 0 auto;
      border: solid 1px #12b494;
      height: 220px;
      .title {
        font-size: 16px;
        height: 30px;
        color: #ffffff;
        line-height: 30px;
        padding-left: 25px;
        background-color: #12b494;
        margin-bottom: 20px;
      }
      .checkBox {
        padding-left: 25px;
      }
    }
  }
}
</style>

<style>
#hardSearch .el-select .el-input {
  width: 130px;
}
#hardSearch .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#hardSearch .timeBox .el-input__inner {
  height: 26px;
}
</style>
