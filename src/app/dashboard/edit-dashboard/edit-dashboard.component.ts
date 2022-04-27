import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';
@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {
  public currentDashboard: any;
  constructor(public chartservice: ChartService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    //@ts-ignore
    this.chartservice.getDashboardTOModifier(this.activated.snapshot.params.id).subscribe(
      data => {
        this.currentDashboard = data;

      }, err => {
        console.log(err)
      }
    );
  }
  updateDashboard(form: any) {
    //@ts-ignore
    this.chartservice.updateDashboard(this.activated.snapshot.params.id, form).subscribe(
      data => {
        console.log(form);
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
