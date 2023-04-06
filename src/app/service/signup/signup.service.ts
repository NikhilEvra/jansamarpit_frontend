import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private api : HttpClient,
  ) { }

  getuserdata(name : any , email: any, password: any, phone : any):Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone' , phone);
    return this.api.post<any>('http://localhost/api/signup.php',  formData);
  }
}
