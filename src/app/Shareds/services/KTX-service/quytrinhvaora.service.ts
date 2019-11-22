import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NVdangkyKTX } from '../../models/KTX-model/NVdangky';
import data from 'src/assets/path.json';

@Injectable({
  providedIn: 'root'
})
export class QuytrinhvaoraService {

  public Api:string=data['path1']+"Api/Quytrinhvaora";

  constructor(private http: HttpClient) {
   }
  UpdateQuytrinh(Quytrinh:NVdangkyKTX):Observable<NVdangkyKTX>
  {
    return this.http.put<NVdangkyKTX>(this.Api,Quytrinh);
  }
}
