import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private api : HttpClient,
  ) { }

  // getattendancedata():Observable<any>{
  //   return this.http.get<any>(environment.apiurl + 'attendance.php');
  // }

  feedbackformdata(name:any, location: any, designation: any, no_of_vehicles: any, duration:any, any_other_vehicle: any, features:any, improvement: any, p_remark: any,
    t_remark:any,s_remark:any,spare_part_remark:any,f_remark:any,rating:any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('designation', designation);
    formData.append('no_of_vehicles' , no_of_vehicles);
    formData.append('duration', duration);
    formData.append('any_other_vehicle', any_other_vehicle);
    formData.append('features', features);
    formData.append('improvement',improvement);
    formData.append('p_remark',p_remark);
    formData.append('t_remark',t_remark);
    formData.append('s_remark',s_remark);
    formData.append('spare_part_remark',spare_part_remark);
    formData.append('f_remark',f_remark);
    formData.append('rating',rating);

    return this.api.post<any>('http://localhost/api/feedbackform.php',  formData);
  }

  complaintsformdata(name:any, location:any, designation: any, topic : any, remark: any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('designation', designation);
    formData.append('topic', topic);
    formData.append('remark',remark)
    return this.api.post<any>('http://localhost/api/contactsform.php',  formData);
  }

  //  uploadImg(formData: any ) {

  //   return this.api.post('http://localhost/api/file.php',  formData);
  // }
  
  
}
