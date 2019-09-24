import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { thongkeloi } from '../models/thongkeloima5';
import data from 'src/assets/path.json';
@Injectable({
  providedIn: 'root'
})
export class Thongkeloima5Service {

  public Api:string= data['path1']+"Api/ThongKeLoiMA5";

  constructor(private http: HttpClient) { }
  
  GetGroup():Observable<any[]>{
    const url = this.Api+"/GetGroup";
    return this.http.get<any[]>(url);
  }
  GetGroupThongKeLoi(groupid:string):Observable<thongkeloi[]>{
    const url = `${this.Api+"/GetGroupThongKeLoi"}/${groupid}`;
    return this.http.get<thongkeloi[]>(url);
  }
  DeleteThongKeLoi(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddThongKeLoi(thongkeloi:any[],danhmucid:string):Observable<any[]>{
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    // });
    const params = new HttpParams()
      .set('danhmucid', danhmucid)
    const options = {
      params
    };
    return this.http.post<any[]>(this.Api,thongkeloi,options);
  }
  UpdateThongKeLoi(thongkeloi: thongkeloi): Observable<thongkeloi> {
    return this.http.put<thongkeloi>(this.Api,thongkeloi);
  }
}
