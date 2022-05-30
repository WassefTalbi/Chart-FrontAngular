import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup?: FormGroup;
  submited:boolean=false;
  responseData:any;
 
  constructor(private authService:AuthService,private router:Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginFormGroup= this.fb.group({
      username: ["",Validators.required],
      password: ["",Validators.required]


    });
  }
public procedLogin(){
  this.submited=true;
if(this.loginFormGroup?.invalid)return;
    this.authService.login(this.loginFormGroup?.value)
      .subscribe(data => {
     this.responseData=data
        localStorage.setItem('token',this.responseData.token) 
        this.router.navigateByUrl("/consulterDashboard");
      }, err => {
        alert(" username or password Not FOUND");
        console.log(err);
      });
}
 

}
