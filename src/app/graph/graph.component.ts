import {
  Component,
  Input,
  NgZone,
  Inject,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
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
  @Input() emotionData: any;
  @Input() videoDuration: any;
  @Input() emotionDataAll: any;
  @Input() currentTime: any;
  @Input() selectedValue: any;

  constructor(private _api: ApiService) {}

  ngOnInit() {
    Chart.register(annotationPlugin);

    console.log(this.selectedValue, 'from graph');

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
    const animation = {
      x: {
        type: 'number',
        easing: 'easeOutQuart',
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
        to: 0.4,
      },
    };

    const config = {
      type: 'line',
      data: {
        datasets: [
          {
            borderColor:
              this.selectedValue == 'angry'
                ? 'rgb(205,0,0)'
                : this.selectedValue == 'arousal'
                ? 'rgb(0, 255, 255)'
                : this.selectedValue == 'attention'
                ? 'rgb(255, 200, 0)'
                : this.selectedValue == 'disgust'
                ? 'rgb(49, 46, 53)'
                : this.selectedValue == 'evalence'
                ? 'rgb(210, 100, 250)'
                : this.selectedValue == 'happy'
                ? 'rgb(0, 100, 0)'
                : this.selectedValue == 'neutral'
                ? 'rgb(80, 80, 80)'
                : this.selectedValue == 'sad'
                ? 'rgb(120, 50, 120)'
                : this.selectedValue == 'scare'
                ? 'rgb(100, 5, 35)'
                : this.selectedValue == 'surprised'
                ? 'rgb(255, 255, 0)'
                : 'rgba(255,255,255)',
            borderWidth: 2,
            radius: 0,
            data: data,
            fill: true,
            backgroundColor:
              this.selectedValue == 'angry'
                ? 'rgba(205,0,0,0.3)'
                : this.selectedValue == 'arousal'
                ? 'rgba(0, 255, 255,0.3)'
                : this.selectedValue == 'attention'
                ? 'rgba(255, 200, 0,0.3)'
                : this.selectedValue == 'disgust'
                ? 'rgba(49, 46, 53,0.3)'
                : this.selectedValue == 'evalence'
                ? 'rgba(210, 100, 250,0.3)'
                : this.selectedValue == 'happy'
                ? 'rgba(0, 100, 0,0.3)'
                : this.selectedValue == 'neutral'
                ? 'rgba(80,80,80,0.3)'
                : this.selectedValue == 'sad'
                ? 'rgba(120, 50, 120,0.3)'
                : this.selectedValue == 'scare'
                ? 'rgba(100, 5, 35,0.3)'
                : this.selectedValue == 'surprised'
                ? 'rgba(255, 255, 0,0.3)'
                : 'rgba(255,255,255,0.3)',
          },
        ],
      },
      options: {
        animation,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
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
                borderColor: 'rgba(0,255,0,0.5)',
                borderWidth: 2,
                label: {
                  display: true,
                  content: `Average ${this.capsFirstLetter(this.selectedValue == "evalance" ? this.selectedValue = "Valance" : this.selectedValue )}:  ${averageGraphValue.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  color: 'black',
                  position: 'end',
                  yAdjust: 17,
                },
              },
            },
          },
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
              stepSize: data.length < 30 ? 0.5 : 1,
              precision: 0,
            },
            border: {
              dash: [5, 5],
            },
          },
          y: {
            grid: {
              display: false,
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
      console.log('Hello from graph componnt');
    });

    this._api.videoEndEmitter.subscribe((response: any) => {});
  }

  capsFirstLetter(word: string) {
    let capitalized = "";
    return capitalized = word.charAt(0).toUpperCase() + word.slice(1)
  }
}
