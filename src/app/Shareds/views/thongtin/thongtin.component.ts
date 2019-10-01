import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { FileService } from '../../services/file.service';
import { HttpEventType } from '@angular/common/http';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css']
})
export class ThongtinComponent implements OnInit {
  // someDate: Date = new Date;
  // progress:number;
  // filename:string;
  // d:boolean=false;
  constructor(private servicefile: FileService,private toaster: ToasterService) { }
  ngOnInit() {
  }
  // change() {
  //   alert(this.someDate);
  // }
  // CallMainCloseLogOut(){
  //   this.servicefile.DownloadFile(this.filename).subscribe((result: any) => {  
  //     if (result.type != 'text/plain') {  
  //       var blob = new Blob([result]);    
  //       FileSaver.saveAs(blob, this.filename);  
  //     }}); 
  // }
  // Deletefile(){
  //   this.servicefile.DeleteFile(this.filename).subscribe();
  // }
  // onFileUpload(event){
  //   const file = event.target.files[0];
  //   this.filename=event.target.files[0].name;
  //   if(this.filename)
  //   {
  //     this.servicefile.UploadFile(file).subscribe(data=>{
  //       let z=data['messageBox']
  //      if(z=='true')
  //      {
  //          this.d=true;
  //      }else
  //      {
  //       this.d=false;
  //      }
  //       if (this.d==true)
  //       {
  //         this.toaster.show('success', 'Thành Công!', 'Tệp đã tải xong.');
          
  //       }else
  //       {
  //         this.toaster.show('error', 'Thất bại!', 'Không tải được tệp.');
  //       }
  //     });
  //   }
   
  // }
}
