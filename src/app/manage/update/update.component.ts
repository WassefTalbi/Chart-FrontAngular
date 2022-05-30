import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private userService:UserService, private route:Router ,private activatedRoute:ActivatedRoute) { }
  currundIdUser:any;
  user:any;
  tableRole:any[]=[]
  RoleCheckbox:any
  ngOnInit(): void {
    //@ts-ignore
    this.currundIdUser=this.activatedRoute.snapshot.params.id;
    this.getUser();
    this.RoleCheckbox = [
      { name: 'ROLE_SUPER_ADMIN', checked: false },
      { name: 'ROLE_ADMIN', checked: false },
      { name: 'ROLE_USER', checked: false },
     
    ];
  }

  public getUser(){
    this.userService.getUser(this.currundIdUser).subscribe((data:any)=>{
      this.user=data;
    },err=>{
    console.log(err)
    })
      }

      updateUser(form:any){
        this.result();
        this.userService.updateUserById(this.currundIdUser,form).subscribe(
          data=>{
            console.log(form);
          alert("mise a jour effectue avec succés");
          this.route.navigateByUrl("/users")
          },err=>{
    console.log(err);
          }
        );
    
      }

      get result() {
        return this.RoleCheckbox.filter((item:any) => item.checked);
      }


}
