import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(
    private http : HttpClient
  ) { }

  get_question():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/v1/auth/get_question')
  }
}
