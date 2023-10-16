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
    return this.http.get<any>(environment.apiurl +'get_question')
  }
  get_question_vs():Observable<any>{
    return this.http.get<any>(environment.apiurl +'get_question_vs')
  }
  get_question_yes_no():Observable<any>{
    return this.http.get<any>(environment.apiurl +'get_question_yes_no')
  }
  post_answer(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'post_poll_answer' , data);
  }
  get_answer_by_u_id(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_answer_by_u_id', data)
  }
  get_question2(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_question2',data)
  }
  get_poll_answers(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_polls_answer' , data)
  }
  get_poll_answers_vs(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_polls_answer_vs', data)
  }
  get_poll_answers_yesno(data:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_polls_answer_yesno', data)
  }
  get_graph_data(id:any):Observable<any>{
    return this.http.post<any>(environment.apiurl + 'get_graph_data' , id);
  }
  get_answer_by_question(data:any):Observable<any>{
    return this.http.post(environment.apiurl + 'get_polls_answer_by_question', data)
  }
}
