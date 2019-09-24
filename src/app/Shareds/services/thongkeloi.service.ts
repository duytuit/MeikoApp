import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from 'src/assets/path.json';
import { thongke1 } from '../models/thongkeloi';
@Injectable({
  providedIn: 'root'
})
export class ThongkeloiService {
  constructor(private http: HttpClient) { }
  GetThongKeMa5(dateform:string,dateto:string,trangthai:string):Observable<thongke1[]>{
    const url = `${data['path1']+"Api/Thongkeloi/GetThongKeLoiMa5"}/${dateform}/${dateto}/${trangthai}`;
    return this.http.get<thongke1[]>(url);
  }
}
