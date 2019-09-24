import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import data from 'src/assets/path.json';
import { LogIn } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public Api:string= data['path1']+"Api/LogIn";

  constructor(private http: HttpClient) { }

  LogIn(data:LogIn):Observable<LogIn>{
    return this.http.post<LogIn>(this.Api,data);
  }
}
