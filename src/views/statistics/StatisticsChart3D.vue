<template>
    <div class="chart-container">
        <div id="chart3D" style="width: 100%; height: 500px"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    components: {},
    props: ['data'],
    data() {
        return {
            chart3D: undefined,
        };
    },
    created() { },
    mounted() {
        this.chart3D = echarts.init(document.getElementById('chart3D'));
        this.draw();
        window.onresize = () => {
            this.chart3D.resize();
        };
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
    methods: {
        draw() {
            let attn = this.data.attn;
            let data = this.data.data;
            let lab = this.data.lab;
            let color = [
                '#008000', // green
                '#90EE90', // lightgreen
                '#FFEC8B',
                '#FFA500', // orange
                '#FF6666',
                '#FF0000', // red
                '#FFFFFF',
            ];
            let series = [];
            for (let i = 0; i < color.length; i++) {
                series.push({
                    type: 'bar3D',
                    data: data[i],
                    stack: 'stack',
                    shading: 'color',
                    barMinHeight: 0,
                    color: color[i],
                    barSize: 1,
                    itemStyle: {
                        opacity: 1,
                    },
                });
            }
            let option = {
                xAxis3D: {
                    type: 'category',
                    data: lab,
                    name: 'Value',
                    // type: 'value'
                },
                yAxis3D: {
                    type: 'category',
                    data: attn,
                    name: 'Attention',
                    // type: 'value'
                },
                zAxis3D: {
                    type: 'value',
                    name: 'Visit Frequency',
                },
                grid3D: {
                    light: {
                        main: {
                            intensity: 1.2,
                        },
                        ambient: {
                            intensity: 0.3,
                        },
                    },
                    viewControl: {
                        distance: 180,
                    },
                },
                series: series,
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            pixelRatio: 10,
                        },
                    },
                    right: 30,
                },
            };
            this.chart3D.setOption(option, true);
        },
    },
};
</script>
