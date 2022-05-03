import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/chart.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


 // chartformGroup?: FormGroup;
  setDataBaseformGroup?: FormGroup;
  submited: boolean = false;
  submitted: boolean = false;

  public newChartId: any;
  public config: boolean = false;
  constructor(public chartservice: ChartService, private router: Router,
    private activated: ActivatedRoute, private fb: FormBuilder) { }
    //@ts-ignore
    chartformGroup:FormGroup = this.fb.group({
      type:["", [Validators.required]],
      title: ["", Validators.required],
      description:["", Validators.required]


    });
  ngOnInit(): void {
    
    this.setDataBaseformGroup = this.fb.group({
      driverClass: ["", [Validators.required]],
      url: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]


    });
  }


  options: string[] = ["bar ", "line", "pie"];
  selectedType = "bar";
  optionsDatabase: string[] = ["mysql", "oracle", "PostgreSQL"];
  selectedTypeDatabase = "mysql";


  public add_Chart() {

    this.submited = true;
    if (this.chartformGroup?.invalid) return;
    this.chartservice.PostCreatChart(this.chartformGroup?.value).
      subscribe(data => {
        console.log(data);
        //@ts-ignore
        this.newChartId = data.id;
        console.log(this.newChartId);
        alert("mise a jour effectue avec succés");
        this.config = true;
      }, err => {
        console.log(err);
      });
  }


  public setUpDatabase() {
    this.submitted = true;
    if (this.setDataBaseformGroup?.invalid) return;

    this.chartservice.PostConfigDataBase(this.newChartId, this.setDataBaseformGroup?.value)
      .subscribe(data => {

        //@ts-ignore
        console.log(this.newChartId);
        console.log("config succesfully");
        alert("mise a jour effectue avec succés");
        this.router.navigateByUrl("/chartLoad/" + this.newChartId);

      }, err => {
        console.log(err);
      });
  }


  cancel() {
    this.router.navigateByUrl("/consulterChart");
  }

  cancell() {
    let conf = confirm("vous etes sure?");
    if (conf) {
      this.chartservice.deleteChart(this.newChartId)
        .subscribe(data => {
          console.log("delete chart");
        }
          , err => {
            console.log(err);
          })
    }
    this.router.navigateByUrl("/consulterChart");

  }
}
