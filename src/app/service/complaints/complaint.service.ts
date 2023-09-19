import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    private api : HttpClient,
  ) { }

  get_complaints():Observable<any>{
    return this.api.get<any>('http://localhost:3000/api/v1/auth/get_complaints');
  }
  // :Observable<any> {
  //   return this.api.post<any>('http://localhost:3000/api/v1/auth/login',  phone);
  // }

}
