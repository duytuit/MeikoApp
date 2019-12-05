import { Injectable } from '@angular/core';
import data from 'src/assets/path.json';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taisanktx } from '../../models/KTX-model/taisanktx';

@Injectable({
  providedIn: 'root'
})
export class TaisanktxService {
  public Api: string = data['path1'] + "Api/Taisan";
  public Api1: string = this.Api + "/GetTaisan";

  constructor(private http: HttpClient) {
  }
  GetTaisanktx(): Observable<Taisanktx[]> {
    return this.http.get<Taisanktx[]>(this.Api1);
  }
  DeleteTaisanktx(id: string): Observable<any> {
    const url = `${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddTaisanktx(taisanktx: Taisanktx[], soluong: number): Observable<Taisanktx[]> {
    const params = new HttpParams()
      .set('soluong', soluong.toString())
    const options = {
      params
    };
    return this.http.post<Taisanktx[]>(this.Api, taisanktx, options);
  }
  UpdateTaisanktx(taisanktx: Taisanktx): Observable<Taisanktx> {
    return this.http.put<Taisanktx>(this.Api, taisanktx);
  }
}
