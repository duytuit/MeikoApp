import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trinhky } from '../models/trinhky';
import data from 'src/assets/path.json';
@Injectable({
  providedIn: 'root'
})
export class TrinhkyService {
  public Api:string=data['path1']+"Api/TrinhKy";

  public Api1:string=this.Api+"/GetTrinhKy";

  constructor(private http: HttpClient) { }
  GetTrinhKy():Observable<trinhky[]>{
    return this.http.get<trinhky[]>(this.Api1);
  }
  DeleteTrinhKy(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddTrinhKy(trinhky:trinhky):Observable<trinhky>{
    return this.http.post<trinhky>(this.Api,trinhky);
  }
  UpdateTrinhKy(trinhky:trinhky):Observable<trinhky>
  {
    return this.http.put<trinhky>(this.Api,trinhky);
  }
}
