<template>
  <div class="index">
    <Header class="header" @changeCollapse="changeCollapse" :isCollapse="isCollapse"/>
    <Menu class="menu" :isCollapse="isCollapse"/>
    <Content class="content" :class="{isActive:isCollapse}" @changeCollapse="changeCollapse"/>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import Header from '../components/Header'
import Content from '../components/Content'
export default {
  components:{
    Menu,
    Header,
    Content
  },
  data () {
      return {
        isCollapse: false,
      }
  },
  methods:{
    changeCollapse(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/index.scss';
</style>
