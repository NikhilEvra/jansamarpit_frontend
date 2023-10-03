import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private api : HttpClient,
  ) { }

  // getattendancedata():Observable<any>{
  //   return this.http.get<any>(environment.apiurl + 'attendance.php');
  // }

  submit_tech_error(data:any):Observable<any>{
    return this.api.post<any>( 'http://localhost:3000/api/v1/auth/tech_err' , data);
  }

  get_volunteers(data:any):Observable<any>{
    return this.api.post<any>( 'http://localhost:3000/api/v1/auth/get_volunteer' , data);
  }
  get_complaint_by_id(data:any):Observable<any>{
    return this.api.post<any>( 'http://localhost:3000/api/v1/auth/get_complaint_by_id' , data);
  }
  post_volunteer(data:any):Observable<any>{
    return this.api.post<any>( 'http://localhost:3000/api/v1/auth/post_volunteer_by_id' , data);
  }
  get_volunteer_by_id(data:any):Observable<any>{
    return this.api.post<any>( 'http://localhost:3000/api/v1/auth/get_volunteer_by_id' , data);
  }
  get_volunteer_by_v_id(data:any):Observable<any>{
    return this.api.post<any>( 'http://localhost:3000/api/v1/auth/get_volunteer_by_v_id' , data);
  }

}
