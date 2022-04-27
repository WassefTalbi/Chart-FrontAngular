import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartService } from 'src/app/chart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulte-dashboard',
  templateUrl: './consulte-dashboard.component.html',
  styleUrls: ['./consulte-dashboard.component.css']
})
export class ConsulteDashboardComponent implements OnInit {
  public dashboards: any;
  public currentDashboardId: any;
  public dashboardView: any;
  public listOfCharts: any;



  public lineChart!: EChartsOption;
  public barChart!: EChartsOption;
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

  constructor(public chartservice: ChartService, private router:Router) { }

  ngOnInit(): void {

    this.ongetDashboards();
   
    }




    onGetListChart(id:any){
      this.router.navigateByUrl("/chartListDashboard/"+id);
  
    }

public ongetDashboards() {
    this.dashboardView = true;
    this.chartservice.getDashboards()
      .subscribe(data => {
        console.log(data);
        //@ts-ignore
        this.dashboards = data._embedded.dashboards;
      }, err => {
        console.log(err);
      });
  }



  onEdit(id:any){
    this.router.navigateByUrl("/editDashboard/"+id);
  
  }

onDelete(id:any){
  let conf = confirm("vous etes sure?");
  if (conf) {
  this.chartservice.deleteDashboard(id)
  .subscribe(data=>{
    this.ongetDashboards();
    console.log("delete dashboard");
  }
    ,err=>{
      console.log(err);
    })
  }
}

}
