import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { thongke1 } from 'src/app/Shareds/models/thongkeloi';
import { Thongkeloima5v1Service } from 'src/app/Shareds/services/thongkeloima5v1.service';
import { ExcelService } from 'src/app/Shareds/services/excel.service';

@Component({
  selector: 'app-thongke-ma5-v1',
  templateUrl: './thongke-ma5-v1.component.html',
  styleUrls: ['./thongke-ma5-v1.component.css']
})
export class ThongkeMa5V1Component implements OnInit {
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  getthongkeloi: thongke1[];
  Fgetthongkeloi: thongke1[];
  getngay: thongke1[];
  Fgetngay: thongke1[];
  tam: number;
  pageIndexds: number;
  pageSizeds: number;
  daky:boolean;
  showDialog: boolean = true;
  @ViewChild('fromdate') fromdate: ElementRef;
  @ViewChild('todate') todate: ElementRef;
  trangthai: string = 'null';
  viewthongke: thongke1;
  user_fullname:string=sessionStorage.getItem('Fullname');
  constructor(private servicethongkeloi: Thongkeloima5v1Service, private excelService: ExcelService) {
    this.pageIndex = 0;
    this.pageSize = 19;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }

  getColor(z): string {
    if (this.tam === z) {
      return 'bold';
    }
  }
 
  _listFilterMaHang: string;
  get listFilterMahang(): string {
    return this._listFilterMaHang;
  }
  set listFilterMahang(value: string) {
    this._listFilterMaHang = value;
    this.Fgetthongkeloi = this.listFilterMahang ? this.ThongkeloiFilterMahang(this.listFilterMahang) : this.getthongkeloi;
    this.count = this.Fgetthongkeloi.length;
  }
  _listFilterMaLot: string;
  get listFilterMalot(): string {
    return this._listFilterMaLot;
  }
  set listFilterMalot(value: string) {
    this._listFilterMaLot = value;
    this.Fgetthongkeloi = this.listFilterMalot ? this.ThongkeloiFilterMaLot(this.listFilterMalot) : this.getthongkeloi;
    this.count = this.Fgetthongkeloi.length;
  }
  ThongkeloiFilterMahang(filterByMahang: string): thongke1[] {
    if (filterByMahang) {
      return this.Fgetthongkeloi.filter((MA5: thongke1) =>
      MA5.Mahang.toLowerCase().indexOf(filterByMahang.toLowerCase()) !== -1);
    }
  }
  ThongkeloiFilterMaLot(filterByMalot: string): thongke1[] {
    if (filterByMalot) {
      return this.Fgetthongkeloi.filter((MA5: thongke1) =>
      MA5.Malot.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
    }
  }
  _listFilter: string;
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    this.Fgetngay=this.listFilter ? this.PerformFilter(this.listFilter):this.getngay;
    this.countds = this.Fgetngay.length;
  }
  PerformFilter(filterBy: string): thongke1[] {
    filterBy = filterBy.toLowerCase();
    return this.getngay.filter((Thongkeloi: thongke1) =>
    Thongkeloi.Ngay.toLowerCase().indexOf(filterBy) !== -1);
}
_listFilterNguoiKiemTra: string;
  get listFilterNguoiKiemTra():string{
    return this._listFilterNguoiKiemTra;
  }
  set listFilterNguoiKiemTra(value:string){
    this._listFilterNguoiKiemTra=value;
    this.Fgetthongkeloi=this.listFilterNguoiKiemTra ? this.PerformFilterlistFilterNguoiKiemTra(this.listFilterNguoiKiemTra):this.getthongkeloi;
    this.count = this.Fgetthongkeloi.length;
  }
  PerformFilterlistFilterNguoiKiemTra(filterBy: string): thongke1[] {
    filterBy = filterBy.toLowerCase();
    return this.getthongkeloi.filter((Thongkeloi: thongke1) =>
    Thongkeloi.Nguoikiemtra.toLowerCase().indexOf(filterBy) !== -1);
}
  ngOnInit() {
    this.viewthongke=null;
  }
  onSelect() {
    this.getthongkeloi = null;
    this.Fgetthongkeloi = this.getthongkeloi;
    this.count = 0;
  }
  lammoi() {
    this.fromdate.nativeElement.value = '';
    this.todate.nativeElement.value = '';
    this.Fgetthongkeloi=null;
    this.Fgetngay=null;
    this.getthongkeloi=null;
    this.getngay=null;
    this.count=null;
    this.countds=null;
  }
  refresh(): void {
    this.fromdate.nativeElement.value = '';
    this.todate.nativeElement.value = '';
    this.Fgetthongkeloi = null;
    this.Fgetngay = null;
    this.getthongkeloi = null;
    this.getngay = null;
    this.count = null;
    this.countds = null;
  }
  exportAsXLSX() {
    if (this.Fgetthongkeloi.length > 1) {
      this.excelService.exportAsExcelFile(this.Fgetthongkeloi, 'Danh sách thống kê lỗi');
    }
  }
  SelectGroupID(item: thongke1, i) {
    if (item.Ngay != null) {
      this.daky=item.Trangthai1;
      this.Fgetthongkeloi = this.getthongkeloi.filter(x=>x.Ngay==item.Ngay);
      this.count = this.Fgetthongkeloi.length;
    }
        this.tam = i;
  }
  ThongKeLoiFilterGroupID(GroupID: string): thongke1[] {
    if (GroupID) {
      return this.Fgetthongkeloi.filter((MA5: thongke1) =>
      MA5.Groupid.toLowerCase().indexOf(GroupID.toLowerCase()) !== -1);
    }
  }
  onMouseEnter(item: thongke1) {
    this.showDialog = false;
    this.viewthongke = item
  }
  onMouseEnterClose() {
    this.showDialog = true;
  }
  @HostListener('document:click', ['$event'])
  onClickEvent() {
    this.showDialog = true;
  }
  GetThongKeMa5Bydate(fromdate: string, todate: string): void {
    if (fromdate && todate) {
      this.servicethongkeloi.GetThongKeMa5(fromdate, todate, this.trangthai).subscribe(data => {
        if (data.length > 0) {
          this.getngay = data.filter((thing, i, arr) => {
            return arr.indexOf(arr.find(t => t.Ngay === thing.Ngay)) === i
          });
          this.Fgetngay=this.getngay;
          this.countds=this.Fgetngay.length;
          this.getthongkeloi=data;
          this.Fgetthongkeloi=this.getthongkeloi.filter(x=>x.Ngay==this.Fgetngay[0].Ngay);
          this.tam = 0;
          this.count=this.Fgetthongkeloi.length;
        }
        else
        {
          this.getngay=null;
          this.Fgetngay=this.getngay;
          this.countds=0;
          this.getthongkeloi=null;
          this.Fgetthongkeloi=this.getthongkeloi;
          this.count=0;
        }
      });
    }

  }
  onSeach(trangthai: string) {
    this.trangthai = trangthai;
  }
}
