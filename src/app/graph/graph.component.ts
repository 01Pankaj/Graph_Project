import { Component, Input, NgZone, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  count:any;
  chart:any;
  id:any;
    @Input() emotionData:any
    @Input() videoDuration:any;
    @Input() emotionDataAll:any;
    @Input() currentTime:any;

  
    constructor() { }
  

 ngOnInit(){
  console.log("Hello from graph component ");
  
    // Data-----
    const data = [];
    const data2 = [];
  for(let i=0;i<this.emotionDataAll.length;i++){
    data.push({x:this.emotionDataAll[i].time, y:this.emotionDataAll[i].sad})
    data2.push({x:this.emotionDataAll[i].time, y:this.emotionDataAll[i].arousal})
  }
    // Data-----

    // Animation-----
    const delayBetweenPoints = 1000;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        tension:{
          from:1,
          to:0.4
        }
    };
    // Animation-----

    // Config-----
    const config = {
        type: 'line',
        data: {
            datasets: [{
                borderColor: "#ff0000",
                borderWidth: 2,
                radius: 0,
                data: data,
            },
                {
                    borderColor: "#00FFFF",
                    borderWidth: 2,
                    radius: 0,
                    data: data2,
                }]
        },
        options: {
            animation,
            interaction: {
                intersect: false
            },
            plugins: {
                legend: false
            },
            scales: {
                x: {
                    type: 'linear'
                }
            }
        }
    } as any;
    var myChart = new Chart(
        document.getElementById('myChart') as HTMLCanvasElement,
        config
    );


 }


  
  
  }