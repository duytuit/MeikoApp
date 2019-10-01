import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { thongkeloi } from '../models/thongkeloima5';
import data from 'src/assets/path.json';
import { thongke1 } from '../models/thongkeloi';
@Injectable({
  providedIn: 'root'
})
export class Thongkeloima5v1Service {

  public Api:string= data['path1']+"Api/ThongkeloiMA5v1";

  constructor(private http: HttpClient) { }
  
  GetThongKeMa5(dateform:string,dateto:string,trangthai:string):Observable<thongke1[]>{
    const url = `${this.Api+"/GetThongKeLoiMa5"}/${dateform}/${dateto}/${trangthai}`;
    return this.http.get<thongke1[]>(url);
  }
  GetGroupThongKeLoiByIdnguoikiemtra(idnguoikiemtra:string):Observable<thongkeloi[]>{
    const url = `${this.Api+"/GetGroupThongKeLoiByIdnguoikiemtra"}/${idnguoikiemtra}`;
    return this.http.get<thongkeloi[]>(url);
  }
  GetGroupThongKeLoi(searchYear:string):Observable<thongkeloi[]>{
    const url = `${this.Api+"/GetGroupThongKeLoiByYear"}/${searchYear}`;
    return this.http.get<thongkeloi[]>(url);
  }
  DeleteThongKeLoi(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  DeleteByNgay(year:string,date:string):Observable<any>{
    const url=`${this.Api+"/DeleteByNgay"}/${year}/${date}`;
    return this.http.get(url);
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
