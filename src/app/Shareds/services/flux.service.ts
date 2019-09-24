import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { flux } from '../models/flux';
import data from 'src/assets/path.json';
@Injectable({
  providedIn: 'root'
})
export class FluxService {

  selectedFlux:flux;
  
  public Api:string= data['path1']+"Api/Data1";

  constructor(private http: HttpClient) { }
  GetGroup():Observable<any[]>{
    const url = this.Api+"/GetGroup";
    return this.http.get<any[]>(url);
  }
  GetGroupFlux(groupid:string):Observable<flux[]>{
    const url = `${this.Api+"/GetGroupFlux"}/${groupid}`;
    return this.http.get<flux[]>(url);
  }
  DeleteFlux(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddFlux(flux:any[],danhmucid:string):Observable<any[]>{
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    // });
    const params = new HttpParams()
      .set('danhmucid', danhmucid)
    const options = {
      params
    };
    return this.http.post<any[]>(this.Api,flux,options);
  }
  UpdateFlux(flux: flux): Observable<flux> {
    return this.http.put<flux>(this.Api,flux);
  }
}
