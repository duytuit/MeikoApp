import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import data from 'src/assets/path.json';
import { Observable } from 'rxjs';
import { NVdangkyKTX } from '../../models/KTX-model/NVdangky';
import { delay } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NhanviendangkyService {
  public Api:string=data['path1']+"Api/Nhanviendangky";
  public Api1:string= this.Api+"/GetNhanviendangky";
  public Api2:string=data['path1']+"Api/Khainhankhau";
  public Api3:string= this.Api+"/GetNhanviendangkybytrangthai";
  public Api4:string= this.Api+"/PostList";
  public Api_GetCodeEmp:string= data['path3-GetCodeEmp'];
  public Api_GetCodeDept:string= data['path4-GetCodeDept'];

  constructor(private http: HttpClient) {
   }
   
  GetTTNV(MaID:string){
    return this.http.get<any[]>(this.Api_GetCodeEmp+MaID).toPromise();
  }
  GetTTNV_dept(code:string){
    return this.http.get<any[]>(this.Api_GetCodeDept+code).toPromise();
  }
  GetNhanviendangkybytrangthai():Observable<NVdangkyKTX[]>{
    return this.http.get<NVdangkyKTX[]>(this.Api3);
  }
  GetNhanviendangky():Observable<NVdangkyKTX[]>{
    return this.http.get<NVdangkyKTX[]>(this.Api1);
  }
  DeleteNhanviendangky(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  InputFileNVdangky(file:File):Observable<string>{
    let formData: FormData = new FormData();  
    formData.append('uploadFile', file, file.name);  
    const url = `${this.Api+"/UploadFile"}`;
    return this.http.post<string>(url,formData);
  }
  AddNhanviendangkylist(NVdangky:any[]):Observable<any[]>{
    return this.http.post<any[]>(this.Api4,NVdangky);
  }
  AddNhanviendangky(NVdangky:any[]):Observable<any[]>{
    return this.http.post<any[]>(this.Api,NVdangky);
  }
  Updatekhainhankhau(NVkhainhankhau:NVdangkyKTX):Observable<NVdangkyKTX>{
    return this.http.put<NVdangkyKTX>(this.Api2,NVkhainhankhau);
  }
  UpdateNhanviendangky(NVdangky:NVdangkyKTX):Observable<NVdangkyKTX>
  {
    return this.http.put<NVdangkyKTX>(this.Api,NVdangky);
  }
}
