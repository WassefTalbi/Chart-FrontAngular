import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/chart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-load-chart',
  templateUrl: './load-chart.component.html',
  styleUrls: ['./load-chart.component.css']
})
export class LoadChartComponent implements OnInit {

  public configId:any;
  public dashboards: any;
  public currentDashboardId: any;
  public dashboardView: any;
  public listcharts: any;



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
  public execute:boolean=false;

  constructor(public chartservice: ChartService,private router:Router, private activated:ActivatedRoute) { }

  ngOnInit(): void {
//@ts-ignore
   this.configId= this.activated.snapshot.params.id;
console.log(this.configId);
  }



  public load_Chart(form:any){
console.log(form);
this.chartservice.PostLoadChart(this.configId, form)
.subscribe(data => {
  //@ts-ignore
  console.log(this.newChartId);
 
  alert("Data effectue avec succés");
 this.execute=true;
this.onGetChartById() 

  
}, err => {
  console.log(err);
}); 

  }







 public onGetChartById() {
    this.chartservice.getChartById(this.configId)
      .subscribe(data => {
        this.chartByIdData = data;
       
       
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

  onGetChartDatasets() {
    this.chartservice.getChartDatasets(this.currentURLDataset)
      .subscribe(data => {
        // @ts-ignore
        this.chartDatasets = data._embedded.chartDatasets;
        console.log(this.currentURLDataset);
        let datasetoftest = this.chartDatasets.forEach((dataset: any) => {
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

    
        console.log(this.tableauChartLabel);
console.log ("draw data now in chart");
        


      }, err => {
        console.log(err);
      });
  }

  drawChart() {
    console.log("in the draw methode " + this.currentTitle)
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
          
          data: this.tableOfTestDataPoint,
          type: this.chartByIdData.type,
          areaStyle: {}
        }]
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
          text: 'Referer of a Website',
          subtext: 'Fake Data',
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
