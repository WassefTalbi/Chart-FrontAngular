import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService, private router: Router) { }
users:any;
tableRole:any[]=[]
  ngOnInit(): void {
    this.getUsers();
  }


 
  public getUsers(){
this.userService.getUsers().subscribe(data=>{
  this.users=data;
 this.tableRole= this.users.map((u:any)=>{
 let roles:any[]=[]
 for(var i=0;i<u.authorities.length;i++){
  roles.push(u.authorities[i].authority)
 }
 
  return roles
})
console.log(this.tableRole)
},err=>{
console.log(err)
})
  }



  onDelete(p:any){
    let conf = confirm("vous etes sure?")
    if (conf) {
      this.userService.deleteUser(p)
        .subscribe(data => {
        }, err => {
          console.log(err)
        }
        );
    }
  }

  onEdit(id:any){
    this.router.navigateByUrl("/updateUser/"+id);
  }
  addUser(){
    this.router.navigateByUrl("/addUser")
  }
}
