<template>
  <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:90%;left: 0px;"></div>
</template>

<script>
export default {
  name: 'luckysheet',
  mounted() {
            this.init()
        },
  methods:{
  init(){
      var options = {
          container: 'luckysheet', //luckysheet为容器id
          title:'排程表', //表 头名
          lang: 'zh', //中文
      }
      luckysheet.create(options)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
