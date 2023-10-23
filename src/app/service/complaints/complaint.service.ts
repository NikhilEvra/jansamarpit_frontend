import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    private api : HttpClient,
  ) { }

  get_complaints(data:any):Observable<any>{
    return this.api.post<any>(  environment.apiurl + 'get_complaints' , data);
  }

  // :Observable<any> {
  //   return this.api.post<any>('http://localhost:3000/api/v1/auth/login',  phone);
  // }

}
