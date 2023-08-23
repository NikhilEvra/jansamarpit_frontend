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

  sendOtp(phone : any ):Observable<any> {
    const formData = new FormData();
    formData.append('phone', phone);
    return this.api.post<any>(environment.apiurl + 'otp.php',  formData);
  }

  ValidateOtp(phone:any,otp:any):Observable<any>{
    return this.api.get<any>(environment.apiurl +'validate_otp.php?phone=' + phone + '&otp=' + otp);
  }
  
  get_finance_list():Observable<any>{
    return this.api.get<any>(environment.apiurl +'finance_partners.php');
  }
  get_insurance_list():Observable<any>{
    return this.api.get<any>(environment.apiurl +'insurance_partners.php');
  }
}
