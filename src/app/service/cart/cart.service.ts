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

  postCartData(dealerid:any, model:any, color: any, quantity_with_batt : any, quantity_withOut_batt: any,amountWithBatt: any, amountWithOutBatt:any,unit_price:any):Observable<any>{
    const formData = new FormData();
    formData.append('dealerid', dealerid);
    formData.append('model', model);
    formData.append('color', color);
    formData.append('quantity_with_batt', quantity_with_batt);
    formData.append('quantity_without_batt', quantity_withOut_batt);
    formData.append('amountWithBatt', amountWithBatt);
    formData.append('amountWithOutBatt', amountWithOutBatt);
    formData.append('unit_price', unit_price);

    
    return this.api.post<any>(environment.apiurl + 'add_cart.php',  formData);
  }
 
  getGrandTotal(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'cart_sum.php?d_id=' + id);
  }

  podata(dealerid:any , amount:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('dealerid',dealerid);
    formdata.append('amount',amount);

    return this.api.post<any>(environment.apiurl + 'add_po.php' , formdata);
  }
  
  updateCartStatus(id:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('id',id);
    return this.api.post<any>(environment.apiurl + 'status_update.php' , formdata);

  }

  getPrice(varient : any, model:any, usertype:any,battery:any):Observable<any>{
    const formData = new FormData();
    formData.append('varient', varient);
    formData.append('model', model);
    formData.append('usertype', usertype);
    formData.append('battery', battery);

 
    return this.api.post<any>(environment.apiurl + 'get_varient_price.php',  formData);
    // return this.api.get<any>(environment.apiurl + 'get_varient_price.php?varient=' + varient + '&m=' + model + '&u_type=' + usertype + '&battery=' + battery);
  }
  getVehicleInfo(chassis:any, sparepart:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'getvehicleinfo.php?chassis=' + chassis + '&sparepart='+ sparepart);
  }

  postsparePart(name:any,part_no:any,warranty_info:any,file:any,remark:any,docked:any,courier:any,chassis:any,model:any,color:any,c_name:any,sale_date:any,warranty:any,event: any,courier_partner:any):Observable<any>{
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
    formData.append('event', event);
    formData.append('docked',docked);
    formData.append('courier', courier);
    formData.append('courier_partner',courier_partner);
 
    return this.api.post<any>(environment.apiurl + 'replace.php',  formData);
  }

  getAllCartData(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'view_dealer_cart_po.php?d_id=' + id);
  }

  getAllpo(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_dealer_po.php?d_id=' + id);
  }

  get_po_by_id(id : any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_po_by_id.php?po_id=' + id);
  }

  checkmodelinv(model:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('model',model);
    return this.api.post<any>(environment.apiurl + 'company_model_inv_check.php' , formdata);

  }

  get_spareparts(user_type:any,zone:any,model:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('user_type',user_type);
    formdata.append('zone',zone);
    formdata.append('model',model);
    return this.api.post<any>(environment.apiurl + 'get_spareparts.php' , formdata);

  }
  post_sparepart_cart(data:any,price:any,d_id:any,s_id:any):Observable<any>{
    const formdata = new FormData();
    formdata.append('model',data.model);
    formdata.append('unit_price',price);
    formdata.append('quantity',data.quantity);
    formdata.append('item',data.item_name);
    formdata.append('t_price',data.t_price);
    formdata.append('d_id',d_id);
    formdata.append('s_id',s_id);

    return this.api.post<any>(environment.apiurl + 'add_sparepart_cart.php' , formdata);

  }

}
