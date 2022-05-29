<template>
  <div class="index">
    <Header class="header"/>
    <Menu class="menu"/>
    <Content class="content"/>
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
    }  
}
</script>

<style lang="scss" scoped>
.index{
  display: flex;
  .header{
    // margin-left:210px
    margin-top: -8px;
    margin-left: 210px;
    height: 60px;
    background: #27ad60;
    width:100%; //顶部导航栏宽度
    position: fixed;
    z-index: 999999; //最顶层
  }
  .menu{
    width: 210px;
    min-height: 800px;
    background: #e8f0eb;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content{
    width: calc(100% - 210px);
    position: relative;
    left:210px;
    top: 60px;
  }
}
</style>
