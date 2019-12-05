import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capphatphong } from '../../models/KTX-model/capphatphong';

@Injectable({
  providedIn: 'root'
})
export class CapphatphongService {
  public Api:string=data['path1']+"Api/Capphatphong";
  public Api1:string= this.Api+"/GetCapphatphong";
  
  constructor(private http: HttpClient) {
   }
  GetCapphatphongktx(nhanviendangkyid:string):Observable<Capphatphong[]>{
    const url = `${this.Api1}/${nhanviendangkyid}`;
    return this.http.get<Capphatphong[]>(url);
  }
  DeleteCapphatphongktx(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddCapphatphongktx(capphatphong:Capphatphong[]):Observable<Capphatphong[]>{
    return this.http.post<Capphatphong[]>(this.Api,capphatphong);
  }
  UpdateCapphatphongktx(capphatphong:Capphatphong):Observable<Capphatphong>
  {
    return this.http.put<Capphatphong>(this.Api,capphatphong);
  }
}
