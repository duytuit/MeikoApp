import { Component, OnInit, Input } from '@angular/core';
import { FluxService } from 'src/app/Shareds/services/flux.service';
import { formatDate } from '@angular/common';
import { flux } from 'src/app/Shareds/models/flux';
import * as XLSX from 'xlsx';
import { quytrinh } from 'src/app/Shareds/models/quytrinh';
import { ThongtinkyService } from 'src/app/Shareds/services/thongtinky.service';
import { GroupService } from 'src/app/Shareds/services/group.service';
import { group } from 'src/app/Shareds/models/group';
import { FileService } from 'src/app/Shareds/services/file.service';
import { HttpEventType } from '@angular/common/http';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-ql',
  templateUrl: './ql.component.html',
  styleUrls: ['./ql.component.css']
})
export class QlComponent implements OnInit {

  @Input() zIndex: number = 1000000000;
  GetAllGroup: flux[];
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  getflux: flux[];
  Fgetflux:flux[];
  dateflux: string;

  doday: string;
  xacnhanql: string;
  dodaytruoc: string;
  dodaysau: string;
  test: flux;
  tam: number;
  tentep:string;
  daky: boolean;
  quytrinh: quytrinh;
  getquytrinh: quytrinh[];
  Fgetquytrinh: quytrinh[];

