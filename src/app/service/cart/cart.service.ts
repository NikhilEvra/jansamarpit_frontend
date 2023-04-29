import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private api : HttpClient) { }

  getVarients(p_id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_varients.php?p_id=' + p_id);
  }

  postCartData(dealerid:any, model:any, color: any, quantity_with_batt : any, quantity_withOut_batt: any, amountWithOutBatt:any,amountWithBatt: any):Observable<any>{
    const formData = new FormData();
    formData.append('dealerid', dealerid);
    formData.append('model', model);
    formData.append('color', color);
    formData.append('quantity_with_batt', quantity_with_batt);
    formData.append('quantity_without_batt', quantity_withOut_batt);
    formData.append('amountWithBatt', amountWithBatt);
    formData.append('amountWithOutBatt', amountWithOutBatt);
    
    return this.api.post<any>(environment.apiurl + 'add_cart.php',  formData);
  }
 
  getGrandTotal(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'cart_sum.php?d_id=' + id);
  }

  podata(dealerid:any , amount:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('dealerid',dealerid);
    formdata.append('amount',amount);

    return this.api.post<any>(environment.apiurl + 'add_po.php', formdata);
  }
  
  updateCartStatus(id:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('id',id);
    return this.api.post<any>(environment.apiurl + 'status_update.php', formdata);

  }
}
