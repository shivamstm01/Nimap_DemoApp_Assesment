import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public EditPicForm:boolean;

  url="http://localhost:3000/UsersData"
  constructor(private http:HttpClient) { }

  getAllUserData():Observable<any>{
    return this.http.get(this.url)
  }
  saveUserData(data:any):Observable<any>{
    return this.http.post(this.url,data)
  }
 

  getDataById(id):Observable<any>{
      return this.http.get(`${this.url}/${id}`);
  }

  UpdateEditData(id:number,data:any):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data);
}


}
