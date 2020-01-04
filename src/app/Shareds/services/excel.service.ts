import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  public exportAsExcelFileNVdangky():void {
  let workbook = new ExcelJS.Workbook();
  let sheet = workbook.addWorksheet('Sheet1');
  sheet.getColumn(2).numFmt='@'
  sheet.getColumn(6).numFmt='@'
  sheet.getColumn(8).numFmt='@'
  sheet.getColumn(2).width=10
  sheet.getColumn(6).width=10
  sheet.getColumn(8).width=10
  let rowValues = [];
  rowValues[1] = 'STT';
  rowValues[2] = 'Manhanvien';
  rowValues[3] = 'Hotenkhaisinh';
  rowValues[4] = 'Gioitinh';
  rowValues[5] = 'Cmt';
  rowValues[6] = 'ngaycap_cmt';
  rowValues[7] = 'noicap_cmt';
  rowValues[8] = 'Ngaysinh';
  rowValues[9] = 'Noisinh';
  rowValues[10] = 'Phong';
  rowValues[11] = 'Ban';
  rowValues[12] = 'Congdoan';
  rowValues[13] = 'Capbac';
  rowValues[14] = 'Sodidong';
  rowValues[15] = 'Lydodangky';
  
  sheet.addRow(rowValues);
  workbook.xlsx.writeBuffer().then(data=>{
    this.saveAsExcelFile(data,'Form Đăng Ký Mẫu');
  })
   }
  public exportAsExcelFileNVdanglamviecdangky(): void {
  let workbook = new ExcelJS.Workbook();
  let sheet = workbook.addWorksheet('Sheet1');
  sheet.getColumn(2).numFmt='@'
  sheet.getColumn(2).width=10
  let rowValues = [];
  rowValues[1] = 'STT';
  rowValues[2] = 'Manhanvien';
  rowValues[3] = 'Hoten';
  
  sheet.addRow(rowValues);
  workbook.xlsx.writeBuffer().then(data=>{
    this.saveAsExcelFile(data,'Form Đăng Ký NV đang làm Mẫu');
  })
  }
}