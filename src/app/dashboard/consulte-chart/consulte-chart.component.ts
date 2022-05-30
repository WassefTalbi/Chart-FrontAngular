import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/chart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { tap } from 'rxjs';
@Component({
  selector: 'app-consulte-chart',
  templateUrl: './consulte-chart.component.html',
  styleUrls: ['./consulte-chart.component.css']
})
export class ConsulteChartComponent implements OnInit {

  public dashboards: any;
  public currentDashboardId: any;
  public dashboardView: any;
  public listcharts: any;

  public lineChart!: EChartsOption;
  public barChart!: EChartsOption;
  public pieChart!: EChartsOption
  public Chartsgraph: EChartsOption[]=[];
  

 





 public ArrayLabel:any=[]
  constructor(public chartservice: ChartService,private router:Router, private activated:ActivatedRoute) { }

  ngOnInit(): void {
//@ts-ignore
this.chartservice.getChartsofDashboard(this.activated.snapshot.params.id)
.subscribe(data => {
  //@ts-ignore
  this.listcharts = data;
this.listcharts.forEach((chart:any)=>{
  let title= chart.title
  let type=chart.type
let label=chart.labels
let datasets=chart.valeurs
 
let tableDataset:any[]=[]
let seriesn:any[]=[]
let series:any[]=[]
datasets.forEach((dataset:any)=>{
 let namedataset=dataset.name
 let backgroundColor=dataset.backgroundColor
 let valeurs=dataset.dataPoints




 if(type==="line"){
  seriesn=datasets.map((dt:any)=>{
   
    series.push({name:dt.name,areaStyle:{color:dt.backgroundColor, opacity: 0.8},emphasis:{focus:'series'},label:{show:'true',position:'top'}, stack: 'Total',data:dt.dataPoints,type:type})
    return series;
  }); 

}

if(type==="bar"){
seriesn=datasets.map((dt:any)=>{

  series.push({name:dt.name,itemStyle:{color:dt.backgroundColor, opacity: 0.8},emphasis:{itemStyle:{color:'red'}}, stack: 'Total',data:dt.dataPoints,type:type})
  return series;
}); 
}
if(type==="pie"){
  const pieDatasets:any=[];
  for( var i = 0; i < label.length; i++){
    
  //@ts-ignore
 pieDatasets.push({ value: valeurs[i], name: label[i] })

  }
  console.log('pie dataset '+i,pieDatasets)
  seriesn=datasets.map((dt:any)=>{

    series.push({name:dt.name,type:type,emphasis:{itemStyle:{ shadowBlur: 10,shadowOffsetX: 0,shadowColor: 'rgba(0, 0, 0, 0.5)'}},data:pieDatasets})
    return series;
  }); 
}



 
   
    


if (type === "line") {
  
  this.lineChart = {
    title: {
      text: title,
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
      data: label
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }

  this.Chartsgraph.push(this.lineChart)
}

  if (type === "bar") {
    console.log("this bar chart")
  this.barChart = {
    title: {
      text: title,
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
      data: label
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  this.Chartsgraph.push(this.barChart)
}
 if (type === "pie") {
  console.log("this pie chart")
 

  this.pieChart = {

    title: {
      text: title,
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
    series: series
  }
  this.Chartsgraph.push(this.pieChart)


}

});

});
console.log(this.lineChart)
 
  this.dashboardView = false;


}, err => {
  console.log(err);
});


console.log("graph",this.Chartsgraph);
  }








}
