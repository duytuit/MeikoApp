import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { quytrinh } from '../models/quytrinh';
import { Observable } from 'rxjs';
import data from 'src/assets/path.json';
@Injectable({
  providedIn: 'root'
})
export class ThongtinkyService {
  public Api:string=data['path1']+"Api/Data4";

  constructor(private http: HttpClient) { }

  GetQuytrinhByIdTrinhky(trinhkyid:string):Observable<quytrinh[]>{
    const url = `${this.Api+"/GetQuytrinh"}/${trinhkyid}`;
    return this.http.get<quytrinh[]>(url);
  }
  UpdateQuytrinh(quytrinh: quytrinh): Observable<quytrinh> {
    return this.http.put<quytrinh>(this.Api,quytrinh);
  }
  GetQuytrinhByKieuTrinhKy(kieutrinhky:number):Observable<quytrinh[]>{
    const url = `${this.Api+"/GetQuyTrinhByKieuTrinhKy"}/${kieutrinhky}`;
    return this.http.get<quytrinh[]>(url);
  }
  GetQuytrinhByGroupFlux(groupflux:string):Observable<quytrinh[]>{
    const url = `${this.Api+"/GetQuytrinhGroupFlux"}/${groupflux}`;
    return this.http.get<quytrinh[]>(url);
  }
}
