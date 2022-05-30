import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/app/chart.service';
import { EChartsOption } from 'echarts';
import { Router } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-spec-chart',
  templateUrl: './spec-chart.component.html',
  styleUrls: ['./spec-chart.component.css']
})
export class SpecChartComponent implements OnInit {

  constructor(private chartService:ChartService,private route:Router, private activatedRoute:ActivatedRoute) { }


currundIdChart:any;
datasetLong:any;
tableID_Dataset:any[]=[]
title:any;
type:any;
tableDataset:any[]=[]
tableNameDataset:any[]=[]
tableLegendColor:any[]=[]
tableLabel:any[]=[];
name:any;
textTitle:any;
series:any[]=[]
seriesn:any[]=[]
dataPie:any[]=[]
public chart!: EChartsOption;
 pieDatasets:any=[];
  ngOnInit(): void {
    //@ts-ignore
this.currundIdChart=this.activatedRoute.snapshot.params.id;
this.getChart();

this.datasetLong=this.tableDataset.length;

  }

getChart(){
  this.chartService.getChartSpec(this.currundIdChart).subscribe(data=>{
    console.log(data);
  this.title=data.title;
  this.textTitle={text:data.title}
  this.type=data.type
  this.tableDataset=data.valeurs;//table of object dataset {name:'', color:}
  this.tableLabel=data.labels;
  this.datasetDetails();
  
  this.draw();
  },err=>{
    console.log(err);
  });
  
}


datasetDetails(){
  if(this.type==="line"){
    this.seriesn=this.tableDataset.map((dt:any)=>{
      this.tableID_Dataset.push(dt.id);
      this.tableNameDataset.push(dt.name);
      this.tableLegendColor.push(dt.backgroundColor);
      this.series.push({name:dt.name,areaStyle:{color:dt.backgroundColor, opacity: 0.8},emphasis:{focus:'series'},label:{show:'true',position:'top'}, stack: 'Total',data:dt.dataPoints,type:this.type})
      return this.series
    }); 
  }

if(this.type==="bar"){
  this.seriesn=this.tableDataset.map((dt:any)=>{
    this.tableID_Dataset.push(dt.id);
    this.tableNameDataset.push(dt.name);
    this.tableLegendColor.push(dt.backgroundColor);
    this.series.push({name:dt.name,itemStyle:{color:dt.backgroundColor, opacity: 0.8},emphasis:{itemStyle:{color:'red'}}, stack: 'Total',data:dt.dataPoints,type:this.type})
    return this.series
  }); 

}

if(this.type==="pie"){

 
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

}
modifierChart(form:any){
  this.chartService.updateChart(this.currundIdChart,form).subscribe(p=>{
console.log("modifier succcesss");
this.series=[];
this.tableID_Dataset=[];
this.tableNameDataset=[]
this.tableLegendColor=[]
this.getChart();
this.route.navigateByUrl("/specChart/"+this.currundIdChart);

  },err=>{
    console.log(err);
  });

}


draw(){

 if(this.type==="line"||this.type==="bar"){
  this.chart = {
    title: this.textTitle,
    color: this.tableLegendColor,
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
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
    legend: {
      data: this.tableNameDataset
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
  

}




}
