import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToasterService } from 'src/app/Shareds/services/toaster.service';
import { TaisanktxService } from 'src/app/Shareds/services/KTX-service/taisanktx.service';
import { NhaptaisanktxService } from 'src/app/Shareds/services/KTX-service/nhaptaisanktx.service';
import { BaophetaisanktxService } from 'src/app/Shareds/services/KTX-service/baophetaisanktx.service';
import { Taisanktx } from 'src/app/Shareds/models/KTX-model/taisanktx';
import { PhongktxService } from 'src/app/Shareds/services/KTX-service/phongktx.service';
import { Phongktx } from 'src/app/Shareds/models/KTX-model/Phongktx';
import { Nhaptaisanktx } from 'src/app/Shareds/models/KTX-model/nhaptaisanktx';
import { Baophetaisanktx } from 'src/app/Shareds/models/KTX-model/baophetaisanktx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-taisan-ktx',
  templateUrl: './taisan-ktx.component.html',
  styleUrls: ['./taisan-ktx.component.css']
})
export class TaisanKtxComponent implements OnInit {
  @Input() zIndex: number = 1000000000;
  trangthai = 'true';
  PLtaisan = 'false';
  Soluongtaisan
  Menhgia = 'dong'
  GetallKTX: Phongktx[]
  GetTenPhong = []
  GetAllTaisanKTX: Taisanktx[];
  GetAllNhapTaisanKTX:Nhaptaisanktx[]
  GetAllBaopheTaisanKTX:Baophetaisanktx[]
  selectTaisanktx = new Taisanktx();
  selectNhaptaisan = new Nhaptaisanktx()
  selectBaophetaisan = new Baophetaisanktx()
  @ViewChild('Soluong') Soluong: ElementRef;
  @ViewChild('Giatri') Giatri: ElementRef;
  @ViewChild('taisan') taisan: ElementRef;
  @ViewChild('MaNVL') MaNVL: ElementRef;
  FullName: string = sessionStorage.getItem('Fullname');
  UserID: string = sessionStorage.getItem('Userid');
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  pageIndexds: number;
  pageSizeds: number;
  Checkaddtaisan:boolean=false;

  addtaisan = new FormGroup(
    {
      Dodungid: new FormControl(),
      Phongid: new FormControl(),
      Tenphong: new FormControl(),
      MaNVL: new FormControl(),
      Masododung: new FormControl(),
      Tendodung: new FormControl(),
      Soluongtong: new FormControl(),
      Soluongdadung: new FormControl(),
      Soluongchuadung: new FormControl(),
      Soluongbaophe: new FormControl(),
      Hanmuc: new FormControl(),
      Phanloai: new FormControl(),
      Trigia: new FormControl(),
      Anh: new FormControl(),
      Trangthai: new FormControl(),
      Ghichu: new FormControl(),
      Ngaycapnhap: new FormControl(),
      Nguoitaoid: new FormControl(),
      Nguoitao: new FormControl(),
    }
  );
  constructor(private toaster: ToasterService, private _serviceTaisanktx: TaisanktxService, private _serviceBaophetaisanktx: BaophetaisanktxService, private _serviceNhaptaisanktx: NhaptaisanktxService, private _servicePhongktx: PhongktxService) {
    this.pageIndex = 0;
    this.pageSize = 3;
    this.pageIndexds = 0;
    this.pageSizeds = 3;
   }

