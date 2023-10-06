import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  get_question_vs():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/v1/auth/get_question_vs')
  }
  get_question_yes_no():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/v1/auth/get_question_yes_no')
  }
  post_answer(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'post_poll_answer' , data);
  }
  get_answer_by_u_id(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_answer_by_u_id', data)
  }
}
