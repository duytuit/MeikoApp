import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tieusunhanvien } from '../../models/KTX-model/Tsnhanvien';

@Injectable({
  providedIn: 'root'
})
export class TieusunhanvienService {

  public Api:string=data['path1']+"Api/Tieusunhanvien";
  public Api1:string= this.Api+"/GetTieusunhanvien";

  constructor(private http: HttpClient) {
   }
  GetTSnhanvien(khainhankhauid:string):Observable<Tieusunhanvien[]>{
    const url = `${this.Api1}/${khainhankhauid}`;
    return this.http.get<Tieusunhanvien[]>(url);
  }
  DeleteTSnhanvien(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddTSnhanvien(TSnhanvien:any[]):Observable<any[]>{
    return this.http.post<any[]>(this.Api,TSnhanvien);
  }
  UpdateTSnhanvien(TSnhanvien:Tieusunhanvien[]):Observable<Tieusunhanvien[]>
  {
    return this.http.put<Tieusunhanvien[]>(this.Api,TSnhanvien);
  }
}
