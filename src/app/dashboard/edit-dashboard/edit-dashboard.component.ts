import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';
@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {
  public currentDashboard: any;
  dashboardEditformGroup?: FormGroup;
  submited: boolean = false;
  constructor(public chartservice: ChartService, private router: Router, 
    private activated: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {


    this.dashboardEditformGroup = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    });

    //@ts-ignore
    this.chartservice.getDashboardTOModifier(this.activated.snapshot.params.id).subscribe(
      data => {
        this.currentDashboard = data;

      }, err => {
        console.log(err)
      }
    );
  }
  updateDashboard() {
    this.submited = true;
    if (this.dashboardEditformGroup?.invalid) return;
    //@ts-ignore
    this.chartservice.updateDashboard(this.activated.snapshot.params.id, this.setDataBaseformGroup?.value).subscribe(
      data => {
       
        alert("update effectue avec succés");
        this.router.navigateByUrl("/consulterDashboard");
      }, err => {
        console.log(err);
      }
    );

  }

  cancel(){
    this.router.navigateByUrl("/consulterDashboard");
  }

}
