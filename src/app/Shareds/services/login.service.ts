import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import data from 'src/assets/path.json';
import { LogIn } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Api:string= data['path1']+"Api/LogIn";
  private Api1:string= data['path1']+"token";

  constructor(private http: HttpClient) { }

  LogIn(data:LogIn):Observable<LogIn>{
    return this.http.post<LogIn>(this.Api,data);
  }
  userAuthentication(login:LogIn) {
        const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers
    };
    var data = "username=" + login.Manhanvien + "&password=" + login.password + "&grant_type=password";
    return this.http.post(this.Api1, data, options);
  }
}