  opendelete: boolean = false;
  chucnang: boolean = true;
  getGroup:group[];
  pageIndexds: number;
  pageSizeds: number;
  ghichunoidung:string;
  progress:number;
  constructor(private serviceflux: FluxService,private serviceGroup:GroupService,  private servicequytrinh: ThongtinkyService,private servicefile: FileService) {
    this.pageIndex = 0;
    this.pageSize = 19;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }
  getAllflux() {
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
                this.serviceflux.GetGroupFlux(this.getquytrinh[0].Groupid).subscribe(data2=> {
                  if (data2.length > 0) {
                    this.getflux = data2;
                    this.Fgetflux =  this.getflux;
                    this.count = this.Fgetflux.length;
                    this.tam = 0;
                    this.daky = this.getquytrinh[0].Daky;
                    if (this.daky == true) {
                      this.chucnang = false
                    } else
                      this.chucnang = true
                  }
                  else {
                    this.getflux = null;
                    this.Fgetflux =  this.getflux;
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
  ngOnInit() {
    this.getAllgroup();
    this.getAllflux();
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
    filterBy = filterBy.toLocaleLowerCase();
    return this.getquytrinh.filter((QuyTrinh: quytrinh) =>
    QuyTrinh.Groupid.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
_listFilterMaHang: string;
get listFilterMahang():string{
  return this._listFilterMaHang;
}
set listFilterMahang(value:string){
  this._listFilterMaHang=value;
  this.Fgetflux=this.listFilterMahang ? this.FluxFilterMahang(this.listFilterMahang):this.getflux;
  this.count = this.Fgetflux.length;
}
_listFilterMaLot: string;
get listFilterMalot():string{
  return this._listFilterMaLot;
}
set listFilterMalot(value:string){
  this._listFilterMaLot=value;
  this.Fgetflux=this.listFilterMalot ? this.FluxFilterMaLot(this.listFilterMalot):this.getflux;
  this.count = this.Fgetflux.length;
}
FluxFilterMahang(filterByMahang: string): flux[] {
  if(filterByMahang)
  {
    return this.Fgetflux.filter((Flux: flux) =>
    Flux.Mahang.toLowerCase().indexOf(filterByMahang.toLowerCase()) !== -1);
  }
}
FluxFilterMaLot(filterByMalot:string): flux[] {
  if(filterByMalot)
  {
    return this.Fgetflux.filter((Flux: flux) =>
    Flux.Malot.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
  }
}
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let list: Array<number> = [];
      for (let i = 4; i < 28; i++) {
        list.push(jsonData['Sheet1'][i]['__EMPTY']);
      }
      let minlist = Math.min.apply(null, list)
      this.dodaysau = minlist;
      if (parseInt(this.doday) > minlist) {
        this.xacnhanql = 'NG';
      } else {
        this.xacnhanql = 'OK';
      }
    }
    reader.readAsBinaryString(file);
    
  }
  onFileUpload(ev){
    const file = ev.target.files[0];
    this.tentep=ev.target.files[0].name;
    this.servicefile.UploadFile(file).subscribe((event:any)=>{
          // if (event.type === HttpEventType.UploadProgress)
        
          // this.progress = Math.round(100 * event.loaded / event.total);
        });
       
  }
  DownloadFile(tentep){
    this.servicefile.DownloadFile(tentep).subscribe((result: any) => {  
          if (result.type != 'text/plain') {  
            var blob = new Blob([result]);    
            FileSaver.saveAs(blob, tentep);  
          }}); 
  }
  onGroup(group: string,z) {
    if (group != null) {
      this.serviceflux.GetGroupFlux(group).subscribe(data => {
        this.getflux = data;
        this.Fgetflux = this.getflux;
        this.count = this.Fgetflux.length;
      });
    }
    this.tam = z;
    for (let i = 0; i < this.Fgetquytrinh.length; i++) {
      if (this.Fgetquytrinh[i].Groupid === group) {
        this.daky = this.Fgetquytrinh[i].Daky;
        this.quytrinh = this.Fgetquytrinh[i];
        if (this.daky == true) {
          this.chucnang = false
        } else
          this.chucnang = true
      }
    }
  }
  onSelect(option:string){
    this.getflux = null;
    this.Fgetflux=this.getflux;
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
  lammoi() {
    this.getAllgroup();
    this.getAllflux();
  }
  modalopen(flux: flux, z: number) {
    this.dodaytruoc = flux.Dodaytruoc;
    this.dodaysau = flux.Dodaysau;
    this.doday = flux.Doday;
    this.xacnhanql = flux.Xacnhanql;
    this.tentep=flux.Tentep;
    for (let i = 0; i < this.getflux.length; i++) {
      if (this.getflux[i].edittable == true) {
        this.getflux[i].edittable = false
      }
    }
    flux.edittable = !flux.edittable;
  }
  modalclose(flux: flux, i: number) {
    flux.edittable = !flux.edittable;
    if (flux.edittable == false) {
      flux.Dodaytruoc = this.dodaytruoc;
      flux.Dodaysau = this.dodaysau;
      flux.Tentep=this.tentep;
      if (parseInt(flux.Dodaysau) >= 0) {
        if (parseInt(this.doday) > parseInt(this.dodaysau)) {
          this.xacnhanql = 'NG';
          flux.Xacnhanql = this.xacnhanql;
        } else {
          this.xacnhanql = 'OK';
          flux.Xacnhanql = this.xacnhanql;
        }
      }
    }

    this.serviceflux.UpdateFlux(flux).subscribe()
  }
  openDelete(flux: flux) {
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
    this.dodaytruoc = flux.Dodaytruoc;
    this.dodaysau = flux.Dodaysau;
    this.xacnhanql = flux.Xacnhanql;
    this.test = flux;
    this.opendelete = true;
  }
  onDeleteFlux(flux: flux) {
    flux.Dodaytruoc = '';
    flux.Dodaysau = '';
    flux.Xacnhanql = '';
    flux.Tentep='';
    if (flux.Flux_id != null) {
      this.serviceflux.UpdateFlux(flux).subscribe();
      let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
      element.click();
    }
  }
  updatequytrinh(quytrinh: quytrinh) {
   if(quytrinh.Quytrinh_id!=null)
   {
    let checkxacnhanpq: boolean = true;
    for (let i = 0; i < this.getflux.length; i++) {
      if ((this.getflux[i].Dodaytruoc == '' || this.getflux[i].Dodaytruoc == null) && (this.getflux[i].Dodaysau == '' || this.getflux[i].Dodaysau == null) && (this.getflux[i].Xacnhanql == '' || this.getflux[i].Xacnhanql == null)) {
        checkxacnhanpq = false;
      }
    }
    if (checkxacnhanpq == true) {
      if (quytrinh.Daky == false) {
        let arr = [
          {
            "Groupid":quytrinh.Groupid,
            "Namegroup":null,
            "Thutu":null,
            "Hoanthanh":quytrinh.Kieutrinhky,
            "Tongnhomky":null
          }
         ];
        let Tongnhom = this.getGroup.find(x=>x.Groupid==quytrinh.Groupid).Tongnhomky
        let dodai=(quytrinh.Kieutrinhky/Tongnhom*100).toString();
        let  tyle=quytrinh.Kieutrinhky+'/'+Tongnhom;
        quytrinh.Hoanthanh=dodai+'%';
        quytrinh.Tongnhomky=tyle;
        quytrinh.Daky = true;
        quytrinh.Ghichu=this.ghichunoidung;
        quytrinh.User_id = sessionStorage.getItem('Userid');
        quytrinh.Username = sessionStorage.getItem('Username');
        quytrinh.Ngayky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
        this.serviceGroup.UpdateGroup(arr[0]).subscribe();
        this.servicequytrinh.UpdateQuytrinh(quytrinh).subscribe()
        let element: HTMLElement = document.getElementById('modalNoidungHide') as HTMLElement;
        element.click();
        this.daky = true;
        this.chucnang = false;
      }
      else {
        console.log('Bạn không thể hủy ký!')
      }
    } else {
      console.log('Bạn chưa xử lý dữ liệu!')
    }
   }
  }
  OpenUpdateQuytrinh(){
    this.getAllgroup();
    let element: HTMLElement = document.getElementById('modalNoidung') as HTMLElement;
    element.click();
  }
}
