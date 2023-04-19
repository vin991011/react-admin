import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function LineChart() {
  const option = {
    color: ['rgb(255,97,0)', 'rgb(98,218,171)'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      show: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '最高气温',
        type: 'line',
        data: [32, 35, 39, 30, 27, 32, 35],
        showSymbol: false,
      },
      {
        name: '最低气温',
        type: 'line',
        data: [19, 22, 24, 17, 15, 18, 20],
        showSymbol: false,
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      notMerge={true}
      style={{ width: '95%', height: '300px' }}
    />
  );
}
