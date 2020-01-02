import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TTnv } from '../models/TTnhanvien';
import data from 'src/assets/path.json';
import { TTpb } from '../models/TTphongban';
@Injectable({
  providedIn: 'root'
})
export class ThongtinNVService {
  public Api:string=data['path1']+"Api/Nhanviendangky";
  public ApiTTnv:string= this.Api+"/GetListEmp";
  public ApiTTpb:string=this.Api+"/GetListDept";
  constructor(private http: HttpClient) { }
  GetTTnhanvien():Observable<TTnv[]>{
    
    return this.http.get<TTnv[]>(this.ApiTTnv);
  }
  GetTTphongban():Observable<TTpb[]>{
    return this.http.get<TTpb[]>(this.ApiTTpb);
  }
}
