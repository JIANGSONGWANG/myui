<template>
  <div :style="{ height: '500px', width: '1000px' }" />
</template>

<script>
import * as echarts from 'echarts';
require("echarts/theme/macarons"); // echarts theme
import request from '@/utils/request'
import { formatDate } from "@/utils/index";

export default {
  name: "BarChartDateRange",
  data() {
    return {
      chart: null,
      typeData: [
        { product: "2021.11.23", 博客数: 20 },
        { product: "2021.11.24", 博客数: 30 },
        { product: "2021.11.25", 博客数: 35 },
        { product: "2021.11.26", 博客数: 43 },
      ],
      yAxisMax: 0,
      queryParam: {
        beginDate: null,
        endDate: null,
      },
    };
  },
  created() {
    //默认开始时间为20days
    this.queryParam.beginDate = formatDate(
      new Date().getTime() - 60 * 1000 * 60 * 24 * 20
    );
    //默认结束时间时间当前时间
    this.queryParam.endDate = formatDate(new Date().getTime());
    this.getList().then((response) => {
      var res = response.data;
      if (res) {
        //清空柱状图的数据源
        this.typeData = [];
        //遍历后台响应数据，构造柱状图数据源
        for (var key in res) {
          this.typeData.push({ product: key, 博客数: res[key] });
        }
      }
      this.initChart(this.typeData);
    });
  },
  mounted() {},
  methods: {
    //调用后台接口查询数据
    getList() {
      return request({
        url: "/system/blog/list",
        method: "get",
        params: this.queryParam,
      });
    },
    //父组件调用子组件的该方法进行重新渲染柱状图
    getSelectedRangeList(range) {
      var startDate = range[0];
      var endDate = range[1];
      this.queryParam.beginDate = startDate;
      this.queryParam.endDate = endDate;
      this.getList().then((response) => {
        var res = response.data;
        if (res) {
          this.typeData = [];
          for (var key in res) {
            this.typeData.push({ product: key, 博客数: res[key] });
          }
        }
        this.initChart(this.typeData);
      });
    },
    initChart(typeData) {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          //图例
          data: ["博客数"],
        },
        xAxis: [
          {
            type: "category",
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：(条)",
            min: 0,
            max: 30,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        dataset: {
          source: typeData,
        },
        series: [
          {
            name: "博客数",
            type: "bar",
            barWidth: "40%",
          },
        ],
      });
    },
  },
};
</script>
