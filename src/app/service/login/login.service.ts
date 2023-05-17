import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public menu = new BehaviorSubject([]);

  constructor(
    private api: HttpClient,

  ) { }

  getlogindata(userid: any, pass: any):Observable<any>{
    return this.api.get<any>(environment.apiurl +'login.php?userid=' + userid + '&spassword=' + pass);
  }
}
