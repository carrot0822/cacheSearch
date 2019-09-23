<template>
  <div id="searchInput">
    <!-- 搜索框 -->
    
      <el-input @focus="focuVali" @keyup.enter.native="searchBtn" @blur="blurVali" placeholder="请输入搜索内容" v-model="search" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option v-for="(item,index) of optionsArr" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button @click="searchBtn" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      
      <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      select:"name",
      tips:'搜索条件不得为空',
      isPlay:false,
      optionsArr:[{
        label:'任意词',
        value:'anyWord',
        index:'0'
      },{
        label:'ISBN',
        value:'isbn',
        index:'1'
      },{
        label:'馆藏码',
        value:'code',
        index:'2'
      },{
        label:'题名',
        value:'name',
        index:"3"
      },{
        label:'作者',
        value:'author',
        index:'4'
      },{
        label:'主题',
        value:'themeWord',
        index:"5"
      },{
        label:'分类号',
        value:'fkTypeName',
        index:"6"
      },{
        label:'索取号',
        value:'callNumber',
        index:"7"
      },{
        label:'出版社',
        value:'fkPressName',
        index:"8"
      },{
        label:'出版年',
        value:'publishingTime'
      },]
    };
  },
  computed: {
    searchTimeForm(){
      let key = this.select
      let obj = {}
      obj[key] = this.search
      obj.pageSize = 10,
      obj.currentPage = 1
      return obj
    }
  },
  methods:{
    blurVali(){
      this.$emit('blur-son')
      console.log('说好的模糊呢')
    },
    focuVali(){
      this.$emit('focu-son')
      console.log('说好的聚焦')
    },
    searchBtn(){
      let value = this.search
      if(value){
        this.$emit('emit-search',this.searchTimeForm)
      } else{
        this.messageFix.error('请输入搜索条件')
        
      }
    }
  }
};
</script>
<style lang="scss" scoped>


#searchInput {
  
    .tips{
      padding-left:140px;
      font-size: 16px;
      line-height: 48px;
      color: #ffffff; 
    }
  
}

</style>
<style lang="scss">
@import '@/common/scss/variables.scss';
#searchInput .el-select .el-input {
    width: 130px;
     
}
#searchInput .input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>