  ngOnInit() {
    this.toaster.subject.next(null)
    this.GetAllTaisan();
    this.getallPhongKTX();
  }
  getallPhongKTX() {
    this._servicePhongktx.GetPhongktx().subscribe(data => {
      this.GetallKTX = data
      for (let i = 0; i < data.length; i++) {
        this.GetTenPhong.push(data[i]['Tenphong'])
      }
    })
  }
  addTaisanKTX() {
     this.Checkaddtaisan=false
      this.selectTaisanktx = new Taisanktx();
      this.trangthai = 'true';
      this.PLtaisan = 'false';
      this.Soluongtaisan = 0;
      this.Menhgia = 'dong'
      this.Soluong.nativeElement.placeholder = 'Số lượng'
      this.Soluong.nativeElement.disabled = true;
      this.taisan.nativeElement.disabled = false;
      this.MaNVL.nativeElement.disabled = false;
      this.addtaisan.reset();
      let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
      element.click();
  }
  GetAllTaisan() {
    this._serviceTaisanktx.GetTaisanktx().subscribe(data => {
      this.GetAllTaisanKTX = data
    })
  }
  GetAllNhapTaisan(dodungid:string) {
    this._serviceNhaptaisanktx.GetNhaptaisanktx(dodungid).subscribe(data => {
      this.GetAllNhapTaisanKTX = data
      this.count=this.GetAllNhapTaisanKTX.length
    })
  }
  GetAllBaopheTaisan(dodungid:string) {
    this._serviceBaophetaisanktx.GetBaophetaisanktx(dodungid).subscribe(data => {
      this.GetAllBaopheTaisanKTX = data
      this.countds=this.GetAllBaopheTaisanKTX.length
    })
  }
  onSubmit() {
    this.addtaisan.controls['Nguoitaoid'].reset(this.UserID);
    this.addtaisan.controls['Nguoitao'].reset(this.FullName);
    this.addtaisan.controls['Ngaycapnhap'].reset(formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US'));
    if(this.selectTaisanktx.edittable==true)
    {
      if (this.addtaisan.controls['Tendodung'].value != null&&this.addtaisan.controls['Hanmuc'].value >0){
        if(this.trangthai=='true')
        {
          this.addtaisan.controls['Trangthai'].reset(true);
        }
        else
        {
          this.addtaisan.controls['Trangthai'].reset(false);
        }
        for(let i = 0;i<this.GetAllTaisanKTX.length;i++)
        {
               if(this.GetAllTaisanKTX[i].Dodungid== this.addtaisan.controls['Dodungid'].value)
               {
                this.addtaisan.controls['Soluongtong'].reset(this.GetAllTaisanKTX[i].Soluongtong);
                this.addtaisan.controls['Soluongchuadung'].reset(this.GetAllTaisanKTX[i].Soluongchuadung);
                this.addtaisan.controls['Soluongdadung'].reset(this.GetAllTaisanKTX[i].Soluongdadung);
                this.addtaisan.controls['Soluongbaophe'].reset(this.GetAllTaisanKTX[i].Soluongbaophe);
                 break
               }
        }
        this._serviceTaisanktx.UpdateTaisanktx(this.addtaisan.value).subscribe(data => {
          for(let i = 0;i<this.GetAllTaisanKTX.length;i++)
          {
                 if(this.GetAllTaisanKTX[i].Dodungid== this.addtaisan.controls['Dodungid'].value)
                 {
                   this.GetAllTaisanKTX[i]=this.addtaisan.value
                   break
                 }
          }
          this.selectTaisanktx.edittable=false
          let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
          element.click();
        });
      }else
      {
        this.toaster.show('warning', 'Thông báo!', 'Nhập tên đồ dùng!');
      }
    
    }
    if(this.selectTaisanktx.edittable==false)
    {
      if (this.addtaisan.controls['Tendodung'].value != null&&this.addtaisan.controls['Hanmuc'].value >0) {
        if (this.trangthai == 'true') {
          this.addtaisan.controls['Trangthai'].reset(true)
        } else {
          this.addtaisan.controls['Trangthai'].reset(false)
        }
        this._serviceTaisanktx.AddTaisanktx(this.addtaisan.value, this.Soluongtaisan).subscribe(data => {
          this.GetAllTaisan()
          let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
          element.click();
        });
      }
    }
  }
  currencyFormat(num) {
    return parseFloat(num).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').split('.').toString()
  }
  onEventCurrency(menhgia: string) {
    if (menhgia == 'nghin') {
      if (parseInt(this.Giatri.nativeElement.value) > 0) {
        this.addtaisan.controls['Trigia'].reset(this.currencyFormat(this.Giatri.nativeElement.value));
      }

    }
    else {
      if (parseInt(this.Giatri.nativeElement.value) > 0) {
        this.addtaisan.controls['Trigia'].reset(this.Giatri.nativeElement.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').split('.').toString());
      }
    }
  }
  onSearch() {
    if (parseInt(this.Giatri.nativeElement.value) >= 0) {
      this.addtaisan.controls['Trigia'].reset(this.Giatri.nativeElement.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
    else {
      this.toaster.show('warning', 'Thông báo!', 'Giá trị phải là số');
    }
  }
  onEventPLtaisan(phanloaitaisan: string) {
    if (phanloaitaisan == 'false') {
      this.Soluongtaisan = 0
      this.Soluong.nativeElement.disabled = true;
    } else {
      this.Soluong.nativeElement.placeholder = 'Số lượng'
      this.Soluong.nativeElement.disabled = false;
    }
    this.addtaisan.controls['Phanloai'].reset(phanloaitaisan);
  }
  onEventTrangthai(trangthai: string) {
    this.addtaisan.controls['Trangthai'].reset(trangthai)
  }
  modalEdit(item: Taisanktx) {
    this.selectTaisanktx = item
    this.Checkaddtaisan=true;
    this.taisan.nativeElement.disabled = true;
    this.MaNVL.nativeElement.disabled = true;
    this.Soluong.nativeElement.disabled = true;
    this.GetAllNhapTaisan(item.Dodungid)
    this.GetAllBaopheTaisan(item.Dodungid)
    this.addtaisan.controls['Dodungid'].reset(item.Dodungid);
    this.addtaisan.controls['MaNVL'].reset(item.MaNVL);
    this.addtaisan.controls['Phanloai'].reset(item.Phanloai);
    this.addtaisan.controls['Tendodung'].reset(item.Tendodung);
    if(item.Trigia!=null)
    {
      this.addtaisan.controls['Trigia'].reset(item.Trigia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }else
    {
      this.addtaisan.controls['Trigia'].reset(item.Trigia);
    }
   
    this.addtaisan.controls['Hanmuc'].reset(item.Hanmuc);
    this.addtaisan.controls['Anh'].reset(item.Anh);
    this.addtaisan.controls['Ghichu'].reset(item.Ghichu);
    this.addtaisan.controls['Masododung'].reset(item.Masododung);
    this.addtaisan.controls['Trangthai'].reset(item.Trangthai);
    
    if (item.Phanloai == true) {
      this.PLtaisan = 'true';
    } else {
      this.PLtaisan = 'false';
    }
    if (item.Trangthai == true) {
      this.trangthai = 'true';
    } else {
      this.trangthai = 'false';
    }
    this.selectTaisanktx.edittable=true
    let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
    element.click();
  }
  openDelete(item: Taisanktx) {
    this.selectTaisanktx = item;
    let element: HTMLElement = document.getElementById('modalDeleteShow') as HTMLElement;
    element.click();
  }
  onDeleteTaisan(item: Taisanktx) {
    this._serviceTaisanktx.DeleteTaisanktx(item.Dodungid).subscribe(
      data => {
        for (let i = 0; i < this.GetAllTaisanKTX.length; i++) {
          if (this.GetAllTaisanKTX[i].Dodungid == item.Dodungid) {
            this.GetAllTaisanKTX.splice(i, 1);
            break
          }
        }
      }
    );
    let element: HTMLElement = document.getElementById('modalDeleteClose') as HTMLElement;
    element.click();
  }
  onAddBaophe(item: Baophetaisanktx){
    if (item.Soluong > 0) {
      item.Nguoitaoid = this.UserID;
      item.Nguoitao = this.FullName;
      item.Dodungid = this.selectTaisanktx.Dodungid
      item.MaNVL = this.selectTaisanktx.MaNVL
      item.Masododung = this.selectTaisanktx.Masododung
      item.Tendodung = this.selectTaisanktx.Tendodung
      item.Truocbaophe=this.selectTaisanktx.Soluongtong
      item.Saubaophe=this.selectTaisanktx.Soluongtong-item.Soluong
        if( item.Saubaophe>=0)
        {
          this._serviceBaophetaisanktx.AddBaophetaisanktx(item).subscribe(data=>{
            this.selectTaisanktx.Soluongtong = item.Saubaophe
            this.selectTaisanktx.Soluongchuadung -= item.Soluong
            this.GetAllBaopheTaisan(this.selectTaisanktx.Dodungid)
            this._serviceTaisanktx.UpdateTaisanktx(this.selectTaisanktx).subscribe(data => {
              for (let i = 0; i < this.GetAllTaisanKTX.length; i++) {
                if (this.GetAllTaisanKTX[i].Dodungid == this.selectTaisanktx.Dodungid) {
                  this.GetAllTaisanKTX[i] = this.selectTaisanktx
                  break
                }
              }
            })
          })
          let element: HTMLElement = document.getElementById('modalbaopheClose') as HTMLElement;
          element.click();
          this.selectBaophetaisan=new Baophetaisanktx();
        }else
        {
          this.toaster.show('warning', 'Thông báo!', 'Báo phế quá số lượng trong kho!');
        }
    }
    else
    {
      this.toaster.show('warning', 'Thông báo!', 'Nhập số lượng báo phế!');
    }
  }
  onAddNhaptaisan(item: Nhaptaisanktx) {
    if (item.Soluong > 0) {
      item.Nguoitaoid = this.UserID;
      item.Nguoitao = this.FullName;
      item.Dodungid = this.selectTaisanktx.Dodungid
      item.MaNVL = this.selectTaisanktx.MaNVL
      item.Masododung = this.selectTaisanktx.Masododung
      item.Tendodung = this.selectTaisanktx.Tendodung
      item.Truocnhap = this.selectTaisanktx.Soluongtong
      item.Saunhap = item.Soluong + item.Truocnhap
      this._serviceNhaptaisanktx.AddNhaptaisanktx(item).subscribe(data => {
        this.selectTaisanktx.Soluongtong = item.Saunhap
        this.selectTaisanktx.Soluongchuadung += item.Soluong
        this.GetAllNhapTaisan(this.selectTaisanktx.Dodungid)
        this._serviceTaisanktx.UpdateTaisanktx(this.selectTaisanktx).subscribe(data => {
          for (let i = 0; i < this.GetAllTaisanKTX.length; i++) {
            if (this.GetAllTaisanKTX[i].Dodungid == this.selectTaisanktx.Dodungid) {
              this.GetAllTaisanKTX[i] = this.selectTaisanktx
              break
            }
          }
        })
        let element: HTMLElement = document.getElementById('modalnhapClose') as HTMLElement;
        element.click();
        this.selectNhaptaisan=new Nhaptaisanktx();
      })
     
    }
    else
    {
      this.toaster.show('warning', 'Thông báo!', 'Nhập số lượng vào kho!');
    }
  }
  OpenDeleteNhap(item:Nhaptaisanktx){
    this.selectNhaptaisan=item
    let element: HTMLElement = document.getElementById('modalDeleteNhapShow') as HTMLElement;
    element.click();
  }
  OpenDeletebaophe(item:Baophetaisanktx){
    this.selectBaophetaisan=item
    let element: HTMLElement = document.getElementById('modalDeletebaopheShow') as HTMLElement;
    element.click();
  }
  onDeleteNhap(item:Nhaptaisanktx){
     this._serviceNhaptaisanktx.DeleteNhaptaisanktx(item.Nhapdodungid).subscribe(data=>{
       for(let i = 0;i<this.GetAllNhapTaisanKTX.length;i++)
       {
              if(this.GetAllNhapTaisanKTX[i].Nhapdodungid==item.Nhapdodungid)
              {
                this.GetAllNhapTaisanKTX.splice(i, 1);
                break
              }
       }
       this.count=this.GetAllNhapTaisanKTX.length
      let element: HTMLElement = document.getElementById('modalDeleteNhapClose') as HTMLElement;
      element.click();
     })
  }
  onDeleteBaophe(item:Baophetaisanktx){
    this._serviceBaophetaisanktx.DeleteBaophetaisanktx(item.Baophedodungid).subscribe(data=>{
      for(let i = 0;i<this.GetAllBaopheTaisanKTX.length;i++)
      {
        if(this.GetAllBaopheTaisanKTX[i].Baophedodungid==item.Baophedodungid)
        {
          this.GetAllBaopheTaisanKTX.splice(i, 1);
          break
        }
      }
      this.countds=this.GetAllBaopheTaisanKTX.length
      let element: HTMLElement = document.getElementById('modalDeletebaopheClose') as HTMLElement;
      element.click();
     })
  }
}
