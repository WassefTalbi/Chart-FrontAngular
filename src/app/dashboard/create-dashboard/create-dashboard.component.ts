import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.css']
})
export class CreateDashboardComponent implements OnInit {

  dashboardformGroup?: FormGroup;
  submited:boolean=false;
  constructor(public chartservice: ChartService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.dashboardformGroup = this.fb.group({
      title: ["",Validators.required],
      description: ["",Validators.required]


    });

  }



  add_Dashboard() {
this.submited=true;
if(this.dashboardformGroup?.invalid)return;
    this.chartservice.createDashboard(this.dashboardformGroup?.value)
      .subscribe(data => {
        alert(" Dashboard crée avec succés");
        this.router.navigateByUrl("/consulterDashboard");

      }, err => {
        console.log(err);
      });

  }


  cancel() {
    this.router.navigateByUrl("/consulterDashboard");
  }

}
