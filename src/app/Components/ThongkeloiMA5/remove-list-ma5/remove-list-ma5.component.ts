import { Component, OnInit } from '@angular/core';
import { Thongkeloima5v1Service } from 'src/app/Shareds/services/thongkeloima5v1.service';
import { formatDate } from '@angular/common';
import { thongkeloi } from 'src/app/Shareds/models/thongkeloima5';

@Component({
  selector: 'app-remove-list-ma5',
  templateUrl: './remove-list-ma5.component.html',
  styleUrls: ['./remove-list-ma5.component.css']
})
export class RemoveListMa5Component implements OnInit {
  someYear: string = formatDate(Date.now(), 'yyyy', 'en-US');
  listYear:string[]=[];
  getngay: thongkeloi[];
  Fgetngay: thongkeloi[];
  pageIndexds: number;
  pageSizeds: number;
  countds: number;
  tam: number;
  value_year:string;
  constructor(private servicethongkeloi: Thongkeloima5v1Service) { 
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }

  ngOnInit() {
   this.lammoi();
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
   this.value_year=this.someYear;
    this.getAllthongkeloi(this.someYear.toString());
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
  getAllthongkeloi(year:string) {
    this.servicethongkeloi.GetGroupThongKeLoi(year).subscribe(data1 => {
      if (data1.length > 0) {
        this.getngay = data1.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.Ngay === thing.Ngay)) === i
        });
        this.Fgetngay=this.getngay;
        this.countds=this.Fgetngay.length;
      }
      else
      {
        this.getngay=null;
        this.Fgetngay=this.getngay;
        this.countds=0;
      }
    });
  }
  onSelect() {
    
  }
  onSelectYear(event){
    this.value_year=event;
    this.getAllthongkeloi(event);
  }
  openDeleteNgay(event){
    let ngay=formatDate(event, 'yyyy-MM-dd', 'en-US')
    this.servicethongkeloi.DeleteByNgay(this.value_year,ngay).subscribe(data=>{
      this.lammoi();
    });
  }
}
