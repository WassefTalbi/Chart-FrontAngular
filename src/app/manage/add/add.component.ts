import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private userService:UserService,private router: Router, private fb: FormBuilder) { }

  UserformGroup?: FormGroup;
  submited:boolean=false;
  ngOnInit(): void {
    this.UserformGroup = this.fb.group({
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      email: ["",Validators.required],

  });
}
   add_User() {

    this.submited=true;
    if(this.UserformGroup?.invalid)return;
        this.userService.CreatUser(this.UserformGroup?.value)
          .subscribe(data => {
            alert(" user crée avec succés");
            this.router.navigateByUrl("/users");
    
          }, err => {
            console.log(err);
          });
    
      }
    

}
