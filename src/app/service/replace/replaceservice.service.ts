import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplaceserviceService {

  constructor(private api:HttpClient) { }

  getAllitems(id:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'get_replace_item_by_dealer_id.php?d_id=' + id);
  }
  getcount_request(id:any):Observable<any>{
    return this.api.get<any>(environment.apiurl + 'replace_request_count.php?d_id=' + id);
  }
}
