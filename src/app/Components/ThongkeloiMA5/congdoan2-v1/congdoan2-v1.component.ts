import { Component, OnInit } from '@angular/core';
import { thongkeloi } from 'src/app/Shareds/models/thongkeloima5';
import { formatDate } from '@angular/common';
import { Thongkeloima5v1Service } from 'src/app/Shareds/services/thongkeloima5v1.service';

@Component({
  selector: 'app-congdoan2-v1',
  templateUrl: './congdoan2-v1.component.html',
  styleUrls: ['./congdoan2-v1.component.css']
})
export class Congdoan2V1Component implements OnInit {
  someYear: string = formatDate(Date.now(), 'yyyy', 'en-US');
  listYear:string[]=[];
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  getthongkeloi: thongkeloi[];
  Fgetthongkeloi: thongkeloi[];
  getngay: thongkeloi[];
  Fgetngay: thongkeloi[];
  getthongkeloiRow: thongkeloi;
  tam: number;
  pageIndexds: number;
  pageSizeds: number;
  daky:boolean;
  user_fullname:string=sessionStorage.getItem('Fullname');
  danhmuc_id: string = sessionStorage.getItem('Danhmucid');
  user_id: string = sessionStorage.getItem('Userid');
  user_name: string = sessionStorage.getItem('Username');
  constructor(private servicethongkeloi: Thongkeloima5v1Service) {
    this.pageIndex = 0;
    this.pageSize = 15;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }
  getAllthongkeloi(year:string) {
    this.servicethongkeloi.GetGroupThongKeLoi(year).subscribe(data1 => {
      if (data1.length > 0) {
        this.getngay = data1.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.Ngay === thing.Ngay)) === i
        });
        this.Fgetngay=this.getngay;
        this.countds=this.Fgetngay.length;
        this.getthongkeloi=data1;
        this.Fgetthongkeloi=this.getthongkeloi.filter(x=>x.Ngay==this.Fgetngay[0].Ngay);
        this.tam = 0;
        this.daky=this.Fgetngay[0].Trangthai;
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
  ThongkeloiFilterMahang(filterByMahang: string): thongkeloi[] {
    if (filterByMahang) {
      return this.Fgetthongkeloi.filter((Thongkeloi: thongkeloi) =>
        Thongkeloi.Mahang.toLowerCase().indexOf(filterByMahang.toLowerCase()) !== -1);
    }
  }
  ThongkeloiFilterMaLot(filterByMalot: string): thongkeloi[] {
    if (filterByMalot) {
      return this.Fgetthongkeloi.filter((Thongkeloi: thongkeloi) =>
        Thongkeloi.Malot.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
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
  PerformFilter(filterBy: string): thongkeloi[] {
    filterBy = filterBy.toLowerCase();
    return this.getngay.filter((Thongkeloi: thongkeloi) =>
    Thongkeloi.Ngay.toLowerCase().indexOf(filterBy) !== -1);
}
_listFilterSelect: string='';
get listFilterSelect():string{
  return this._listFilterSelect;
}
set listFilterSelect(value:string){
  this._listFilterSelect=value;
  this.Fgetngay=this.listFilterSelect ? this.PerformFilterSelect(this.listFilterSelect):this.getngay;
  this.countds = this.Fgetngay.length;
}
PerformFilterSelect(filterBySelect: string): thongkeloi[] {
  filterBySelect = filterBySelect.toLocaleLowerCase();
     if(filterBySelect=='true')
     {
      return this.getngay.filter((Thongkeloi: thongkeloi) =>(
        Thongkeloi.Trangthai==true))
     }else
     {
      return this.getngay.filter((Thongkeloi: thongkeloi) =>
      Thongkeloi.Trangthai==false)
     }
}
  ngOnInit() {
    let valueYear=parseInt(this.someYear);
    this.listYear.push(valueYear.toString())
   for(let i=0;i<4;i++)
   {
       valueYear-=1;
       this.listYear.push(valueYear.toString())
   }
    this.getAllthongkeloi(this.someYear);
  }
  
  onSelect() {
    this.Fgetthongkeloi = null;
    this.count = 0;
  }
  onSelectYear(event)
  {
    this.getAllthongkeloi(event);
  }
  onGroup(item: thongkeloi, z) {

    if (item.Ngay != null) {
        this.getthongkeloiRow=item;
        this.daky=item.Trangthai;
        this.Fgetthongkeloi = this.getthongkeloi.filter(x=>x.Ngay==item.Ngay);
        this.count = this.Fgetthongkeloi.length;
    }
    this.tam = z;
  }
  lammoi() {
    this.listYear=[];
    let valueYear=parseInt(this.someYear);
    this.listYear.push(valueYear.toString())
   for(let i=0;i<4;i++)
   {
       valueYear-=1;
       this.listYear.push(valueYear.toString())
   }
    this.getAllthongkeloi(this.someYear);
  }
  OpenUpdateQuytrinh(item: thongkeloi) {
    if (item.Trangthai== false) {
      for(let i=0;i<this.Fgetthongkeloi.length;i++)
      {
            if(this.Fgetthongkeloi[i].Ngay==item.Ngay)
            {
              if(this.Fgetthongkeloi[i].Trangthai==false)
              {
                this.Fgetthongkeloi[i].Thoigianhoanthanh=formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
                this.Fgetthongkeloi[i].Trangthai=true;
                this.Fgetthongkeloi[i].Idnguoixacnhan=this.user_id;
                this.Fgetthongkeloi[i].Nguoixacnhan=this.user_name;
                this.daky = true;
                this.servicethongkeloi.UpdateThongKeLoi(this.Fgetthongkeloi[i]).subscribe();
              }
            }
        }
    } 
  }
}
