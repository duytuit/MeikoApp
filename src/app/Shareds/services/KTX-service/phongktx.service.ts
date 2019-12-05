import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phongktx } from '../../models/KTX-model/Phongktx';

@Injectable({
  providedIn: 'root'
})
export class PhongktxService {

  public Api:string=data['path1']+"Api/PhongKTX";
  public Api1:string= this.Api+"/GetPhongKTX";
  
  constructor(private http: HttpClient) {
   }
  GetPhongktx():Observable<Phongktx[]>{
    return this.http.get<Phongktx[]>(this.Api1);
  }
  DeletePhongktx(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddPhongktx(phongktx:Phongktx):Observable<Phongktx>{
    return this.http.post<Phongktx>(this.Api,phongktx);
  }
  UpdatePhongktx(phongktx:Phongktx):Observable<Phongktx>
  {
    return this.http.put<Phongktx>(this.Api,phongktx);
  }
}
