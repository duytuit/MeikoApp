import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Baophetaisanktx } from '../../models/KTX-model/baophetaisanktx';

@Injectable({
  providedIn: 'root'
})
export class BaophetaisanktxService {
  public Api:string=data['path1']+"Api/Baophetaisan";
  public Api1:string= this.Api+"/GetBaophetaisan";
  
  constructor(private http: HttpClient) {
   }
  GetBaophetaisanktx(dodungid:string):Observable<Baophetaisanktx[]>{
    const url = `${this.Api1}/${dodungid}`;
    return this.http.get<Baophetaisanktx[]>(url);
  }
  GetBaophetaisanktx1(){
    return this.http.get<Baophetaisanktx[]>(this.Api).toPromise();
  }
  DeleteBaophetaisanktx(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddBaophetaisanktx(baophetaisanktx:Baophetaisanktx):Observable<Baophetaisanktx>{
    return this.http.post<Baophetaisanktx>(this.Api,baophetaisanktx);
  }
  UpdateBaophetaisanktx(baophetaisanktx:Baophetaisanktx):Observable<Baophetaisanktx>
  {
    return this.http.put<Baophetaisanktx>(this.Api,baophetaisanktx);
  }
}
