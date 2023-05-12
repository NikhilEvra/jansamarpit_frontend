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

  getVarients(model : any):Observable<any>{
    const formData = new FormData();
    formData.append('model', model);

    return this.api.post<any>(environment.apiurl + 'get_varients.php', formData);
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

  getPrice(varient : any, model:any, usertype:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_varient_price.php?varient=' + varient + '&m=' + model + '&u_type=' + usertype);
  }
  getVehicleInfo(chassis:any, sparepart:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'getvehicleinfo.php?chassis=' + chassis + '&sparepart='+ sparepart);
  }

  postsparePart(name:any,part_no:any,warranty_info:any,file:any,remark:any,chassis:any,model:any,color:any,c_name:any,sale_date:any,warranty:any,event: any):Observable<any>{
    const formData = new FormData();
    formData.append('dealerid', name);
    formData.append('part_no', part_no);
    formData.append('warranty_info', warranty_info);
    formData.append('file', file);
    formData.append('remark', remark);
    formData.append('chassis', chassis);
    formData.append('model',model);
    formData.append('color',color);
    formData.append('c_name', c_name);
    formData.append('sale_date',sale_date);
    formData.append('warranty',warranty);
    formData.append('event', event)
 
    return this.api.post<any>(environment.apiurl + 'replace.php',  formData);
  }
}
