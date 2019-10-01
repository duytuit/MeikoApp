import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import data from 'src/assets/path.json';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  public Api:string=data['path1']+"Api/File";
  constructor(private http: HttpClient) { }

  UploadFile(file:File):Observable<string>{
    let formData: FormData = new FormData();  
    formData.append('uploadFile', file, file.name);  
    const url = `${this.Api+"/UploadFile"}`;
    return this.http.post<string>(url,formData);
  }
  DownloadFile(fileName: string) {  
    const url = `${this.Api+"/DownloadFile"}`;
      const params = new HttpParams()
      .set('filename', fileName)
    return this.http.get(url,{ responseType: "blob",params });
      
  } 
  DeleteFile(fileName: string):Observable<string> {  
    const url = `${this.Api+"/DeleteFile"}`;
      const params = new HttpParams()
      .set('fileName', fileName)
    const options = {
      params
    };
    return this.http.get<string>(url,options);
  } 
}
