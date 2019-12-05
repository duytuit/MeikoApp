import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nhaptaisanktx } from '../../models/KTX-model/nhaptaisanktx';

@Injectable({
  providedIn: 'root'
})
export class NhaptaisanktxService {
  public Api:string=data['path1']+"Api/Nhaptaisan";
  public Api1:string= this.Api+"/GetNhaptaisan";
  
  constructor(private http: HttpClient) {
   }
  GetNhaptaisanktx(dodungid:string):Observable<Nhaptaisanktx[]>{
    const url = `${this.Api1}/${dodungid}`;
    return this.http.get<Nhaptaisanktx[]>(url);
  }
  DeleteNhaptaisanktx(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddNhaptaisanktx(nhaptaisanktx:Nhaptaisanktx):Observable<Nhaptaisanktx>{
    return this.http.post<Nhaptaisanktx>(this.Api,nhaptaisanktx);
  }
  UpdateNhaptaisanktx(nhaptaisanktx:Nhaptaisanktx):Observable<Nhaptaisanktx>
  {
    return this.http.put<Nhaptaisanktx>(this.Api,nhaptaisanktx);
  }
}
