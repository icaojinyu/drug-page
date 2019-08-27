<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="(item,index) in list" :key="index">
      {{item}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "breadcrumb",
    props: {
      list: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss">
  .breadcrumb {
    width: 96%;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 5px;
    margin: 10px auto;
  }
</style>
