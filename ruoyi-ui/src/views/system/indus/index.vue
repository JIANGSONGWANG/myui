<template>
  <div>
    <div>
      <BarChartIndus ref="BarChartIndus"></BarChartIndus>
    </div>
    <div>


<!--      <el-select v-model="form.fileOrgType" placeholder="请选择">-->
<!--        <el-option label="probe" value="Y"> </el-option>-->
<!--        <el-option label="node" value="N"></el-option>-->
<!--        <el-option label="device" value="Y"> </el-option>-->
<!--      </el-select>-->

      <el-select v-model="measuring"  placeholder="please select" clearable @change="'handleChange'">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
<!--        <el-option label="probe" value='/system/indus/list1'> </el-option>-->
<!--        <el-option label="node" value='/system/indus/list1'></el-option>-->
<!--        <el-option label="device" value='/system/indus/list1'> </el-option>-->
      </el-select>



    </div>
    <div class="block">
      <el-date-picker
        size="large"
        type="daterange"
        v-model="value1"
        range-separator="to"
        start-placeholder="start"
        end-placeholder="end"
        @change="dateSelectChange"
        :value-format="dateFormat"
      >
      </el-date-picker>


    </div>

<!--    <div class="block">-->
<!--      <el-date-picker-->
<!--        size="large"-->
<!--        type="daterange"-->
<!--        v-model="value1"-->
<!--        range-separator="to"-->
<!--        start-placeholder="start"-->
<!--        end-placeholder="end"-->
<!--        @change="dateSelectChange"-->
<!--        :value-format="dateFormat"-->
<!--      >-->
<!--      </el-date-picker>-->
<!--    </div>-->

<!--    <div class="block">-->
<!--      <el-date-picker-->
<!--        size="large"-->
<!--        type="daterange"-->
<!--        v-model="value1"-->
<!--        range-separator="to"-->
<!--        start-placeholder="start"-->
<!--        end-placeholder="end"-->
<!--        @change="dateSelectChange"-->
<!--        :value-format="dateFormat"-->
<!--      >-->
<!--      </el-date-picker>-->
<!--    </div>-->

    <div class="app-container">
      <el-table :data="indusList">
        <el-table-column align="center" prop="indusprobe" />
        <el-table-column align="center" prop="count" />
      </el-table>
<!--      <pagination-->
<!--        v-show="total>0"-->
<!--        :total="total"-->
<!--        :page.sync="queryParams.pageNum"-->
<!--        :limit.sync="queryParams.pageSize"-->
<!--        @pagination="getList"-->
<!--      />-->
    </div>


  </div>
</template>

<script>
import BarChartIndus from "@/components/Echarts/BarChartIndus";
import TableIndus from "@/components/Table/TableIndus";
import {listIndus} from "@/api/system/indus";
import SelectRange from "@/components/Echarts/SelectRange";

export default {
  name: "Indus",
  components: {
    SelectRange,
    BarChartIndus,
    TableIndus,
  },

  data() {
    return {
      indusList: [
        { indusprobe: "mock_data", count: 99 },
      ],
      options: [{
        label: "probe",
        value: '/system/indus/list1'
      }, {
        label: "node",
        value: '/system/indus/list2'
      }, {
        label: "device",
        value: '/system/indus/list3'
      }],

      value1: "",
      dateFormat: "yyyy-MM-dd",
      total: 0,
      measuring:null,
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        beginDate: null,
        endDate: null,
        // indusprobe: null,
        // count: null,
      },
      // 表单参数
      form: {},
    };
  },

  created() {
  },
  methods: {
    handleChange(val){
      console.log(val);
      this.measuring = val;
    },
    gettable(range, val2) {
      var startDate = range[0];
      var endDate = range[1];
      this.queryParams.beginDate = startDate;
      this.queryParams.endDate = endDate;
      listIndus(this.queryParams, val2).then(response => {

        var res = response.data;
        if (res) {
          this.indusList = [];
          for (var key in res) {
            this.indusList.push({ indusprobe: key, count: res[key] });
          }
        }
      });
    },
    dateSelectChange(val) {
      if (val) {
        var startDate = new Date(val[0]).getTime();
        var endDate = new Date(val[1]).getTime();
        if(this.measuring == null) {
          this.$message({
            message:"must select a measuring option",
            type:"warning",
          });
        }
        if (endDate - startDate > 10 * 24 * 60 * 60 * 1000) {
          this.$message({
            message: "Upper limit is 10 days",
            type: "warning",
          });
        } else {
          var val2 = this.measuring;
          this.$refs.BarChartIndus.getSelectedRangeList(val, this.measuring);
          this.gettable(val,val2);
          this.measuring = null;
        }
      }
    },
  },
};
</script>

