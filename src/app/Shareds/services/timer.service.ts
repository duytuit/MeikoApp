import { Injectable } from '@angular/core';
import { timer } from '../models/timer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import data from 'src/assets/path.json';
@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public Api:string=data['path1']+"Api/Timer";
  public Api1:string= this.Api+"/GetTimer";
  
  constructor(private http: HttpClient) {
   }
   GetTimer():Observable<timer>{
    return this.http.get<timer>(this.Api1);
  }
  AddTimer():Observable<any>{
    return this.http.get<any>(this.Api);
  }
  UpdateTimer(timer:timer):Observable<timer>
  {
    return this.http.put<timer>(this.Api,timer);
  }
}
