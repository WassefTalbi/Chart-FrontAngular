import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ChartService {
 public host:String="http://localhost:1920/"
  constructor(private http:HttpClient) { }

public getCharts(){
  return this.http.get(this.host+"charts")
}

public getChartById(id:any){
  
  return this.http.get(this.host+"charts/"+id)
}

public getChartLabels(label:any){
  return this.http.get(label);
}

public getChartDatasets(dataset:any){
  return this.http.get(dataset);
}

public getChartDataPoint(dataPoint:any){
  return this.http.get(dataPoint);
}


public PostCreatChart(form:any){
  return this.http.post(this.host+"createChart",form);
}
public PostConfigDataBase(id:any,data:any){
  return this.http.post(this.host+"config/"+id,data);
}

public getDashboards(){
  return this.http.get(this.host+"dashboards");
}
getChartsofDashboard(idDashboard:any){
  return this.http.get(this.host+"dashboards/"+idDashboard+"/charts");
}

public PostLoadChart(id:any,data:any){
  return this.http.post(this.host+"LoadData/"+id,data);
}

public createDashboard(data:any){
  return this.http.post(this.host+"dashboards",data);
}
public deleteDashboard(id:any){
  return this.http.delete(this.host+"dashboards/"+id);
}
public deleteChart(id:any){
  return this.http.delete(this.host+"charts/"+id);
}

public getDashboardTOModifier(id:any){
  return this.http.get(this.host+"dashboards/"+id);
}

public updateDashboard(id:any,data:any){
  return this.http.put(this.host+"dashboards/"+id,data);
}
}
