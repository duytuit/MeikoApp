import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  public exportAsExcelFileNVdangky(): void {
    
    var wb = XLSX.utils.book_new()
    var ws_name = "Sheet1";
    /* make worksheet */
    var ws_data = [
      [ "STT", "Manhanvien", "Hotenkhaisinh", "Gioitinh", "Cmt","ngaycap_cmt","noicap_cmt","Ngaysinh","Noisinh","Phong","Ban","Congdoan","Capbac", "Sodidong","Lydodangky" ],
    ];
   
  // XLSX.utils.format_cell
     var ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    /* Add the worksheet to the workbook */
   XLSX.utils.book_append_sheet(wb, ws, ws_name);
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
   
   this.saveAsExcelFile(excelBuffer,'Form Đăng Ký Mẫu');
  }
  public exportAsExcelFileNVdanglamviecdangky(): void {
    
    var wb = XLSX.utils.book_new()
    var ws_name = "Sheet1";
    /* make worksheet */
    var ws_data = [
      [ "STT", "Manhanvien", "Hoten"],
    ];
   
  // XLSX.utils.format_cell
     var ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    /* Add the worksheet to the workbook */
   XLSX.utils.book_append_sheet(wb, ws, ws_name);
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
   
   this.saveAsExcelFile(excelBuffer,'Form Đăng Ký Mẫu');
  }
}
