import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';


@Component({
  selector: 'app-parameter-chart',
  templateUrl: './parameter-chart.component.html',
  styleUrls: ['./parameter-chart.component.css']
})
export class ParameterChartComponent implements OnInit {
idChartParameter:any;
public lineChart!: EChartsOption;
public barChart!: EChartsOption;
public pieChart!: EChartsOption;
public chartByIdData: any;
public currentChartId: any;
public chartDatasets: any;
public chartLabels: any;
public chartDataPoint: any;
public currentType: any;
public currentTitle: any;
public currentURLDataset: any;
public currentURLLabel: any;
public currentURLDatapoint: any;
public tableauChartLabel: any = [];
public tableauChartDataset: any = [];
public tableauChartDatasetName: any = [];
public tableauChartDataPoint: any = [];
public currentDatasetLabel: any;
public tableOfTestDataPoint: any;
currentDatasetLabelhref: any;
public pieDatasets:any=[];

  constructor(public chartservice: ChartService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): void {
//@ts-ignore
    this.idChartParameter=this.activated.snapshot.params.id;


    this.chartservice.getChartById(this.idChartParameter)
    .subscribe(data => {
      this.chartByIdData = data;
      //@ts-ignore
      this.currentChartId = this.idChartParameter;
      console.log(this.currentChartId);
      this.currentType = this.chartByIdData.type;
      this.currentTitle = this.chartByIdData.title
      this.currentURLDataset = this.chartByIdData._links.datasets.href;
      this.currentURLLabel = this.chartByIdData._links.labels.href;


      this.onGetChartDatasets();
      this.onGetChartLabels();
      //this.drawChart();
    

    }, err => {
      console.log(err)
    }
    );
  }




  ongetDataset(){
    const personne={ name:"wassef",lastName:"talbi"}
    console.log(personne);
  ;
  this.chartservice.getChartDatasets(this.currentURLDataset)
  .subscribe(data=>{
    //@ts-ignore
    this.chartDatasets = data._embedded.chartDatasets;
  
    this.pieDatasets = this.chartDatasets.forEach((dataset: any) => {
      this.currentDatasetLabel = dataset.label
      console.log(this.currentDatasetLabel)
      this.currentDatasetLabelhref = dataset._links.dataPoints.href
      this.chartservice.getChartDataPoint(this.currentDatasetLabelhref)
        .subscribe(data => {
          //@ts-ignore
          this.chartDataPoint = data._embedded.dataPoints;
          this.tableOfTestDataPoint = this.chartDataPoint.map((dataPoint: any) => {
            console.log(dataPoint.valeur);
            return dataPoint.valeur;
  
          });
          console.log(this.tableOfTestDataPoint);
          //this.drawChart();
  
        },
          err => {
            console.log(err);
          });
  
  
    });
  
  },err=>{
    console.log(err);
  })
  
  }
  
    onGetChartDatasets() {
      this.chartservice.getChartDatasets(this.currentURLDataset)
        .subscribe(data => {
          // @ts-ignore
          this.chartDatasets = data._embedded.chartDatasets;
          console.log(this.currentURLDataset);
          let datasetoftest = this.chartDatasets.forEach((dataset: any) => {
            this.currentDatasetLabel = dataset.label
           
            this.currentDatasetLabelhref = dataset._links.dataPoints.href
            this.chartservice.getChartDataPoint(this.currentDatasetLabelhref)
              .subscribe(data => {
                //@ts-ignore
                this.chartDataPoint = data._embedded.dataPoints;
                this.tableOfTestDataPoint = this.chartDataPoint.map((dataPoint: any) => {
               
             
                  return dataPoint.valeur;
  
                });
               
                
              
  
           
              console.log("wassef",this.tableOfTestDataPoint);
             
              console.log("wassef",this.tableauChartLabel)
          
            for( var i = 0; i < this.tableOfTestDataPoint.length; i++){
             
              //@ts-ignore
              this.pieDatasets.push({ value: this.tableOfTestDataPoint[i], name: this.tableauChartLabel[i] })
             }
         
                console.log(this.tableOfTestDataPoint);
                this.drawChart();
                this.pieDatasets=[];
              },
                err => {
                  console.log(err);
                });
  
  
          });
  
        }, err => {
          console.log(err);
        });
    }
  
    onGetChartLabels() {
      this.chartservice.getChartLabels(this.currentURLLabel)
        .subscribe(data => {
          //@ts-ignore
          this.chartLabels = data._embedded.labels;
  
  
          this.tableauChartLabel = this.chartLabels.map((c: any) => {
            return c.descLabel;
          })
     
         
  
        }, err => {
          console.log(err);
        });
    }
  
    drawChart() {
  
      if (this.currentType === "line") {
        this.lineChart = {
          title: {
            text: this.currentTitle,
          },
  
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.tableauChartLabel
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            stack: 'Total',
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.tableOfTestDataPoint,
            type: this.chartByIdData.type,
          
          },
          
        ]
        }
      }
      else if (this.currentType === 'bar') {
  
        this.barChart = {
          title: {
            text: this.currentTitle,
          },
  
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
  
          tooltip: {
          },
          xAxis: {
            type: 'category',
            data: this.tableauChartLabel
          },
          yAxis: {
            type: 'value'
          },
          series: [{
  
            data: this.tableOfTestDataPoint,
            type: this.chartByIdData.type,
  
          }]
        }
  
      }
      else if (this.currentType === 'pie') {
        this.pieChart = {
  
          title: {
            text: this.currentTitle,
           
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
  
              data: this.pieDatasets,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
     
    }



}
