import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http : HttpClient,
  ) { }

  getattendancedata():Observable<any>{
    return this.http.get<any>(environment.apiurl + 'attendance.php');
  }

  add_complaints(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'add_complaints' , data);
  }
}
