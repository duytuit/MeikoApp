import { Component, OnInit, Renderer2 } from '@angular/core';
import { formatDate } from '@angular/common';
import { thongkeloi } from 'src/app/Shareds/models/thongkeloima5';
import { quytrinh } from 'src/app/Shareds/models/quytrinh';
import { GroupService } from 'src/app/Shareds/services/group.service';
import { Thongkeloima5Service } from 'src/app/Shareds/services/thongkeloima5.service';
import { ThongtinkyService } from 'src/app/Shareds/services/thongtinky.service';
import { group } from 'src/app/Shareds/models/group';

@Component({
  selector: 'app-congdoan2',
  templateUrl: './congdoan2.component.html',
  styleUrls: ['./congdoan2.component.css']
})
export class Congdoan2Component implements OnInit {
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  getthongkeloi: thongkeloi[];
  Fgetthongkeloi: thongkeloi[];
  getGroup:group[];
  tam: number;
  quytrinh: quytrinh;
  getquytrinh: quytrinh[];
  Fgetquytrinh: quytrinh[];
  pageIndexds: number;
  pageSizeds: number;
  ghichunoidung:string;
  danhmuc_id: string = sessionStorage.getItem('Danhmucid');
  constructor(private renderer: Renderer2,private serviceGroup:GroupService, private servicethongkeloi: Thongkeloima5Service,private servicequytrinh: ThongtinkyService) {
    this.pageIndex = 0;
    this.pageSize = 19;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }
  getAllthongkeloi() {
    let strtrinhky_id: string = sessionStorage.getItem('Trinhkyid');
    this.servicequytrinh.GetQuytrinhByIdTrinhky(strtrinhky_id).subscribe(data => {
      if (data.length > 0) {
        if (data[0].Kieutrinhky - 1 >= 0)
        {
          this.servicequytrinh.GetQuytrinhByKieuTrinhKy(data[0].Kieutrinhky - 1).subscribe(data1=>{
            if(data1.length>0)
            {
              data1 = data1.filter(x => x.Daky == true);
              let qt=[];
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data1.length; j++) {
                  if (data[i].Groupid == data1[j].Groupid) {
                    qt.push(data[i]);
                  }
                }
              }
              if(qt.length>0)
              {
                this.getquytrinh = qt
                this.Fgetquytrinh = this.getquytrinh
                this.countds = this.Fgetquytrinh.length;
                this.quytrinh = this.getquytrinh[0];
                this.servicethongkeloi.GetGroupThongKeLoi(this.getquytrinh[0].Groupid).subscribe(data1 => {
                  if (data1.length > 0) {
                    this.getthongkeloi = data1;
                    this.Fgetthongkeloi=this.getthongkeloi;
                    this.count = this.Fgetthongkeloi.length;
                    this.tam = 0;
                  }
                  else {
                    this.getthongkeloi = null;
                    this.Fgetthongkeloi=this.getthongkeloi;
                    this.count = 0;
                  }
                });
              }
              let GroupRow:group;
              let dodai:string;
              let tyle:string;
               for(let i=0;i<this.Fgetquytrinh.length;i++)
               {
                 GroupRow = this.getGroup.find(x=>x.Groupid==this.Fgetquytrinh[i].Groupid)
                 if(GroupRow!=null){
                   dodai=(GroupRow.Hoanthanh/GroupRow.Tongnhomky*100).toString();
                   tyle=GroupRow.Hoanthanh+'/'+GroupRow.Tongnhomky;
                   this.Fgetquytrinh[i].Hoanthanh=dodai+'%';
                   if(GroupRow.Hoanthanh!=0)
                   {
                     this.Fgetquytrinh[i].Tongnhomky=tyle;
                   }else
                   {
                     this.Fgetquytrinh[i].Tongnhomky=null;
                   }
                  
                 } 
               }
            }
          })
        }
      } else {
        this.getquytrinh = null;
        this.Fgetquytrinh = this.getquytrinh
        this.countds = 0;
      }
    });
  }
  getAllgroup() {
    this.serviceGroup.GetGroup().subscribe(data => {
      this.getGroup = data;
    });
  }
  getColor(z): string {
    if (this.tam === z) {
      return 'bold';
    }
  }
  _listFilter: string;
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    this.Fgetquytrinh=this.listFilter ? this.PerformFilter(this.listFilter):this.getquytrinh;
    this.countds = this.Fgetquytrinh.length;
  }
  PerformFilter(filterBy: string): quytrinh[] {
    filterBy = filterBy.toLowerCase();
    return this.getquytrinh.filter((QuyTrinh: quytrinh) =>
    QuyTrinh.Groupid.toLowerCase().indexOf(filterBy) !== -1);
}
_listFilterMaHang: string;
get listFilterMahang():string{
  return this._listFilterMaHang;
}
set listFilterMahang(value:string){
  this._listFilterMaHang=value;
  this.Fgetthongkeloi=this.listFilterMahang ? this.ThongkeloiFilterMahang(this.listFilterMahang):this.getthongkeloi;
  this.count = this.Fgetthongkeloi.length;
}
_listFilterMaLot: string;
get listFilterMalot():string{
  return this._listFilterMaLot;
}
set listFilterMalot(value:string){
  this._listFilterMaLot=value;
  this.Fgetthongkeloi=this.listFilterMalot ? this.ThongkeloiFilterMaLot(this.listFilterMalot):this.getthongkeloi;
  this.count = this.Fgetthongkeloi.length;
}
ThongkeloiFilterMahang(filterByMahang: string): thongkeloi[] {
  if(filterByMahang)
  {
    return this.Fgetthongkeloi.filter((Thongkeloi: thongkeloi) =>
    Thongkeloi.Mahang.toLowerCase().indexOf(filterByMahang.toLowerCase()) !== -1);
  }
}
ThongkeloiFilterMaLot(filterByMalot:string): thongkeloi[] {
  if(filterByMalot)
  {
    return this.Fgetthongkeloi.filter((Thongkeloi: thongkeloi) =>
    Thongkeloi.Malot.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
  }
}
  ngOnInit() {
    this.getAllgroup();
    this.getAllthongkeloi();
  }
  onSelect(){
  this.getthongkeloi = null;
  this.Fgetthongkeloi=this.getthongkeloi;
  this.count = 0;
  }
  _listFilterSelect: string='';
  get listFilterSelect():string{
    return this._listFilterSelect;
  }
  set listFilterSelect(value:string){
    this._listFilterSelect=value;
    this.Fgetquytrinh=this.listFilterSelect ? this.PerformFilterSelect(this.listFilterSelect):this.getquytrinh;
    this.countds = this.Fgetquytrinh.length;
  }
  PerformFilterSelect(filterBySelect: string): quytrinh[] {
    filterBySelect = filterBySelect.toLocaleLowerCase();
       if(filterBySelect=='true')
       {
        return this.getquytrinh.filter((QuyTrinh: quytrinh) =>(
        QuyTrinh.Daky==true))
       }else
       {
        return this.getquytrinh.filter((QuyTrinh: quytrinh) =>
          QuyTrinh.Daky==false)
       }
}
  onGroup(group: string,z) {
    if (group != null) {
      this.servicethongkeloi.GetGroupThongKeLoi(group).subscribe(data => {
        this.getthongkeloi = data;
        this.Fgetthongkeloi=this.getthongkeloi;
        this.count = this.Fgetthongkeloi.length;
      });
    }
    const tbody = document.getElementById(z);
    this.tam = z;
    for (let i = 0; i < this.Fgetquytrinh.length; i++) {
      if (this.Fgetquytrinh[i].Groupid === group) {
        this.quytrinh = this.Fgetquytrinh[i];
        this.Fgetquytrinh[i].Selecttable=!this.Fgetquytrinh[i].Selecttable
        if(this.Fgetquytrinh[i].Selecttable==true)
        {
          this.renderer.setStyle(tbody,'background-color', '#4b9bf1bb');
        }
        else{
          this.renderer.removeStyle(tbody,'background-color');
        }
      }
    }
   
  }
  ClearSelected(){
    for (let i = 0; i < this.Fgetquytrinh.length; i++){
      this.Fgetquytrinh[i].Selecttable=false;
    }
  }
  lammoi() {
    this.getAllgroup();
    this.getAllthongkeloi();
  }
 
  updatequytrinh() {
    if (this.Fgetquytrinh.length>0) {
      for (let i = 0; i < this.Fgetquytrinh.length; i++) {
        if (this.Fgetquytrinh[i].Selecttable === true) {
          let arr = [
            {
              "Groupid":this.Fgetquytrinh[i].Groupid,
              "Namegroup":null,
              "Thutu":null,
              "Hoanthanh":this.Fgetquytrinh[i].Kieutrinhky,
              "Tongnhomky":null
            }
           ];
          let Tongnhom = this.getGroup.find(x=>x.Groupid==this.Fgetquytrinh[i].Groupid).Tongnhomky
          let dodai=(this.Fgetquytrinh[i].Kieutrinhky/Tongnhom*100).toString();
          let  tyle=this.Fgetquytrinh[i].Kieutrinhky+'/'+Tongnhom;
          this.Fgetquytrinh[i].Hoanthanh=dodai+'%';
          this.Fgetquytrinh[i].Tongnhomky=tyle;
          this.Fgetquytrinh[i].Daky = true;
          this.Fgetquytrinh[i].Ghichu=this.ghichunoidung;
          this.Fgetquytrinh[i].User_id = sessionStorage.getItem('Userid');
          this.Fgetquytrinh[i].Username = sessionStorage.getItem('Username');
          this.Fgetquytrinh[i].Ngayky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
          this.serviceGroup.UpdateGroup(arr[0]).subscribe();
          this.servicequytrinh.UpdateQuytrinh(this.Fgetquytrinh[i]).subscribe();
          this.servicethongkeloi.GetGroupThongKeLoi(this.Fgetquytrinh[i].Groupid).subscribe(data=>{
            for (let i = 0; i < data.length; i++) {
              data[i].Thoigianhoanthanh = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
              data[i].Trangthai =true;
              this.servicethongkeloi.UpdateThongKeLoi(data[i]).subscribe()
            }
          })
          this.Fgetquytrinh[i].Selecttable=false;
          let CountTam=i;
          if(CountTam<this.pageSizeds)
            {
              const tbody = document.getElementById(CountTam.toString());
              this.renderer.removeStyle(tbody,'background-color');
            }else
            {
              while(CountTam>0)
                      {
                            CountTam =CountTam-this.pageSizeds;
                          if(0<CountTam&&CountTam<this.pageSizeds)
                          {
                              const tbody = document.getElementById(CountTam.toString());
                              this.renderer.removeStyle(tbody,'background-color');
                          }
                      }
            }
        
        }
      }
      let element: HTMLElement = document.getElementById('modalNoidungHide') as HTMLElement;
      element.click();
    } else {
      console.log('Lỗi!')
    }
   
  }
  OpenUpdateQuytrinh(){
   this.getAllgroup();
    let element: HTMLElement = document.getElementById('modalNoidung') as HTMLElement;
    element.click();
  }
}
