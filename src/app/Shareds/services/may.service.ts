import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { may } from '../models/may';

@Injectable({
  providedIn: 'root'
})
export class MayService {

  public Api:string=data['path1']+"Api/MechineMa5";
  public Api1:string= this.Api+"/GetMay";
  
  constructor(private http: HttpClient) {
   }
  GetMay():Observable<may[]>{
    return this.http.get<may[]>(this.Api1);
  }
  DeleteMay(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddMay(may:any[]):Observable<any[]>{
    return this.http.post<any[]>(this.Api,may);
  }
  UpdateMay(may:may):Observable<may>
  {
    return this.http.put<may>(this.Api,may);
  }
}
