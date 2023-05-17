import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
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

  complaintsformdata(name:any, location:any, designation: any, topic : any, remark: any, filename:any,file: any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('designation', designation);
    formData.append('topic', topic);
    formData.append('remark', remark);
    formData.append('photo', filename);
    formData.append('file', file);
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

  getComplaintById(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'getcomplaintbyid.php?c_id=' + id);
  }

  addsaleformdata(name:any, c_name:any, c_mobile: any, location : any, model_name: any,color:any, chassis:any,amount : any, a_mobile:any, test:any,battery:any,motor:any,charger:any,controller:any,
    city:any,state:any,pan:any):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('a_mobile', a_mobile);
    formData.append('c_name', c_name);
    formData.append('c_mobile', c_mobile);
    formData.append('location', location);
    formData.append('model_name', model_name);
    formData.append('color',color);
    formData.append('chassis', chassis);
    formData.append('amount' , amount);
    formData.append('test' , test);
    formData.append('battery',battery);
    formData.append('motor',motor);
    formData.append('charger',charger);
    formData.append('controller',controller);
    formData.append('city',city);
    formData.append('state',state);
    formData.append('pan',pan);
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

  getInventory(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'inventory_count.php?d_id=' + id);
  }

  getCart(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'cart_count.php?d_id=' + id);
  }

  getAllCartData(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_cart.php?d_id=' + id);
  }

  getdashdata(id:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'dashboard_data.php?d_id=' + id);
  }

  updatecomplaintStatus(id:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'reopencomplaint.php?c_id=' + id);
  }
  
  getAllProduct():Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_all_products.php');
  }

  getVarient(model : any):Observable<any>{
    const formData = new FormData();
    formData.append('model', model);
    return this.api.post<any>(environment.apiurl + 'get_varients.php', formData);
  
  }

  getVarientscount(model : any, d_id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'varient_count.php?model=' + model + '&d_id=' + d_id)
  }

  check(model:any, color:any, id:any):Observable<any>{
    const formData = new FormData();
    formData.append('model', model);
    formData.append('color' ,color);
    formData.append('d_id',id);
    return this.api.post<any>(environment.apiurl + 'checkinventory.php', formData)
    // return this.api.get<any>(environment.apiurl + 'checkinventory.php?model='+ model + '&color=' + color + '&d_id=' + id)
  }
}
