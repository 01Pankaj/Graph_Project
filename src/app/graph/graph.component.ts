import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
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
  @Output() graphBase64 = new EventEmitter();
  @Input() emotionData: any;
  @Input() videoDuration: any;
  @Input() emotionDataAll: any;
  @Input() currentTime: any;
  @Input() selectedValue: any;
  
  // averageGraphValue: number = 0;

  constructor(private _api: ApiService) {}

  ngOnInit() {
    Chart.register(annotationPlugin);
    const data = [];
    const data2 = [];
    const data3 = [];
    const data4 = [];
    const data5 = [];
    const data6 = [];
    const data7 = [];
    const data8 = [];
    const data9 = [];
    const data10 = [];
    const data11 = [];
    const data12 = [];
    const data13 = [];
    const data14 = [];
    const data15 = [];
    const data16 = [];
    const data17 = [];
    const data18 = [];
    const data19 = [];
    if (this.selectedValue) {
      // console.log(this.selectedValue, 'from graph');
      
      // for (let i = 0; i < this.emotionDataAll.length; i++) {
      for (let index = 0; index < this.selectedValue.length; index++) {
        // console.log(this.selectedValue[index]);
        if (this.selectedValue[index].toLowerCase() == 'angry') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data.push(averageOfData, graphData);
        } else if (this.selectedValue[index].toLowerCase() == 'arousal') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data2.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'attention') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data3.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'disgust') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data4.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'evalence') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data5.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'happy') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data6.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'neutral') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data7.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'sad') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data8.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'scare') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
          arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
            let averageOfData = arrayForAvg.reduce((acc, cur)=>{
              return acc + cur
            }) / arrayForAvg.length
            data9.push(averageOfData, graphData)
        } else if (this.selectedValue[index].toLowerCase() == 'surprised') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data10.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'accurate') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data11.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'boring') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data12.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'confusing') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data13.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'dislike') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data14.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'engaging') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data15.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'like') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data16.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'love') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data17.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'memorable') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data18.push(averageOfData, graphData)
        }else if (this.selectedValue[index].toLowerCase() == 'valence') {
          let arrayForAvg = [];
          let graphData = [];
          for (let i = 0; i < this.emotionDataAll.length; i++) {
            graphData.push({
              x: this.emotionDataAll[i].time,
              y: this.emotionDataAll[i][this.selectedValue[index].toLowerCase()],
            });
            arrayForAvg.push(this.emotionDataAll[i][this.selectedValue[index].toLowerCase()])
          }
          let averageOfData = arrayForAvg.reduce((acc, cur)=>{
            return acc + cur
          }) / arrayForAvg.length
          data19.push(averageOfData, graphData)
        }
      }
    }
    // console.log(data, 'data form graph');
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
    const config = {
      type: 'line',
      data: {
        datasets: [
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(205,0,0,0.5)');
                gradient.addColorStop(0.75, 'rgba(205,0,0,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data2[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(0, 255, 255,0.5)');
                gradient.addColorStop(0.75, 'rgba(0, 255, 255,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data3[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(255, 200, 0,0.5)');
                gradient.addColorStop(0.75, 'rgba(255, 200, 0,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data4[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(49, 46, 53,0.5)');
                gradient.addColorStop(0.75, 'rgba(49, 46, 53,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data5[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(210, 100, 250,0.5)');
                gradient.addColorStop(0.75, 'rgba(210, 100, 250,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data6[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(0, 100, 0,0.5)');
                gradient.addColorStop(0.75, 'rgba(0, 100, 0,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data7[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(80,80,80,0.5)');
                gradient.addColorStop(0.75, 'rgba(127, 86, 217, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data8[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(120, 50, 120,0.5)');
                gradient.addColorStop(0.75, 'rgba(127, 86, 217, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data9[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(100, 5, 35,0.5)');
                gradient.addColorStop(0.75, 'rgba(100, 5, 35,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },
          {
            borderColor: '#ffffff',
            borderWidth: 3,
            radius: 0,
            data: data10[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(255, 255, 0,0.5)');
                gradient.addColorStop(0.75, 'rgba(255, 255, 0,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
            borderDash: [5, 5],
            radius: 0,
            data: data11[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(255, 102, 102,0.5)');
                gradient.addColorStop(0.75, 'rgba(255, 102, 102,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
            borderDash: [5, 5],
            radius: 0,
            data: data12[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(255, 204, 153,0.5)');
                gradient.addColorStop(0.75, 'rgba(255, 204, 153,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
            borderDash: [5, 5],
            radius: 0,
            data: data13[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(255, 255, 153,0.5)');
                gradient.addColorStop(0.75, 'rgba(255, 153, 0,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
                borderDash: [5, 5],
                radius: 0,
            data: data14[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(204, 255, 153,0.5)');
                gradient.addColorStop(0.75, 'rgba(204, 255, 153,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
                borderDash: [5, 5],
                radius: 0,
            data: data15[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(102, 255, 178,0.5)');
                gradient.addColorStop(0.75, 'rgba(102, 255, 178,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
                borderDash: [5, 5],
                radius: 0,
            data: data16[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(102, 255, 255,0.5)');
                gradient.addColorStop(0.75, 'rgba(102, 255, 255,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
                borderDash: [5, 5],
                radius: 0,
            data: data17[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(102, 178, 255,0.5)');
                gradient.addColorStop(0.75, 'rgba(102, 178, 255,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
                borderDash: [5, 5],
                radius: 0,
            data: data18[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(102, 102, 255,0.5)');
                gradient.addColorStop(0.75, 'rgba(102, 102, 255,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
              return gradient;
            },
          },{
            borderColor: '#ffffff',
            borderWidth: 3,
                borderDash: [5, 5],
                radius: 0,
            data: data19[1],
            fill: 'origin',
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              // console.log(canvas, 'canvas');
              let gradient = canvas.createLinearGradient(
                0,
                0,
                0,
                canvas.canvas.height
              );
              gradient.addColorStop(0, 'rgba(178, 102, 255,0.5)');
                gradient.addColorStop(0.75, 'rgba(178, 102, 255,0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
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
            to: 0.6,
          },
          onComplete: (context) =>{
 
            const graphBase64 = context.chart.toBase64Image()
            // console.log(graphBase64);
            this.graphBase64.emit(graphBase64);
          // this.myChart.update();
        },
        },
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
        },
        layout: {
          padding: {
            top: 0,
            right: 0,
            bottom: -10,
            left: -10,
          },
        },
        plugins: {
          legend: false,
          annotation: {
            annotations: {
              line1: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data[0],
                yMax: data[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data.length > 1 ? true : false,
                label: {
                  display: data.length > 1 ? true : false,
                  content: `Average Angry = ${data[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: 15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                  adjustScaleRange: true,
                },
              },
              line2: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data2[0],
                yMax: data2[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data2.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data2.length > 1 ? true : false,
                  content: `Average Arousal = ${data2[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'"
                },
              },
              line3: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data3[0],
                yMax: data3[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data3.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data3.length > 1 ? true : false,
                  content: `Average Attention = ${data3[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: 15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line4: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data4[0],
                yMax: data4[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data4.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data4.length > 1 ? true : false,
                  content: `Average Disgust = ${data4[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line5: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data5[0],
                yMax: data5[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data5.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data5.length > 1 ? true : false,
                  content: `Average Valence = ${data5[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: 15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line6: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data6[0],
                yMax: data6[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data6.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data6.length > 1 ? true : false,
                  content: `Average Happy = ${data6[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line7: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data7[0],
                yMax: data7[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data7.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data7.length > 1 ? true : false,
                  content: `Average Neutral = ${data7[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: 15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line8: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data8[0],
                yMax: data8[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data8.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data8.length > 1 ? true : false,
                  content: `Average sad = ${data8[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line9: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data9[0],
                yMax: data9[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data9.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data9.length > 1 ? true : false,
                  content: `Average Scare = ${data9[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: 15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line10: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data10[0],
                yMax: data10[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data10.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data10.length > 1 ? true : false,
                  content: `Average Surprised = ${data10[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line11: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data11[0],
                yMax: data11[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data11.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data11.length > 1 ? true : false,
                  content: `Average Accurate = ${data11[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
              line12: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data12[0],
                yMax: data12[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data12.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data12.length > 1 ? true : false,
                  content: `Average Boring = ${data12[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line13: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data13[0],
                yMax: data13[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data13.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data13.length > 1 ? true : false,
                  content: `Average Confusing = ${data13[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line14: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data14[0],
                yMax: data14[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data14.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data14.length > 1 ? true : false,
                  content: `Average Dislike = ${data14[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line15: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data15[0],
                yMax: data15[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data15.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data15.length > 1 ? true : false,
                  content: `Average Engaging = ${data15[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line16: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data16[0],
                yMax: data16[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data16.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data16.length > 1 ? true : false,
                  content: `Average Like = ${data16[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line17: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data17[0],
                yMax: data17[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data17.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data17.length > 1 ? true : false,
                  content: `Average Love = ${data17[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line18: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data18[0],
                yMax: data18[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data18.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data18.length > 1 ? true : false,
                  content: `Average Memorable = ${data18[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },line19: {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: data19[0],
                yMax: data19[0],
                borderColor: '#B7A3E3',
                borderWidth: 1,
                display: data19.length > 1 ? true : false,
                adjustScaleRange: true,
                label: {
                  display: data19.length > 1 ? true : false,
                  content: `Average Valence = ${data19[0]?.toFixed(2)}`,
                  backgroundColor: 'rgba(255,255,255,0)',
                  color: 'white',
                  position: 'end',
                  yAdjust: -15,
                  fontSize: 12,
                  fontFamily: "'Inter'",
                },
              },
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            grid: {
              color: 'rgba(198, 185, 226, 0.63)',
              lineWidth: 1,
            },
            ticks: {
              stepSize: data[1]?.length < 180 || data2[1]?.length < 180 || data3[1]?.length < 180 || data4[1]?.length < 180 || data5[1]?.length < 180 || data6[1]?.length < 180 || data7[1]?.length < 180 || data8[1]?.length < 180 || data9[1]?.length < 180 || data10[1]?.length || data11[1]?.length || data12[1]?.length || data13[1]?.length || data14[1]?.length || data15[1]?.length || data16[1]?.length || data17[1]?.length || data18[1]?.length || data19[1]?.length < 180 ? 1 : 2,
              beginAtZero: true,
              display: false,
              color: '#ffffff',
            },
            border: {
              dash: [5, 5],
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    } as any;

  // console.log(config.datasets);
  
    this.canvas = document.getElementById('myChart');
    this._api.videoStartEmitter.subscribe((response: any) => {
      if (this.myChart) {
        this.myChart.destroy();
        this.myChart = new Chart(this.canvas, config);
      } else {
        this.myChart = new Chart(this.canvas, config);
      }
      setTimeout(() => {
        
        this.myChart.update();
      }, 1000);
      // console.log('Hello from graph componnt');
    });

    this._api.videoEndEmitter.subscribe((response: any) => {
      if (this.myChart) {
        this.myChart.update();
      }
    });

  }

}