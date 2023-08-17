import { Component, Input, NgZone, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  count:any;
  chart:any;
  id:any;
  myChart:any;
  canvas:any;
    @Input() emotionData:any
    @Input() videoDuration:any;
    @Input() emotionDataAll:any;
    @Input() currentTime:any;
    @Input() selectedValue:any;

  
    constructor(private _api:ApiService) { }
  

 ngOnInit(){

    console.log(this.selectedValue, "from graph");
    
    const data = [];
    // const data2 = [];
    if (this.selectedValue) {
        for(let i=0;i<this.emotionDataAll.length;i++){
            data.push({x:this.emotionDataAll[i].time, y:this.emotionDataAll[i][this.selectedValue]})
            // data2.push({x:this.emotionDataAll[i].time, y:this.emotionDataAll[i].arousal})
          }
    }
  
      // Animation-----
  const delayBetweenPoints = 1000;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    // Data-----
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

    const config = {
        type: 'line',
        data: {
            datasets: [{
                borderColor: "#FF0000",
                borderWidth: 2,
                radius: 0,
                data: data,
                fill: true,
                  backgroundColor: 'rgba(205,0,0,0.3)'
            }]
        },
        options: {
            animation,
            maintainAspectRatio:false,
            interaction: {
                intersect: false
            },
            plugins: {
                legend: false,
            },
            scales: {
                x: {
                    type: 'linear',
                    grid: {
                        color: 'rgba(0,255,0,0.5)',
                        borderColor: 'green',
                        lineWidth: 2,
                      },
                      ticks: {
                        stepSize:data.length<30 ? 0.5 : 1
                        },
                        border: {
                            dash: [5,5],
                        },
                },
                y:{
                    grid: {
                        display: false
                      },
                }
            }
        }
    } as any;

 

    this.canvas = document.getElementById('myChart')
    this._api.videoStartEmitter.subscribe((response:any)=>{
        if(this.myChart){
            this.myChart.destroy();
            this.myChart = new Chart(
                this.canvas,
                config
                );
        }
        else{
              this.myChart = new Chart(
                  this.canvas,
                  config
              );
          }
          console.log("Hello from graph componnt");
          
 })

 this._api.videoEndEmitter.subscribe((response:any)=>{
   
 })
 }


  
  
  }