<!--<script>-->
<!--import { listIndus, getIndus, delIndus, addIndus, updateIndus } from "@/api/system/indus";-->
<!--import request from "@/utils/request";-->

<!--export default {-->
<!--  name: "Indus",-->

<!--  created() {-->
<!--    this.getList();-->
<!--  },-->
<!--  methods: {-->
<!--    /** 查询indus列表 */-->



<!--  }-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    <div>-->
<!--      <BarChartIndus ref="BarChartIndus"></BarChartIndus>-->
<!--    </div>-->
<!--    <div class="block">-->
<!--      <el-date-picker-->
<!--        size="large"-->
<!--        type="daterange"-->
<!--        v-model="value1"-->
<!--        range-separator="to"-->
<!--        start-placeholder="start"-->
<!--        end-placeholder="end"-->
<!--        @change="dateSelectChange"-->
<!--        :value-format="dateFormat"-->
<!--      >-->
<!--      </el-date-picker>-->
<!--    </div>-->
<!--  </div>-->


<!--</template>-->
<!--<script>-->
<!--import BarChartIndus from "@/components/Echarts/BarChartIndus";-->

<!--export default {-->
<!--  name: "Indus",-->
<!--  components: {-->
<!--    BarChartIndus,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      value1: "",-->
<!--      dateFormat: "yyyy-MM-dd",-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--  },-->
<!--  methods: {-->
<!--    /** 查询博客列表 */-->
<!--    dateSelectChange(val) {-->
<!--      if (val) {-->
<!--        var startDate = new Date(val[0]).getTime();-->
<!--        var endDate = new Date(val[1]).getTime();-->
<!--        debugger;-->
<!--        if (endDate - startDate > 10 * 24 * 60 * 60 * 1000) {-->
<!--          this.$message({-->
<!--            message: "Upper limit is 10 days",-->
<!--            type: "warning",-->
<!--          });-->
<!--        }else{-->
<!--          this.$refs.BarChartIndus.getSelectedRangeList(val);-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->



<!--<template>-->
<!--  <div>-->
<!--    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">-->
<!--      <el-form-item label="下拉选择" prop="field101">-->
<!--        <el-select v-model="formData.field101" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">-->
<!--          <el-option v-for="(item, index) in field101Options" :key="index" :label="item.label"-->
<!--                     :value="item.value" :disabled="item.disabled"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item size="large">-->
<!--        <el-button type="primary" @click="submitForm">提交</el-button>-->
<!--        <el-button @click="resetForm">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->

<!--export default {-->
<!--  components: {},-->
<!--  props: [],-->
<!--  data() {-->
<!--    return {-->
<!--      formData: {-->
<!--        field101: undefined,-->
<!--      },-->
<!--      rules: {-->
<!--        field101: [{-->
<!--          required: true,-->
<!--          message: '请选择下拉选择',-->
<!--          trigger: 'change'-->
<!--        }],-->
<!--      },-->
<!--      field101Options: [{-->
<!--        "label": "option1",-->
<!--        "value": 1-->
<!--      }, {-->
<!--        "label": "option2",-->
<!--        "value": 2-->
<!--      }, {-->
<!--        "label": "option3",-->
<!--        "value": 3-->
<!--      }],-->
<!--    }-->
<!--  },-->
<!--  computed: {},-->
<!--  watch: {},-->
<!--  created() {},-->
<!--  mounted() {},-->
<!--  methods: {-->
<!--    submitForm() {-->
<!--      this.$refs['elForm'].validate(valid => {-->
<!--        if (!valid) return-->
<!--        // TODO 提交表单-->
<!--      })-->
<!--    },-->
<!--    resetForm() {-->
<!--      this.$refs['elForm'].resetFields()-->
<!--    },-->
<!--  }-->
<!--}-->

<!--</script>-->
<!--<style>-->
<!--</style>-->



