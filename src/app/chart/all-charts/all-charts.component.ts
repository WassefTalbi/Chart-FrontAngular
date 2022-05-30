import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';

@Component({
  selector: 'app-all-charts',
  templateUrl: './all-charts.component.html',
  styleUrls: ['./all-charts.component.css']
})
export class AllChartsComponent implements OnInit {

  constructor(public chartservice: ChartService , private router: Router) { }
public charts!:any[]
  ngOnInit(): void {

this.chartservice.getAllChart().subscribe(data=>{
   //@ts-ignore
  this.charts=data;
  console.log(data)

  
},err=>{
  console.log(err)
})

  }


 
  spec(id:any){
    this.router.navigateByUrl("/specChart/"+id);
  }

}
