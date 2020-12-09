<template>
  <div class="row">
    <div class="col-auto">
      <div class="card chart-container">
        <v-chart :options="pie" />
      </div>
    </div>
    <div class="col-33">
      <div class="side-bar">
        <div class="card card-hoverable" v-for="(data, index) in allData" :key="index">
          <div class="card-title">{{ data.title }}</div>
          <div class="card-meta">
            <span>{{ data.meta.date }}</span>
            <span>{{ data.meta.gp }}</span>
            <span>{{ data.meta.view }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articlesData'],
  data() {
    return {
      allData: this.articlesData,
      pie: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    };
  },
  mounted() {},
};
</script>
