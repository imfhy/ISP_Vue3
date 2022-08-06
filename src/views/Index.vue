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
@import '../assets/theme/index.scss';
</style>
