import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: HttpClient,

  ) { }

  getlogindata(userid: any, pass: any):Observable<any>{
    return this.api.get<any>('http://localhost/api/login.php?userid=' + userid + '&spassword=' + pass);
  }
}
