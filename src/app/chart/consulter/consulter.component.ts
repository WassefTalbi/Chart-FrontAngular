import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartService } from 'src/app/chart.service';
import { Router } from '@angular/router';
import * as echarts from 'echarts';


@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements OnInit {


  constructor(public chartService: ChartService, private route: Router) { }

  currundIdChart:any;
  datasetLong:any;
  tableID_Dataset:any[]=[]
  title:any;
  type:any;
  tableDataset:any[]=[]
  tableLabel:any[]=[];
  name:any;
  textTitle:any;
  series:any[]=[]
  seriesn:any[]=[]
  dataPie:any[]=[]
  listcharts :any
  currentChartId:any
  public chart!: EChartsOption;
   pieDatasets:any=[];

  ngOnInit(): void {
    this.ongetCharts();
  }

  public ongetCharts() {
    this.chartService.getCharts()
      .subscribe(data => {
        //@ts-ignore
        this.listcharts = data._embedded.charts;
        console.log(this.listcharts);
      },
        err => {
          console.log(err);
        });

  }

  onGetChartById(idChart: any) {
    
    this.chartService.getChartSpec(idChart).subscribe(data=>{
      console.log(data.id);
    this.title=data.title;
    this.textTitle={text:data.title}
    this.type=data.type
    this.currentChartId=data.id
    this.tableDataset=data.valeurs;//table of object dataset {name:'', color:}
    this.tableLabel=data.labels;
    this.datasetDetails();
    this.tableLabel=[]
    this.tableDataset=[]
   
    },err=>{
      console.log(err);
    });
        
  }



  datasetDetails(){
    this.seriesn=[]
    this.series=[]
    if(this.type==="line"){
      this.seriesn=this.tableDataset.map((dt:any)=>{
        this.tableID_Dataset.push(dt.id)
        this.series.push({name:dt.name,areaStyle:{color:dt.backgroundColor, opacity: 0.8},emphasis:{focus:'series'},label:{show:'true',position:'top'}, stack: 'Total',data:dt.dataPoints,type:this.type})
        return this.series
      }); 
      

    }
  
 else if(this.type==="bar"){
    this.seriesn=this.tableDataset.map((dt:any)=>{
      this.tableID_Dataset.push(dt.id)
      this.series.push({name:dt.name,itemStyle:{color:dt.backgroundColor, opacity: 0.8},emphasis:{itemStyle:{color:'red'}}, stack: 'Total',data:dt.dataPoints,type:this.type})
      return this.series
    }); 
 
  

  }
  
  else if(this.type==="pie"){
  
   
    this.seriesn=this.tableDataset.map((dt:any)=>{
      this.tableID_Dataset.push(dt.id)
      for( var i = 0; i < this.tableLabel.length; i++){
        this.dataPie.push({value:dt.dataPoints[i],name:this.tableLabel[i]})
      }
      console.log(this.dataPie)
     this. series.push({name:dt.name,type:this.type,emphasis:{itemStyle:{ shadowBlur: 10,shadowOffsetX: 0,shadowColor: 'rgba(0, 0, 0, 0.5)'}},data:this.dataPie})
      return this.series;
    }); 
   

  }
  console.log(this.tableLabel)
  console.log(this.tableDataset)
  this.draw();
  }
  
  draw(){
  
   if(this.type==="line"||this.type==="bar"){
    this.chart = {
      title: this.textTitle,
  
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
        data: this.tableLabel
      },
      yAxis: {
        type: 'value'
      },
      series:this.series
    }
    
   }
     else if(this.type==="pie"){
       console.log("pie dataset")
      this.chart = {
  
        title: {
          text: this.title,
        
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: this.series
      }
     }
     this.tableLabel=[]
    this.tableDataset=[]
    console.log(this.tableLabel)
    console.log(this.tableDataset)
  }
  
  



  onDelete(id: any) {
    let conf = confirm("vous etes sure?");
    if (conf) {
      this.chartService.deleteChart(id)
        .subscribe(data => {
          this.type = null;
          this.ongetCharts();
          console.log("delete chart");

        }
          , err => {
            console.log(err);
          })
    }
  }
  onEdit(id: any) {
    this.route.navigateByUrl("/specChart/" + id);

  }
  


}