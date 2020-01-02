import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capphatdodung } from '../../models/KTX-model/capphatdodung';

@Injectable({
  providedIn: 'root'
})
export class CapphatdodungService {
  public Api:string=data['path1']+"Api/Capphatdodung";
  public Api1:string= this.Api+"/GetCapphatdodung";
  public Api2:string= this.Api+"/GetCapphatdodungbyid";
  
  constructor(private http: HttpClient) {
   }
  GetCapphatdodungktxbyid(nhanviendangkyid:string):Observable<Capphatdodung[]>{
    const url = `${this.Api2}/${nhanviendangkyid}`;
    return this.http.get<Capphatdodung[]>(url);
  }
  GetCapphatdodungktx(){
    return this.http.get<Capphatdodung[]>(this.Api1).toPromise();
  }
  DeleteCapphatdodungktx(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddCapphatdodungktx(capphatdodungktx:Capphatdodung):Observable<Capphatdodung>{
    return this.http.post<Capphatdodung>(this.Api,capphatdodungktx);
  }
  UpdateCapphatdodungktx(capphatdodungktx:Capphatdodung):Observable<Capphatdodung>
  {
    return this.http.put<Capphatdodung>(this.Api,capphatdodungktx);
  }
}
