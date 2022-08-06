<template>
  <div id="luckysheet" style="margin:0px;padding:0px;width:100%;height:800px;">
  </div>

</template>

<script>
import App from '@/App.vue'
export default {
    name: "luckysheet",
    props: {
        msg: String
    },
    mounted() {
        this.init_luckysheet();
    },
    methods: {
        init_luckysheet() {
            var options = {
                container: "luckysheet",
                title: "排程表",
                lang: "zh",
                showinfobar: false, // 不显示luckysheet图标
            };
            luckysheet.create(options);
        }
    },
    components: { App }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
