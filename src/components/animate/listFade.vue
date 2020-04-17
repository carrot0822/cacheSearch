<template>
  <div id="demo">
    <transition-group
      name="staggered-fade"
      tag="ul"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      appear
    >
    <slot></slot>
      <!-- <li
        v-for="(item, index) in computedList"
        v-bind:key="item.msg"
        v-bind:data-index="index"
      >{{ item.msg }}</li> -->
    </transition-group>
  </div>
</template>

<script>
import { setInterval } from "timers";
import Velocity from 'velocity-animate'
export default {
  data() {
    return {
      query: '',
      list: [
        { msg: "Bruce Lee" },
        { msg: "Jackie Chan" },
        { msg: "Chuck Norris" },
        { msg: "Jet Li" },
        { msg: "Kung Fury" }
      ]
    };
  },
  computed: {
    computedList: function() {
      var vm = this;
      return this.list.filter(function(item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
      });
    }
  },
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
      
     
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150;
      
      setTimeout(function() {
        Velocity(el, { opacity: 1 }, { complete: done });
      }, delay);
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    }
  }
};
</script>

<style lang="scss" scoped>
/* .list-item {
  
  margin-bottom: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s 0.5s;
}
.list-enter, .list-leave-to
 {
  opacity: 0;
  transform: translateX(30px);
} */
</style>

