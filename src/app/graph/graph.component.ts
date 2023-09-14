import {
  Component,
  Input,
  // NgZone,
  // Inject,
  // PLATFORM_ID,
  // SimpleChanges,
} from '@angular/core';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../services/api.service';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  count: any;
  chart: any;
  id: any;
  myChart: any;
  canvas: any;
  @Input() emotionDataAll: any;
  @Input() currentTime: any;
  @Input() selectedValue: any;

  constructor(private _api: ApiService) {}

  ngOnInit() {
    Chart.register(annotationPlugin);

    console.log(this.selectedValue, 'from graph',this.emotionDataAll);

    const data = [];
    // const data2 = [];
    if (this.selectedValue) {
      for (let i = 0; i < this.emotionDataAll.length; i++) {
        data.push({
          x: this.emotionDataAll[i].time,
          y: this.emotionDataAll[i][this.selectedValue],
        });
        // data2.push({x:this.emotionDataAll[i].time, y:this.emotionDataAll[i].arousal})
      }
    }

    let averageGraphValue =
      data.reduce((acc, val) => {
        return acc + val.y;
      }, 0) / data.length;
    // Animation-----
    const delayBetweenPoints = 1000;
    let previousY;
    if (this.canvas) {
      previousY = (ctx) =>
        ctx.index === 0
          ? ctx.chart.scales.y.getPixelForValue(100)
          : ctx.chart
              .getDatasetMeta(ctx.datasetIndex)
              .data[ctx.index - 1].getProps(['y'], true).y;
    }
    // Data-----
    // const animation = {
    //   x: {
    //     type: 'number',
    //     easing: 'linear',
    //     duration: delayBetweenPoints,
    //     from: NaN, // the point is initially skipped
    //     delay(ctx) {
    //       if (ctx.type !== 'data' || ctx.xStarted) {
    //         return 0;
    //       }
    //       ctx.xStarted = true;
    //       return ctx.index * delayBetweenPoints;
    //     },
    //   },
    //   y: {
    //     type: 'number',
    //     easing: 'easeOutQuart',
    //     duration: delayBetweenPoints,
    //     from: previousY,
    //     delay(ctx) {
    //       if (ctx.type !== 'data' || ctx.yStarted) {
    //         return 0;
    //       }
    //       ctx.yStarted = true;
    //       return ctx.index * delayBetweenPoints;
    //     },
    //   },
    //   tension: {
    //     from: 1,
    //     to: 0.6,
    //   },
    // };

    // //this function is created for the linear gradient of x axis
    // let width, height, gradient;
    // function getGradient(ctx, chartArea) {
    //   const chartWidth = chartArea.right - chartArea.left;
    //   const chartHeight = chartArea.bottom - chartArea.top;
    //   if (!gradient || width !== chartWidth || height !== chartHeight) {
    //     // Create the gradient because this is either the first render
    //     // or the size of the chart has changed
    //     width = chartWidth;
    //     height = chartHeight;
    //     gradient = ctx.createLinearGradient(
    //       0,
    //       chartArea.bottom,
    //       0,
    //       chartArea.top
    //     );
    //     gradient.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    //     // gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.5)');
    //     gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
    //     gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    //   }

    //   return gradient;
    // }

    const config = {
      type: 'line',
      arrowHeads: {
        end: {
          display: true
        }
      },
      data: {
        datasets: [
          {
            borderColor: '#ffffff',
            // borderColor: '#ffffff',
              // this.selectedValue == 'angry'
              //   ? 'rgb(205,0,0)'
              //   : this.selectedValue == 'arousal'
              //   ? 'rgb(0, 255, 255)'
              //   : this.selectedValue == 'attention'
              //   ? 'rgb(255, 200, 0)'
              //   : this.selectedValue == 'disgust'
              //   ? 'rgb(49, 46, 53)'
              //   : this.selectedValue == 'evalence'
              //   ? 'rgb(210, 100, 250)'
              //   : this.selectedValue == 'happy'
              //   ? 'rgb(0, 100, 0)'
              //   : this.selectedValue == 'neutral'
              //   ? 'rgb(80, 80, 80)'
              //   : this.selectedValue == 'sad'
              //   ? 'rgb(120, 50, 120)'
              //   : this.selectedValue == 'scare'
              //   ? 'rgb(100, 5, 35)'
              //   : this.selectedValue == 'surprised'
              //   ? 'rgb(255, 255, 0)'
              //   : 'rgba(255,255,255)',
            borderWidth: 3,
            radius: 0,
            data: data,
            fill: 'origin',
            backgroundColor:  
            (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = 
              canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(193, 193, 193, 0.5)');
              gradient.addColorStop(0.75, 'rgba(193, 193, 193,0.3)');
              gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');

              // if (this.selectedValue == 'angry') {
              //   gradient.addColorStop(0, 'rgba(205,0,0,0.9)');
              //   gradient.addColorStop(1, 'rgba(205,0,0,0.05)');
              // } else if (this.selectedValue == 'arousal') {
              //   gradient.addColorStop(0, 'rgba(0, 255, 255,0.9)');
              //   gradient.addColorStop(1, 'rgba(0, 255, 255,0.05)');
              // } else if (this.selectedValue == 'attention') {
              //   gradient.addColorStop(0, 'rgba(255, 200, 0,0.9)');
              //   gradient.addColorStop(1, 'rgba(255, 200, 0,0.05)');
              // } else if (this.selectedValue == 'disgust') {
              //   gradient.addColorStop(0, 'rgba(49, 46, 53,0.9)');
              //   gradient.addColorStop(1, 'rgba(49, 46, 53,0.05)');
              // } else if (this.selectedValue == 'evalence') {
              //   gradient.addColorStop(0, 'rgba(210, 100, 250,0.9)');
              //   gradient.addColorStop(1, 'rgba(210, 100, 250,0.05)');
              // } else if (this.selectedValue == 'happy') {
              //   gradient.addColorStop(0, 'rgba(0, 100, 0,0.9)');
              //   gradient.addColorStop(1, 'rgba(0, 100, 0,0.05)');
              // } else if (this.selectedValue == 'neutral') {
              //   gradient.addColorStop(0, 'rgba(80,80,80,0.9)');
              //   gradient.addColorStop(1, 'rgba(127, 86, 217, 0.05)');
              // } else if (this.selectedValue == 'sad') {
              //   gradient.addColorStop(0, 'rgba(120, 50, 120,0.9)');
              //   gradient.addColorStop(1, 'rgba(127, 86, 217, 0.05)');
              // } else if (this.selectedValue == 'scare') {
              //   gradient.addColorStop(0, 'rgba(100, 5, 35,0.9)');
              //   gradient.addColorStop(1, 'rgba(100, 5, 35,0.05)');
              // } else if (this.selectedValue == 'surprised') {
              //   gradient.addColorStop(0, '(255, 255, 0,0.9)');
              //   gradient.addColorStop(1, '(255, 255, 0,0.05)');
              // } else {
              //   gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
              //   gradient.addColorStop(1, 'rgba(255,255,255,0.05)');
              // }
              return gradient;
            },
          },
         
        ],
      },
      options: {
        animation: {
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
            },
          },
          y: {
            type: 'number',
            easing: 'easeOutQuart',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
              }
              ctx.yStarted = true;
              return ctx.index * delayBetweenPoints;
            },
          },
          tension: {
            from: 1,
            to: 0.8,
          },

          
        },
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
        },
        layout:{
          padding: {
            top: 0,
            right: 0,
            bottom: -10,
            left: -10
          }
        },
        plugins: {
          legend: false,
          annotation: {
            annotations: {
              line1: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: averageGraphValue,
                yMax: averageGraphValue,
                borderColor: '#B7A3E3',
                borderWidth: 1,
                label: {
                  display: true,
                  content: `Average = ${averageGraphValue.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -17,
                  fontSize: 12,
                  fontFamily: "'Inter'"
                },
              },
            },
          },
          // title: {
          //   display:true,
          // }
        },
        scales: {
          x: {
            type: 'linear',
            grid: {
              color: 'rgba(198, 185, 226, 0.63)', 
              // function (context) {
              //   const chart = context.chart;
              //   const { ctx, chartArea } = chart;

              //   if (!chartArea) {
              //     // This case happens on initial chart load
              //     return;
              //   }
              //   return getGradient(ctx, chartArea);
              // },
              lineWidth: 1,
            },
            ticks: {
              stepSize: data.length < 180 ? 1 : 2,
              beginAtZero: true,
              display: false,
              color: "#ffffff"
            },
            border: {
              dash: [5, 5],
            },
          },
          y: {
              // min: 0,
              //   max: 1,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
              // stepSize: 0.8  
            },
          },
        },
      },
    } as any;

    this.canvas = document.getElementById('myChart');
    this._api.videoStartEmitter.subscribe((response: any) => {
      if (this.myChart) {
        this.myChart.destroy();
        this.myChart = new Chart(this.canvas, config);
      } else {
        this.myChart = new Chart(this.canvas, config);
      }
      // console.log('Hello from graph componnt');
    });

    this._api.videoEndEmitter.subscribe((response: any) => {
      this.myChart.update()
    });
  }

  // capsFirstLetter(word: string) {
  //   let capitalized = '';
  //   return (capitalized = word.charAt(0).toUpperCase() + word.slice(1));
  // }
}
