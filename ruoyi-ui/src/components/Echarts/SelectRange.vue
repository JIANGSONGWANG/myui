<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="Indus-evelation" prop="field101">
        <el-select v-model="formData.field101" placeholder="please select" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in field101Options" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">submit</el-button>
        <el-button @click="resetForm">reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: undefined,
      },
      rules: {
        field101: [{
          required: true,
          message: 'please select',
          trigger: 'change'
        }],
      },
      field101Options: [{
        "label": "Probe",
        "value": 1
      }, {
        "label": "Node",
        "value": 2
      }, {
        "label": "Device",
        "value": 3
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
