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

  getuserdata(name : any , email: any,  phone : any,usertype : any):Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone' , phone);
    formData.append('usertype',usertype);
    
    return this.api.post<any>(environment.apiurl + 'signup.php',  formData);
  }

  validateOtp(phone:any,otp:any):Observable<any>{
    return this.api.get<any>(environment.apiurl +'signup_otp_validation.php?phone=' + phone + '&otp=' + otp);
  }

  sendOtp1(phone : any ):Observable<any> {
    return this.api.post<any>('http://localhost:3000/api/v1/auth/signup',  phone);
  }
}
