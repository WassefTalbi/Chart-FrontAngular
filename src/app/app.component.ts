import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roles!:any[]
  
  isAdmin:any=false;
  constructor(private route:Router,public auth:AuthService){}
  
  ngOnInit(): void { 
  
  }

  
  LinedataImageLogo:string="assets/Linedata_Logo.jpeg"
  
  logOut(){
    localStorage.removeItem('token')
this.route.navigateByUrl("/signin")
this.isAdmin=false
  }

  tokenExist():any{
    if( localStorage.getItem('token')!=null) 
      return true
    }


getAdmin(){

  if(  localStorage.getItem('token')!==null){
    let tt:any=  localStorage.getItem('token')
       let tableRole= JSON.parse(atob(tt.split('.')[1])).roles //to get the roles table from token
 
         for(var i=0;i<tableRole.length;i++){
         if(tableRole[i].authority==='ROLE_ADMIN')  {
           this.isAdmin=true;
           
           break;
         }    
         }  
     }
     return this.isAdmin
}

}
