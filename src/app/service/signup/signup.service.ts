import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.api.post<any>('https://evramedia.com/apifolder/signup.php',  formData);
  }
}
