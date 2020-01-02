import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capphatphong } from '../../models/KTX-model/capphatphong';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapphatphongService {
  public Api:string=data['path1']+"Api/Capphatphong";
  public Api1:string= this.Api+"/GetCapphatphongbyid";
  public Api2:string= this.Api+"/GetCapphatphong";
  public Api3:string= this.Api+"/GetCapphatphongbyphongid";
  
  constructor(private http: HttpClient) {
   }
   GetCapphatphongktxbyphongid(phongid:string):Observable<Capphatphong[]>{
    const url = `${this.Api3}/${phongid}`;
    return this.http.get<Capphatphong[]>(url);
  }
  GetCapphatphongktxbyid(nhanviendangkyid:string):Observable<Capphatphong[]>{
    const url = `${this.Api1}/${nhanviendangkyid}`;
    return this.http.get<Capphatphong[]>(url);
  }
  GetCapphatphongktx():Observable<Capphatphong[]>{
    return this.http.get<Capphatphong[]>(this.Api2);
  }
  DeleteCapphatphongktx(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddCapphatphongktx(capphatphong:Capphatphong): Observable<HttpResponse<Capphatphong>> {
    return this.http.post<Capphatphong>(this.Api,capphatphong,{
      observe: 'response'
    });
  }
  UpdateCapphatphongktx(capphatphong:Capphatphong):Observable<Capphatphong>
  {
    return this.http.put<Capphatphong>(this.Api,capphatphong);
  }
 
}
