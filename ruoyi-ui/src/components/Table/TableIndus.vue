<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="product" label="Product"></el-table-column>
    <el-table-column prop="ICT_INDUS" label="ICT_INDUS"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "TableIndus",
  props: {
    tableData: Array,
  },
};
</script>
