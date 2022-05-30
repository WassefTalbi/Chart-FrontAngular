import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public host:String="http://localhost:1920/"

  constructor(private http:HttpClient) { }
admin:boolean=false;
  public login(data:any){
    return this.http.post(this.host+"signin",data);
  }

  isLoggedIn(){
    return localStorage.getItem('token')!=null;
  }
  
  

  getToken(){
    return localStorage.getItem('token')
  }




}
 