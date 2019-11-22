import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from 'src/assets/path.json';
import { Giadinhnhanvien } from '../../models/KTX-model/Gdnhanvien';

@Injectable({
  providedIn: 'root'
})
export class ThanhphangiadinhnhanvienService {

  public Api:string=data['path1']+"Api/Thanhphangiadinhnhanvien";
  public Api1:string= this.Api+"/GetThanhphangiadinhnhanvien";

  constructor(private http: HttpClient) {
   }
  GetGDnhanvien(khainhankhauid:string):Observable<Giadinhnhanvien[]>{
    const url = `${this.Api1}/${khainhankhauid}`;
    return this.http.get<Giadinhnhanvien[]>(url);
  }
  DeleteGDnhanvien(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddGDnhanvien(GDnhanvien:any[]):Observable<any[]>{
    return this.http.post<any[]>(this.Api,GDnhanvien);
  }
  UpdateGDnhanvien(GDnhanvien:Giadinhnhanvien[]):Observable<Giadinhnhanvien[]>
  {
    return this.http.put<Giadinhnhanvien[]>(this.Api,GDnhanvien);
  }
}
