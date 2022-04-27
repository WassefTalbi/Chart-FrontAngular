import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {




  public newChartId: any;
  public config: boolean = false;
  constructor(public chartservice: ChartService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): void {
  }


  options: string[] = ["bar ", "line", "pie"];
  selectedType = "bar";
  optionsDatabase: string[] = ["mysql", "oracle", "PostgreSQL"];
  selectedTypeDatabase = "mysql";


  public add_Chart(form: any) {
    console.log(form);
    this.chartservice.PostCreatChart(form).
      subscribe(data => {
        console.log(data);
        //@ts-ignore
        this.newChartId = data.id;
        console.log(this.newChartId);
        alert("mise a jour effectue avec succés");
        this.config = true;
        //this.router.navigateByUrl("/config");

      }, err => {
        console.log(err);
      });
  }


  public setUpDatabase(form: any) {

    console.log(form);
    this.chartservice.PostConfigDataBase(this.newChartId, form)
      .subscribe(data => {
      
        //@ts-ignore
        console.log(this.newChartId);
        console.log("config succesfully");
        alert("mise a jour effectue avec succés");
        this.router.navigateByUrl("/chartLoad/"+this.newChartId);

      }, err => {
        console.log(err);
      });
  }


  cancel(){
    this.router.navigateByUrl("/consulterChart");
  }


}
