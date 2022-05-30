import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host:String="http://localhost:1920/"

  constructor( private http:HttpClient) { }

public getUsers(){
  return this.http.get(this.host+"api/users");
}
public getUser(id:any){
  return this.http.get(this.host+"api/userById/"+id);
}

public CreatUser(form:any){
  return this.http.post(this.host+"appUsers",form);
}
public updateUserById(id:any,form:any){
  return this.http.put(this.host+"api/UpdateUser/"+id,form);
}

public deleteUser(p:any){
  return this.http.delete(this.host+"/appUsers/"+p.id);
}
}
