import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ToasterService } from 'src/app/Shareds/services/toaster.service';
import { PhongktxService } from 'src/app/Shareds/services/KTX-service/phongktx.service';
import { Phongktx } from 'src/app/Shareds/models/KTX-model/Phongktx';
import { FormGroup, FormControl } from '@angular/forms';
import { NhanviendangkyService } from 'src/app/Shareds/services/KTX-service/nhanviendangky.service';
import { TaisanktxService } from 'src/app/Shareds/services/KTX-service/taisanktx.service';
import { CapphatdodungService } from 'src/app/Shareds/services/KTX-service/capphatdodung.service';
import { CapphatphongService } from 'src/app/Shareds/services/KTX-service/capphatphong.service';
import { NVdangkyKTX } from 'src/app/Shareds/models/KTX-model/NVdangky';
import { Capphatphong } from 'src/app/Shareds/models/KTX-model/capphatphong';
import { formatDate } from '@angular/common';
import { Capphatdodung } from 'src/app/Shareds/models/KTX-model/capphatdodung';
import { Taisanktx } from 'src/app/Shareds/models/KTX-model/taisanktx';

@Component({
  selector: 'app-phong-ktx',
  templateUrl: './phong-ktx.component.html',
  styleUrls: ['./phong-ktx.component.css']
})
export class PhongKtxComponent implements OnInit {
  @Input() zIndex: number = 1000000000;
  trangthai = 'true';
  khu = 'khu';
  tang = 'tang';
  Loai = '0'
  Gioitinh = '2'
  GetallKTX: Phongktx[] = []
  Getallphong: Phongktx[]
  Getallkhu: Phongktx[];
  Getalltang: Phongktx[];
  indexTang
  maxPhong: number
  nguoi_dang_o: number
  Tongsophong: number = 0
  Phong_o: number = 0
  Tongsocho: number = 0
  Controng: number = 0
  Tongsophong1: number = 0
  Phong_o1: number = 0
  Tongsocho1: number = 0
  Controng1: number = 0
  getAllDodung: Taisanktx[]
  getAllCapphatdodung1: Capphatdodung[]
  Getallnhanviendangky: NVdangkyKTX[] = []
  Getallnhanviendangkyvao: NVdangkyKTX[] = []
  Getallnhanvienbyphong: Capphatphong[] = []
  @ViewChild('soluongphong') soluongphong: ElementRef;
  @ViewChild('khuktx') khuktx: ElementRef;
  @ViewChild('tangktx') tangktx: ElementRef;
  @ViewChild('Nguoidango') Nguoidango: ElementRef;
  @ViewChild('ghichuDuyet') ghichuDuyet: ElementRef;
  showchucnang: boolean = false;
  selectPhongktx = new Phongktx();
  FullName: string = sessionStorage.getItem('Fullname');
  UserID: string = sessionStorage.getItem('Userid');
  pageIndex: number;
  pageSize: number;
  count: number;
  addphongktx = new FormGroup(
    {
      Phongid: new FormControl(),
      Tenphong: new FormControl(),
      So_nguoi_o: new FormControl(),
      Doituong: new FormControl(),
      Loai: new FormControl(),
      Gioitinh: new FormControl(),
      Tang: new FormControl(),
      Khu: new FormControl(),
      Trangthai: new FormControl(),
      Ghichu: new FormControl(),
      Ngaytao: new FormControl(),
      Nguoitaoid: new FormControl(),
      Nguoitao: new FormControl(),
      Phanloaidodung: new FormControl(),
      Tendodung: new FormControl(),
      Soluongdodung: new FormControl(),
      Soluongphong: new FormControl(),
      Controng: new FormControl(),
    }
  );
  constructor(private toaster: ToasterService,
    private _servicePhongktx: PhongktxService,
    private _serviceNhanviendangky: NhanviendangkyService,
    private _serviceTaisanktx: TaisanktxService,
    private _serviceCapphatdodung: CapphatdodungService,
    private _serviceCapphatphong: CapphatphongService,
    private renderer: Renderer2,
  ) {
    this.pageIndex = 0;
    this.pageSize = 10;
  }

