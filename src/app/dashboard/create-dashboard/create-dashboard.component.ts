import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.css']
})
export class CreateDashboardComponent implements OnInit {

  constructor(public chartservice: ChartService, private router: Router) { }

  ngOnInit(): void {
  }

  add_Dashboard(form:any){

    this.chartservice.createDashboard( form)
    .subscribe(data => {
    
    
      alert(" Dashboard crée avec succés");
      this.router.navigateByUrl("/consulterDashboard");

    }, err => {
      console.log(err);
    });

  }


cancel(){
  this.router.navigateByUrl("/consulterDashboard");
}

}
