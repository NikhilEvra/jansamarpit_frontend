import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

    return this.api.post<any>(environment.apiurl + 'feedbackform.php',  formData);
  }

  complaintsformdata(name:any, location:any, designation: any, topic : any, remark: any, filename:any,file1: any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('designation', designation);
    formData.append('topic', topic);
    formData.append('remark', remark);
    formData.append('photo', filename);
    formData.append('file1', file1);
    return this.api.post<any>(environment.apiurl + 'add_complaints.php',  formData);
  }

  //  uploadImg(formData: any ) {
  //   return this.api.post('http://localhost/api/file.php',  formData);
  // }
  
  uploadImg(formData: any ) {
    return this.api.post(environment.apiurl + 'file.php',  formData)
  }

  updatePassformdata(o_pass: any,n_pass: any, r_n_pass:any):Observable<any>{
    const formData = new FormData();
    formData.append('o_pass', o_pass);
    formData.append('n_pass', n_pass);
    formData.append('r_n_pass', r_n_pass);

    return this.api.post<any>(environment.apiurl + 'update_pass.php',  formData);
  }
  
  getOpenComplaints(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'open_complaints.php?d_id=' + id);
  }

  getClosedComplaints(id: any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'closed_complaint.php?d_id=' + id);
  }
  getComplaints(id:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'getallcomplaint.php?d_id=' + id);
  }

  addsaleformdata(name:any, c_name:any, c_mobile: any, location : any, model_name: any, chassis:any,amount : any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('c_name', c_name);
    formData.append('c_mobile', c_mobile);
    formData.append('location', location);
    formData.append('model_name', model_name);
    formData.append('chassis', chassis);
    formData.append('amount' , amount);
    return this.api.post<any>(environment.apiurl + 'customer_sale.php',  formData);
  }

  getSales(id:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'getallsale.php?d_id=' + id);
  }

  postPodata(name : any,model_name: any, unit_price: any,amount :any ,quantity:any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', model_name);
    formData.append('unit_price', unit_price);
    formData.append('amount', amount);
    formData.append('quantity', quantity);
    return this.api.post<any>(environment.apiurl + 'add_po.php', formData);

  }
}
