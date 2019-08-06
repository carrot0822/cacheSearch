<template>
  <div id="Notice">
    <section class="top">
      <h2 class="list">公告列表</h2>
    </section>

    <section class="articleBox">
      <div v-if="!listData.length" class="no-data">
        暂无数据
      </div>
      <div v-if="listData.length" class="list">
        <animation>
          <div :data-index="index" v-for="(item,index) of listData" :key="index" class="contentBox">
            <div class="infoBox">
              <div class="title">
                <span class="name">{{item.username}}</span>
                <span class="time">{{item.updateTime}}</span>
              </div>
              <div class="listCon">
                <p>
                  <span class="titleName" @click="jumpArticle(item.id)">{{item.title}}</span>
                </p>
                <p class="content"></p>
              </div>
            </div>
          </div>
        </animation>
      </div>
    </section>
    <section class="pagation">
      <pagation :allData="total" :pageSize="pageSize" @pageChange="jumpPage"></pagation>
    </section>
  </div>
</template>

<script>
import pagation from "@/components/pagation";
import animation from "@/components/animate/listFade";
import { articleInt } from "@/request/api/article";

export default {
  data() {
    return {
      currentPage: 1,
      pageInput: 1,
      pageSize: 10,
      total: 0,
      listData: [],
      searchForm: {
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  components: {
    pagation,
    animation
  },
  methods: {
    // 查询按钮
    jumpPage(val) {
      this.searchForm.currentPage = val;
      this._search(this.searchForm);
    },
    // 跳转按钮
    jumpArticle(id) {
      this.$router.push({ path: `/article/${id}` });
      console.log(id);
    },
    /*------ Api ------*/
    _search(obj) {
      let data = obj;
      articleInt.allList(data).then(res => {
        if (res.data.state) {
          this.listData = res.data.row;
          this.total = res.data.total;
        }
        console.log("文章列表", res);
      });
    }
  },
  created() {
    this._search();
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/variables.scss";
#Notice {
  .top {
    padding: 10px 0;
    .list {
      font-size: 32px;
      color: #444;
    }
  }
  .articleBox {
    .list {
      .contentBox {
        padding: 12px 24px;
        .infoBox {
          .title {
            font-size: 14px;
            .name {
              color: #909090;
              display: inline-block;
              margin-right: 10px;
            }
            .time {
              color: #909090;
            }
          }
          .listCon {
            margin: 5px 0 10px;
            .titleName {
              color: #2e3135;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              &:hover {
                color: $green;
              }
            }
          }
        }
      }
    }
  }
  .pagation {
    padding-left: 20px;
  }
}
</style>

