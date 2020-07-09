# reader1

## 目录说明 

## assets:vue项目默认的静态资源存放

## common
1. css 
+ common存放通用样式
+ distance存放通用距离样式
+ reset 样式初始化
+ zyf 另一位同事的css 用于重写UI框架的样式
2. js 
+ util.js 保存了日期格式化 token的增删改函数
3. scss
+ 存放了一些常用的样式 动画过渡样式 以及UI约定好的颜色代码
## components：涉及到业务的组件
1. animate
+ 列表淡入淡出动画组件
2. bookblock.vue
+ 需要调用京东当当网等外部搜索接口和分享链接
3. launch
+ 
4. ReaderNavigation
+ 用户模块的导航页面
5. searchInput 单输入框搜索插件
## directive：存放公用指令(未使用)
  
## layout:非业务组件
1. loading组件 
2. 分享组件
3. 回到顶部组件
## page
1. borrow 借阅管理模块
+ 借阅排行和新书快递 两个查询列表页面

2. classify 一个根据生成的树形结构的数据 来查询渲染列表的页面


3. login：登录页面


4. notice：公告页面 与管理系统联动


5. reader
+ 读者模块相关页面

6. search
+ 搜索相关页面 包含高级搜索 简单搜索 搜索结果 以及点击后的搜索详情页面

7. 单文件
+ index 未使用
+ error：错误页面
+ search 默认进入的首页
## request：存放管理接口(各个接口基本都有注释说明)
+ article：
+ collect：收藏与预约的接口 在搜索详情页面会用到
+ loan：借阅管理接口
+ login：登录
+ readeCenter：用户管理模块接口
+ search：对应搜索模块的各类搜索接口
+ user：用户信息的查询接口
## store

## 单文件
1. main.js
入口文件
2. message.js
+ 对elementUI提示再次封装
3. permission.js
+ 路由守卫使用
4. router.js