  ngOnInit() {
    this.toaster.subject.next(null)
    this.soluongphong.nativeElement.placeholder = 'Số Lượng Phòng Tối Đa Là:?'
    this.getallKTX123();
    this.Getnhanviendangky()
    // this.getAllDodungKTX()
    // this.getAllCapphatdodungKTX()
  }
  Getnhanviendangky() {
    this._serviceNhanviendangky.GetNhanviendangkybytrangthai().subscribe(data => {
      this.Getallnhanviendangky = data

    })
  }
  async Getnhanvientrongphong(phongid: string) {
    await this._serviceCapphatphong.GetCapphatphongktxbyphongid(phongid).subscribe(data => {
      this.Getallnhanvienbyphong = data
    })
  }
  addPhongKTX() {
    this.selectPhongktx = new Phongktx();
    this.trangthai = 'true';
    this.khu = 'khu';
    this.tang = 'tang';
    this.Loai = '0';
    this.Gioitinh = '2'
    this.khuktx.nativeElement.disabled = false;
    this.tangktx.nativeElement.disabled = false;
    this.soluongphong.nativeElement.disabled = false;
    this.addphongktx.reset();
    this.Nguoidango.nativeElement.placeholder = 'Số người ở: >=0';
    this.soluongphong.nativeElement.placeholder = 'Số Lượng Phòng Tối Đa Là:?'
    let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
    element.click();
  }
  getallKTX123() {
    this._servicePhongktx.GetPhongktx().subscribe(data => {
      this.GetallKTX = data;
      this.Getallkhu = data.filter((thing, i, arr) => {
        return arr.indexOf(arr.find(t => t.Khu === thing.Khu)) === i
      });
      this.indexTang = 0;
      this.Getalltang = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu);
      this.Tongsocho = 0
      this.Controng = 0
      this.Tongsophong = this.Getalltang.length
      this.Phong_o = this.Getalltang.filter(x => x.Trangthai == true).length
      let getTam = this.Getalltang.filter(x => x.Trangthai == true)
      for (let i = 0; i < getTam.length; i++) {
        if (getTam[i].So_nguoi_o >= 0) {
          this.Tongsocho += getTam[i].So_nguoi_o
          this.Controng += getTam[i].Controng
        }
      }
      this.Getalltang = this.Getalltang.filter((thing, i, arr) => {
        return arr.indexOf(arr.find(t => t.Tang === thing.Tang)) === i
      });
      this.Getallphong = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu && x.Tang == this.Getalltang[0].Tang);
      this.Tongsocho1 = 0
      this.Controng1 = 0
      this.Tongsophong1 = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu && x.Tang == this.Getalltang[0].Tang).length;
      this.Phong_o1 = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu && x.Tang == this.Getalltang[0].Tang && x.Trangthai == true).length
      let getTam1 = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu && x.Tang == this.Getalltang[0].Tang && x.Trangthai == true)
      for (let i = 0; i < getTam1.length; i++) {
        if (getTam1[i].So_nguoi_o >= 0) {
          this.Tongsocho1 += getTam1[i].So_nguoi_o
          this.Controng1 += getTam1[i].Controng
        }
      }
    })
  }
  getalltangKTX(khu: string) {
    this.Getalltang = this.Getallkhu.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.Tang === thing.Tang)) === i
    });
  }
  getallphongKTX(khu: string, tang: number) {
    this.Getalltang = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu);
    this.Getalltang = this.Getalltang.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.Tang === thing.Tang)) === i
    });
    this.Getallphong = this.GetallKTX.filter(x => x.Khu == this.Getallkhu[0].Khu && x.Tang == this.Getalltang[0].Tang);
  }
  onSubmit() {
    this.addphongktx.controls['Nguoitaoid'].reset(this.UserID);
    this.addphongktx.controls['Nguoitao'].reset(this.FullName);
    if (this.selectPhongktx.edittable == true) {
      if (this.addphongktx.controls['Doituong'].value != null && this.addphongktx.controls['So_nguoi_o'].value != null) {
        if (this.addphongktx.controls['So_nguoi_o'].value >= this.nguoi_dang_o) {
          this._servicePhongktx.UpdatePhongktx(this.addphongktx.value).subscribe(data => {
            for (let i = 0; i < this.GetallKTX.length; i++) {
              if (this.GetallKTX[i].Phongid == this.addphongktx.controls['Phongid'].value) {
                this.selectPhongktx.Controng = parseInt(this.addphongktx.controls['So_nguoi_o'].value) - this.nguoi_dang_o
                if (this.trangthai == 'true') {
                  this.selectPhongktx.Trangthai = true
                } else {
                  this.selectPhongktx.Trangthai = false
                }
                this.selectPhongktx.So_nguoi_o = this.addphongktx.controls['So_nguoi_o'].value
                this.selectPhongktx.Doituong = this.addphongktx.controls['Doituong'].value
                this.selectPhongktx.Ghichu = this.addphongktx.controls['Ghichu'].value
                this.selectPhongktx.Loai = this.addphongktx.controls['Loai'].value
                this.selectPhongktx.Gioitinh = this.addphongktx.controls['Gioitinh'].value
                this.GetallKTX[i] = this.selectPhongktx

                this.Getalltang = this.GetallKTX.filter(x => x.Khu == this.selectPhongktx.Khu);
                this.Tongsophong = this.Getalltang.length
                this.Phong_o = this.Getalltang.filter(x => x.Trangthai == true).length
                let getTam = this.Getalltang.filter(x => x.Trangthai == true)
                this.Tongsocho = 0
                this.Controng = 0
                for (let i = 0; i < getTam.length; i++) {
                  if (getTam[i].So_nguoi_o >= 0) {
                    this.Tongsocho += parseInt(getTam[i].So_nguoi_o.toString())
                    this.Controng += getTam[i].Controng
                  }
                }
                this.Getalltang = this.Getalltang.filter((thing, i, arr) => {
                  return arr.indexOf(arr.find(t => t.Tang === thing.Tang)) === i
                });
                this.Getallphong = this.GetallKTX.filter(x => x.Khu == this.selectPhongktx.Khu && x.Tang == this.selectPhongktx.Tang);
                this.Tongsocho1 = 0
                this.Controng1 = 0
                this.Tongsophong1 = this.GetallKTX.filter(x => x.Khu == this.selectPhongktx.Khu && x.Tang == this.selectPhongktx.Tang).length;
                this.Phong_o1 = this.GetallKTX.filter(x => x.Khu == this.selectPhongktx.Khu && x.Tang == this.selectPhongktx.Tang && x.Trangthai == true).length
                let getTam1 = this.GetallKTX.filter(x => x.Khu == this.selectPhongktx.Khu && x.Tang == this.selectPhongktx.Tang && x.Trangthai == true)
                for (let i = 0; i < getTam1.length; i++) {
                  if (getTam1[i].So_nguoi_o >= 0) {
                    this.Tongsocho1 += parseInt(getTam1[i].So_nguoi_o.toString())
                    this.Controng1 += getTam1[i].Controng
                  }
                }
                break;
              }
            }

            let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
            element.click();
          });
        }
        else {
          this.toaster.show('warning', 'Thông báo!', 'Số người ở lớn hơn: ' + this.nguoi_dang_o);
        }
      }
      else {
        this.toaster.show('warning', 'Thông báo!', 'Cần nhập đầy đủ thông tin');
      }
    } else {
      if (this.addphongktx.controls['Tang'].value != 'tang' && this.addphongktx.controls['Khu'].value != 'khu' && this.addphongktx.controls['Doituong'].value != null && this.addphongktx.controls['Soluongphong'].value != null && this.addphongktx.controls['So_nguoi_o'].value != null) {
        if (this.addphongktx.controls['So_nguoi_o'].value >= 0) {
          if (this.addphongktx.controls['Soluongphong'].value <= this.maxPhong && this.addphongktx.controls['Soluongphong'].value > 0) {
            if (this.trangthai == 'true') {
              this.addphongktx.controls['Trangthai'].reset(true)
            } else {
              this.addphongktx.controls['Trangthai'].reset(false)
            }
            this._servicePhongktx.AddPhongktx(this.addphongktx.value).subscribe(data => {
              this.getallKTX123()
              let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
              element.click();
            });
          }
          else {
            this.toaster.show('warning', 'Thông báo!', 'Tối Đa Là: ' + this.maxPhong + ' Phòng');
          }
        }
        else {
          this.toaster.show('warning', 'Thông báo!', 'Số lượng người ở phải là số');
        }
      }
      else {
        this.toaster.show('warning', 'Thông báo!', 'Cần nhập đầy đủ thông tin');
      }
    }

  }
  onEventKhu(khu: string) {
    this.addphongktx.controls['Khu'].reset(khu);
  }

  onEventLoai(loai: string) {
    this.addphongktx.controls['Loai'].reset(loai);
  }
  onEventTang(tang: number) {
    this.addphongktx.controls['Soluongphong'].reset();
    if (this.khu == 'khu') {
      this.toaster.show('warning', 'Thông báo!', 'Cần nhập thông tin khu.');
    } else {
      if (this.tang != 'tang') {
        let getphong = this.GetallKTX.filter(x => x.Khu == this.addphongktx.controls['Khu'].value && x.Tang == tang);
        this.maxPhong = 99 - getphong.length
        this.addphongktx.controls['Tang'].reset(tang);
        this.soluongphong.nativeElement.placeholder = 'Số Lượng Phòng Tối Đa Là:' + this.maxPhong;
      }
    }
  }
  onEventTrangthai(trangthai: string) {
    this.addphongktx.controls['Trangthai'].reset(trangthai);

  }
  onEventGioitinh(gioitinh: string) {
    this.addphongktx.controls['Gioitinh'].reset(gioitinh);
  }
  onSelectKhu(khu: string) {
    this.Tongsocho = 0
    this.Controng = 0
    this.Getalltang = this.GetallKTX.filter(x => x.Khu == khu);
    this.Tongsophong = this.Getalltang.length
    this.Phong_o = this.Getalltang.filter(x => x.Trangthai == true).length
    let getTam = this.Getalltang.filter(x => x.Trangthai == true)
    for (let i = 0; i < getTam.length; i++) {
      if (getTam[i].So_nguoi_o >= 0) {
        this.Tongsocho += parseInt(getTam[i].So_nguoi_o.toString())
        this.Controng += getTam[i].Controng
      }
    }

    this.Getalltang = this.Getalltang.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.Tang === thing.Tang)) === i
    });
    this.Getallphong = this.GetallKTX.filter(x => x.Khu == khu && x.Tang == this.Getalltang[0].Tang);
    this.Tongsocho1 = 0
    this.Controng1 = 0
    this.Tongsophong1 = this.GetallKTX.filter(x => x.Khu == khu && x.Tang == this.Getalltang[0].Tang).length;
    this.Phong_o1 = this.GetallKTX.filter(x => x.Khu == khu && x.Tang == this.Getalltang[0].Tang && x.Trangthai == true).length
    let getTam1 = this.GetallKTX.filter(x => x.Khu == khu && x.Tang == this.Getalltang[0].Tang && x.Trangthai == true)
    for (let i = 0; i < getTam1.length; i++) {
      if (getTam1[i].So_nguoi_o >= 0) {
        this.Tongsocho1 += getTam1[i].So_nguoi_o
        this.Controng1 += getTam1[i].Controng
      }
    }
  }
  onTang(item, i) {
    this.indexTang = i;
    this.Getallphong = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang);
    this.Tongsocho1 = 0
    this.Controng1 = 0
    this.Tongsophong1 = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang).length;
    this.Phong_o1 = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang && x.Trangthai == true).length
    let getTam1 = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang && x.Trangthai == true)
    for (let i = 0; i < getTam1.length; i++) {
      if (getTam1[i].So_nguoi_o >= 0) {
        this.Tongsocho1 += parseInt(getTam1[i].So_nguoi_o.toString())
        this.Controng1 += getTam1[i].Controng
      }
    }
  }
  getColor(z): string {
    if (this.indexTang === z) {
      return '#4b9bf1bb';
    }
  }
  onMouseEnter(item: Phongktx) {
    for (let i = 0; i < this.Getallphong.length; i++) {
      if (this.Getallphong[i].edittable == true) {
        this.Getallphong[i].edittable = false
      }
    }
    item.edittable = true;
    this.selectPhongktx = item
  }
  onMouseEnterClose() {
    this.selectPhongktx.edittable = false;
  }
  openEdit(item: Phongktx) {
    this.nguoi_dang_o = item.So_nguoi_o - item.Controng;
    this.addphongktx.controls['Phongid'].reset(item.Phongid);
    this.addphongktx.controls['Tenphong'].reset(item.Tenphong);
    this.addphongktx.controls['Doituong'].reset(item.Doituong);
    this.addphongktx.controls['So_nguoi_o'].reset(item.So_nguoi_o);
    this.addphongktx.controls['Ghichu'].reset(item.Ghichu);
    this.addphongktx.controls['Nguoitaoid'].reset(this.UserID);
    this.addphongktx.controls['Nguoitao'].reset(this.FullName);
    this.addphongktx.controls['Trangthai'].reset(item.Trangthai);
    this.addphongktx.controls['Loai'].reset(item.Loai);
    this.addphongktx.controls['Gioitinh'].reset(item.Gioitinh);
    this.khu = item.Khu;
    this.tang = item.Tang.toString();

    if (item.Trangthai == true) {
      this.trangthai = 'true';
    } else {
      this.trangthai = 'false';
    }
    if (item.Loai == 1) {
      this.Loai = '1'
    } else if (item.Loai == 2) {
      this.Loai = '2'
    } else if (item.Loai == 3) {
      this.Loai = '3'
    }
    else {
      this.Loai = '0'
    }

    if (item.Gioitinh == 1) {
      this.Gioitinh = '1'
    } else if (item.Gioitinh == 0) {
      this.Gioitinh = '0'
    } else {
      this.Gioitinh = '2'
    }
    this.khuktx.nativeElement.disabled = true;
    this.tangktx.nativeElement.disabled = true;
    this.soluongphong.nativeElement.disabled = true;
    this.addphongktx.controls['Soluongphong'].reset();
    this.soluongphong.nativeElement.placeholder = ''
    this.Nguoidango.nativeElement.placeholder = 'Số Người Ở Tối thiều là:' + this.nguoi_dang_o;
    let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
    element.click();
  }
  openDelete(item: Phongktx) {
    this.selectPhongktx = item
    let element: HTMLElement = document.getElementById('modalDeleteShow') as HTMLElement;
    element.click();
  }
  onDelete(item: Phongktx) {
    this._servicePhongktx.DeletePhongktx(item.Phongid).subscribe(data => {
      for (let i = 0; i < this.GetallKTX.length; i++) {
        if (this.GetallKTX[i].Phongid == item.Phongid) {
          this.GetallKTX.splice(i, 1);
          this.Getalltang = this.GetallKTX.filter(x => x.Khu == item.Khu);
          this.Tongsophong = this.Getalltang.length
          this.Phong_o = this.Getalltang.filter(x => x.Trangthai == true).length
          let getTam = this.Getalltang.filter(x => x.Trangthai == true)
          this.Tongsocho = 0
          this.Controng = 0
          for (let i = 0; i < getTam.length; i++) {
            if (getTam[i].So_nguoi_o >= 0) {
              this.Tongsocho += parseInt(getTam[i].So_nguoi_o.toString())
              this.Controng += getTam[i].Controng
            }
          }
          this.Getalltang = this.Getalltang.filter((thing, i, arr) => {
            return arr.indexOf(arr.find(t => t.Tang === thing.Tang)) === i
          });
          this.Getallphong = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang);
          this.Tongsocho1 = 0
          this.Controng1 = 0
          this.Tongsophong1 = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang).length;
          this.Phong_o1 = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang && x.Trangthai == true).length
          let getTam1 = this.GetallKTX.filter(x => x.Khu == item.Khu && x.Tang == item.Tang && x.Trangthai == true)
          for (let i = 0; i < getTam1.length; i++) {
            if (getTam1[i].So_nguoi_o >= 0) {
              this.Tongsocho1 += parseInt(getTam1[i].So_nguoi_o.toString())
              this.Controng1 += getTam1[i].Controng
            }
          }
          break;
        }
      }

      let element: HTMLElement = document.getElementById('modalDeleteClose') as HTMLElement;
      element.click();
    })
  }
  CloseAddnhanvienvaophong(item: Phongktx) {
    this.Getnhanvientrongphong(item.Phongid)
    this.selectPhongktx.Controng = this.selectPhongktx.So_nguoi_o - this.Getallnhanvienbyphong.length
    let element: HTMLElement = document.getElementById('AddnhanvienvaophongClose') as HTMLElement;
    element.click();
  }
  Opennhanvienvaophong(item: Phongktx) {
    this.Getnhanvientrongphong(item.Phongid)
    this.selectPhongktx = item
    if (item.Trangthai == true) {
      
      this.Getallnhanviendangkyvao = this.Getallnhanviendangky.filter(x => x.Tinhtrang == 'IN' && x.Xacnhan == false && x.Gioitinh == item.Gioitinh && x.Loai== item.Loai)
      this.count = this.Getallnhanviendangkyvao.length
    }
    else {
      this.Getallnhanviendangkyvao = null
      this.count = 0
    }
    let element: HTMLElement = document.getElementById('AddnhanvienvaophongShow') as HTMLElement;
    element.click();
  }
  OnSelectVao(item: Capphatphong, i) {
    const tbody = document.getElementById('Vao-' + i);
    for (let i = 0; i < this.Getallnhanviendangkyvao.length; i++) {
      if (this.Getallnhanviendangkyvao[i].Nhanviendangkyid === item.Nhanviendangkyid) {
        this.Getallnhanviendangkyvao[i].edittable = !this.Getallnhanviendangkyvao[i].edittable
        if (this.Getallnhanviendangkyvao[i].edittable == true) {
          this.renderer.setStyle(tbody, 'background-color', '#67aefabb');
        }
        else {
          this.renderer.removeStyle(tbody, 'background-color');
        }
      }
    }
  }
  OnSelectRa(item: Capphatphong, i) {
    const tbody = document.getElementById('Ra-' + i);
    for (let i = 0; i < this.Getallnhanvienbyphong.length; i++) {
      if (this.Getallnhanvienbyphong[i].Nhanviendangkyid === item.Nhanviendangkyid) {
        if (item.Nhanvien_nhanphongid == null) {
          this.Getallnhanvienbyphong[i].edittable = !this.Getallnhanvienbyphong[i].edittable
          if (this.Getallnhanvienbyphong[i].edittable == true) {
            this.renderer.setStyle(tbody, 'background-color', '#67aefabb');
          }
          else {
            this.renderer.removeStyle(tbody, 'background-color');
          }
        }
      }
    }
  }
  ClearOnSelect() {
    for (let i = 0; i < this.Getallnhanviendangkyvao.length; i++) {
      if (this.Getallnhanviendangkyvao[i].edittable === true) {
        this.Getallnhanviendangkyvao[i].edittable = false
      }
    }
  }
  Ra() {
    for (let i = 0; i < this.Getallnhanviendangky.length; i++) {
      for (let j = 0; j < this.Getallnhanvienbyphong.length; j++) {
        if (this.Getallnhanvienbyphong[j].edittable === true) {
          if (this.Getallnhanviendangky[i].Nhanviendangkyid === this.Getallnhanvienbyphong[j].Nhanviendangkyid && this.Getallnhanvienbyphong[j].Nhanvien_nhanphongid == null && this.Getallnhanviendangky[i].Tinhtrang == 'IN' && this.Getallnhanviendangky[i].Xacnhan == false) {
            this.Getallnhanviendangky[i].edittable = false
            this.Getallnhanviendangkyvao.push(this.Getallnhanviendangky[i])
            this.Getallnhanvienbyphong.splice(j, 1)
          }
        }
      }
    }
    this.selectPhongktx.Controng = this.selectPhongktx.So_nguoi_o - this.Getallnhanvienbyphong.length
    this.count = this.Getallnhanviendangkyvao.length
  }
  Vao() {
    if (0 < this.selectPhongktx.Controng) {
      for (let i = 0; i < this.Getallnhanviendangkyvao.length; i++) {
        if (this.Getallnhanviendangkyvao[i].edittable === true) {
          if (0 < this.selectPhongktx.Controng)
          {
            let nhanviennhanphong = new Capphatphong()
            nhanviennhanphong.Nhanviendangkyid = this.Getallnhanviendangkyvao[i].Nhanviendangkyid
            nhanviennhanphong.Manhanvien = this.Getallnhanviendangkyvao[i].Manhanvien
            nhanviennhanphong.Hoten = this.Getallnhanviendangkyvao[i].Hotenkhaisinh
            nhanviennhanphong.Phongid = this.selectPhongktx.Phongid
            nhanviennhanphong.Tenphong = this.selectPhongktx.Tenphong
            nhanviennhanphong.Nguoitaoid = this.UserID
            nhanviennhanphong.Nguoitao = this.FullName
            this.Getallnhanvienbyphong.push(nhanviennhanphong)
            this.Getallnhanviendangkyvao.splice(i, 1)
            this.selectPhongktx.Controng = this.selectPhongktx.So_nguoi_o - this.Getallnhanvienbyphong.length
            this.count = this.Getallnhanviendangkyvao.length
          }else
          {
            this.toaster.show('warning', 'Thông báo!', 'Phòng đã đầy!');
          }
         
        }
      }

    } else {
      this.toaster.show('warning', 'Thông báo!', 'Phòng đã đầy!');
    }

  }
  getAllDodungKTX() {
    this._serviceTaisanktx.GetTaisanktx().subscribe(data => {
      this.getAllDodung = data
    })
  }
  async getAllCapphatdodungKTX() {
    this.getAllCapphatdodung1=  await this._serviceCapphatdodung.GetCapphatdodungktx()
  }
  Duyet() {
    // let checkselect: boolean = false
    // for (let i = 0; i < this.Getallnhanvienbyphong.length; i++) {
    //   if (this.Getallnhanvienbyphong[i].Nhanvien_nhanphongid == null && this.Getallnhanvienbyphong[i].Nhanviendangkyid) {
    //     checkselect = true
    //     break
    //   }
    // }
    this.MultipleApprove()
    let element1: HTMLElement = document.getElementById('AddnhanvienvaophongClose') as HTMLElement;
    element1.click();
    // if (checkselect == true) {
    //   let element: HTMLElement = document.getElementById('XacnhanduyetShow') as HTMLElement;
    //   element.click();
    // } else {
    //   this.toaster.show('warning', 'Thông báo!', 'Chưa có lựa chọn nào!');
    // }

  }
  MultipleApprove() {
    for (let i = 0; i < this.Getallnhanviendangky.length; i++) {
      for (let j = 0; j < this.Getallnhanvienbyphong.length; j++) {
        if (this.Getallnhanviendangky[i].Nhanviendangkyid === this.Getallnhanvienbyphong[j].Nhanviendangkyid && this.Getallnhanvienbyphong[j].Nhanvien_nhanphongid == null && this.Getallnhanviendangky[i].Tinhtrang == 'IN' && this.Getallnhanviendangky[i].Xacnhan == false) {

          this._serviceCapphatphong.AddCapphatphongktx(this.Getallnhanvienbyphong[j]).subscribe(data => {

            this.selectPhongktx.Controng = this.selectPhongktx.So_nguoi_o - this.Getallnhanvienbyphong.length
            for (let j = 0; j < this.GetallKTX.length; j++) {
              if (this.GetallKTX[j].Phongid == this.selectPhongktx.Phongid) {
                this.GetallKTX[j].Controng = this.selectPhongktx.Controng
                break
              }
            }
          })
          // this.Getallnhanviendangky[i].Ghichu = this.ghichuDuyet.nativeElement.value
          // this.Getallnhanviendangky[i].Xacnhan = true;
          // this.Getallnhanviendangky[i].Trangthai = true;
          // this.Getallnhanviendangky[i].Nguoixacnhan = this.FullName;
          // this.Getallnhanviendangky[i].Nguoixacnhanid = this.UserID
          // this.Getallnhanviendangky[i].Thoigianky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
          // this._serviceQuytrinh.UpdateQuytrinh(this.Getallnhanviendangky[i]).subscribe();
          // this._serviceNhanviendangky.UpdateNhanviendangky(this.Getallnhanviendangky[i]).subscribe()
        }
      }
    }
    // let phanloaihangtieuhao = this.getAllDodung.filter(x => x.Phanloai == false && x.Trangthai == true)
    // for (let i = 0; i < this.Getallnhanviendangky.length; i++) {
    //   for (let j = 0; j < phanloaihangtieuhao.length; j++) {
    //     let checknhanviennhantaisan = this.getAllCapphatdodung1.filter(x => x.Nhanviendangkyid == this.Getallnhanviendangky[i].Nhanviendangkyid && x.Dodungid == phanloaihangtieuhao[j].Dodungid).length
    //     let checksoluongchuadung
    //     checksoluongchuadung = this.getAllDodung.find(y => y.Dodungid == phanloaihangtieuhao[j].Dodungid)
    //     if (checksoluongchuadung.Soluongchuadung > 0) {
    //       if (checknhanviennhantaisan == 0) {
    //         let nhanviennhantaisan = new Capphatdodung()
    //         nhanviennhantaisan.Dodungid = phanloaihangtieuhao[j].Dodungid
    //         nhanviennhantaisan.Nhanviendangkyid = this.Getallnhanviendangky[i].Nhanviendangkyid
    //         nhanviennhantaisan.Tendodung = phanloaihangtieuhao[j].Tendodung
    //         nhanviennhantaisan.Soluong = 1
    //         nhanviennhantaisan.Trigia = phanloaihangtieuhao[j].Trigia
    //         nhanviennhantaisan.Nguoitaoid = this.UserID
    //         nhanviennhantaisan.Nguoitao = this.FullName
    //         this.getAllCapphatdodung1.push(nhanviennhantaisan)
    //         for (let z = 0; z < this.getAllDodung.length; z++) {
    //           if (this.getAllDodung[z].Dodungid == nhanviennhantaisan.Dodungid) {
    //             this.getAllDodung[z].Soluongdadung += 1
    //             this.getAllDodung[z].Soluongchuadung -= 1
    //             this._serviceTaisanktx.UpdateTaisanktx(this.getAllDodung[z]).subscribe()
    //           }
    //         }
    //         this._serviceCapphatdodung.AddCapphatdodungktx(nhanviennhantaisan).subscribe()
    //       }

    //     }
    //     else {
    //       this.toaster.show('error', 'Thất Bại!', 'Số lượng ' + checksoluongchuadung.Tendodung + ' đã hết!');
    //     }
    //   }
    // }

  }
  XNduyet(noidung) {
    if (noidung) {
      this.MultipleApprove()
      let element: HTMLElement = document.getElementById('XacnhanduyetClose') as HTMLElement;
      element.click();
      let element1: HTMLElement = document.getElementById('AddnhanvienvaophongClose') as HTMLElement;
      element1.click();
      this.ghichuDuyet.nativeElement.value = null;
    }
    else {
      this.toaster.show('error', 'Thất Bại!', 'Chưa nhập nội dung!');
    }
  }
  lammoi(){
    this.soluongphong.nativeElement.placeholder = 'Số Lượng Phòng Tối Đa Là:?'
    this.getallKTX123();
    this.Getnhanviendangky()
    // this.getAllDodungKTX()
    // this.getAllCapphatdodungKTX() 
  }
}
