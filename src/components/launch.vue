<template>
  <div id="launch">
    <div class="content">
      <div class="aside-block">
        <div class="asideTitle">
          <i class="fonts iconfont" :class="init.icon"></i>
          <span>{{init.title}}</span>
        </div>

        <div class="aside-content">
          <div v-if="!dataArr.length" class="no-data">
            <P style="height:60px;">暂无数据</P>
          </div>
          <div v-if="dataArr.length" class="cirle-block">
            <p v-for="(item,index) of showArr" :key="index" class="text">
              <span @click="deliver(item)">{{item.name}}</span>
              （{{item.num}}）
            </p>
            <el-collapse-transition>
              <div v-show="launch">
                <p v-for="(item,index) of hideArr" :key="index" class="text">
                  <span @click="deliver(item)">{{item.name}}</span>
                  （{{item.num}}）
                </p>
              </div>
            </el-collapse-transition>
            <p v-if="display" class="more" @click="launch=!launch">{{launch?'点击收起':'点击展开'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 数据过滤 数据非空判断
export default {
  props: {
    init: {
      type: Object
    },
    dataArr: {
      type: Array
    }
  },
  data() {
    return {
      launch: false,
      originArr: this.init
    };
  },
  methods: {
    deliver(item) {
      this.$emit("son-click", item.name);
    }
  },
  computed: {
    showArr() {
      if (this.dataArr.length > 3) {
        let newArr = this.dataArr.slice(0, 3);
        return newArr;
      } else {
        return this.dataArr;
      }
      console.log(this.dataArr);
    },
    hideArr() {
      if (this.dataArr.length > 3) {
        let newArr = this.dataArr.slice(3);
        return newArr;
      } else {
        return [];
      }
    },
    display() {
      return this.dataArr.length > 3;
    }
  }
};
</script>

<style lang="scss" scoped>
#launch {
  .content {
    .aside-block {
      border: solid 1px #12b494;
      margin-bottom: 1px;
      .asideTitle {
        background-color: #12b494;
        height: 66px;
        box-sizing: border-box;
        line-height: 66px;
        color: #fff;
        font-size: 18px;
        padding-left: 24px;
        .fonts{
          font-size: 31px;
          margin-right: 20px;
        }
      }
      .aside-content {
        background-color: #e7fffa;
        padding-top: 17px;
        padding-bottom: 7px;
        box-sizing: border-box;
        padding-left: 78px;
        .text {
          color: #12b494;
          font-size: 16px;
          margin-bottom: 18px;
          span {
            cursor: pointer;
          }
          &:last-child {
            margin-bottom: 24px;
          }
        }
        .more {
          color: #686868;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

