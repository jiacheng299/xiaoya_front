<template>
    <div class="chart-container">
        <div id="chart2D" style="width: 100%; height: 376px"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    components: {},
    props: ['data', 'show_standard', 'selected'],
    data() {
        this.chart2D = undefined;
    },

    watch: {
        data: {
            handler(curVal, oldVal) {
                if (curVal) {
                    this.data = curVal;
                    this.draw();
                }
            },
        },
    },

    created() { },

    mounted() {
        this.chart2D = echarts.init(document.getElementById('chart2D'));
        this.draw();
        window.onresize = () => {
            this.chart2D.resize();
        };
    },

    methods: {
        draw() {
            let data_bar = this.data.data_bar;
            let data_line = this.data.data_line;
            let min = this.data.min;
            let max = this.data.max;
            let color = [
                '#008000', // green
                '#90EE90', // lightgreen
                '#FFEC8B',
                '#FFA500', // orange
                '#FF6666',
                '#FF0000', // red
            ];
            let series = [];
            for (let i = 1; i < color.length; i++) {
                for (let j = 0; j < data_bar[0].length; j++) {
                    data_bar[i][j][1] += data_bar[i - 1][j][1];
                }
            }
            let name = [
                '<0.125',
                '0.125-0.25',
                '0.25-0.375',
                '0.375-0.5',
                '0.5-0.75',
                '0.75-1.0',
            ];
            for (let i = color.length - 1; i >= 0; i--) {
                series.push({
                    type: 'bar',
                    stack: 'total',
                    data: data_bar[i],
                    color: color[i],
                    name: name[i],
                    emphasis: {
                        disabled: true,
                    },
                });
            }
            series.push({
                name: 'Attention',
                type: 'line',
                yAxisIndex: 1,
                data: data_line,
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        color: '#5470C6',
                        width: 1.5,
                    },
                    label: {
                        color: '#5470C6',
                        fontSize: '20px',
                    },
                    animation: false,
                    data: [
                        {
                            name: 'Min',
                            xAxis: min,
                        },
                        {
                            name: 'Max',
                            xAxis: max,
                        },
                    ],
                },
            });

            let option = {
                grid: {
                    left: 100,
                    right: 100,
                    top: 45,
                    bottom: 68,
                },
                legend: {
                    show: false,
                    width: '50%',
                    itemWidth: 22,
                    itemHeight: 12,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: 'purple',
                            width: 2,
                        },
                    },
                    formatter(params) {
                        if (params.length > 6) {
                            return `
                                Value: ${params[6].data[0]} <br>
                                Attention: ${params[6].data[1]}
                            `;
                        } else {
                            return `
                                Value: ${params[0].data[0]}
                            `;
                        }
                    },
                },
                xAxis: [
                    {
                        name: this.selected,
                        type: 'value',
                        min: data_line[0][0],
                        max: data_line[data_line.length - 1][0].toFixed(1),
                        axisLabel: {
                            textStyle: {
                                fontSize: '22',
                                color: '#000',
                            },
                        },
                        nameLocation: 'middle',
                        nameTextStyle: {
                            padding: [19, 0, 0, 0],
                            fontSize: '26',
                            color: '#000',
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#DBDBDB',
                                width: 2,
                                type: 'solid',
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        name: 'Visit Frequency',
                        type: 'value',
                        min: 0,
                        // max: 1500,
                        // interval: 250,
                        // splitNumber: 3,
                        nameLocation: 'middle',
                        nameRotate: '90',
                        nameTextStyle: {
                            padding: [0, 0, 60, 0],
                            fontSize: '26',
                            color: '#000',
                        },
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                fontSize: '22',
                                color: '#000',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#DBDBDB',
                                width: 2,
                                type: 'solid',
                            },
                        },
                    },
                    {
                        name: 'Adaptive Feature Importance',
                        nameLocation: 'middle',
                        nameRotate: '270',
                        type: 'value',
                        nameTextStyle: {
                            padding: [0, 0, 56, 0],
                            fontSize: '24',
                            color: '#000',
                        },
                        // interval: 4,
                        // splitNumber: 5,
                        axisLabel: {
                            formatter: '{value}%',
                            textStyle: {
                                fontSize: '22',
                                color: '#000',
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#DBDBDB',
                                width: 2,
                                type: 'solid',
                            },
                        },
                    },
                ],
                series: series,
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            type: 'svg',
                            pixelRatio: 3,
                        },
                    },
                    right: 70,
                    top: -10,
                },
            };
            this.chart2D.setOption(option, true);
        },
    },
};
</script>
