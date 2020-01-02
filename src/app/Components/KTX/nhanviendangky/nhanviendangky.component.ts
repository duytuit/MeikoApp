import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { formatDate } from '@angular/common';
import { NVdangkyKTX } from 'src/app/Shareds/models/KTX-model/NVdangky';
import { Giadinhnhanvien } from 'src/app/Shareds/models/KTX-model/Gdnhanvien';
import { Tieusunhanvien } from 'src/app/Shareds/models/KTX-model/Tsnhanvien';
import { Phongktx } from 'src/app/Shareds/models/KTX-model/Phongktx';
import { Taisanktx } from 'src/app/Shareds/models/KTX-model/taisanktx';
import { Capphatdodung } from 'src/app/Shareds/models/KTX-model/capphatdodung';
import { Capphatphong } from 'src/app/Shareds/models/KTX-model/capphatphong';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { ToasterService } from 'src/app/Shareds/services/toaster.service';
import { NhanviendangkyService } from 'src/app/Shareds/services/KTX-service/nhanviendangky.service';
import { ThanhphangiadinhnhanvienService } from 'src/app/Shareds/services/KTX-service/thanhphangiadinhnhanvien.service';
import { TieusunhanvienService } from 'src/app/Shareds/services/KTX-service/tieusunhanvien.service';
import { PhongktxService } from 'src/app/Shareds/services/KTX-service/phongktx.service';
import { QuytrinhvaoraService } from 'src/app/Shareds/services/KTX-service/quytrinhvaora.service';
import { TaisanktxService } from 'src/app/Shareds/services/KTX-service/taisanktx.service';
import { CapphatdodungService } from 'src/app/Shareds/services/KTX-service/capphatdodung.service';
import { CapphatphongService } from 'src/app/Shareds/services/KTX-service/capphatphong.service';
import { BaophetaisanktxService } from 'src/app/Shareds/services/KTX-service/baophetaisanktx.service';
import { ExcelService } from 'src/app/Shareds/services/excel.service';
import { FileService } from 'src/app/Shareds/services/file.service';
import { Baophetaisanktx } from 'src/app/Shareds/models/KTX-model/baophetaisanktx';
const EXCEL_TYPE = 'application/vnd.ms-excel;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { TTnv } from 'src/app/Shareds/models/TTnhanvien';
import { TTpb } from 'src/app/Shareds/models/TTphongban';
import { ThongtinNVService } from 'src/app/Shareds/services/thongtin-nv.service';

@Component({
  selector: 'app-nhanviendangky',
  templateUrl: './nhanviendangky.component.html',
  styleUrls: ['./nhanviendangky.component.css']
})
export class NhanviendangkyComponent implements OnInit {
  @Input() zIndex: number = 1000000000;
  getthongtinnhanvien
  getphong
  getban
  congdoan
  loai
  Tinhtrang
  haha:NVdangkyKTX[] 
  tam
  pageIndex: number;
  pageSize: number;
  count: number;
  LydoXoaCapphatdodung
  gettenphong = []
  gettendodung = []
  getthongtinNV:TTnv[];
  getthongtinPB:TTpb[]
  selectNVdangky = new NVdangkyKTX();
  selectGDNV = new Giadinhnhanvien();
  selectTSNV = new Tieusunhanvien();
  GetAllNVdangky: NVdangkyKTX[] = [];
  FGetAllNVdangky: NVdangkyKTX[] = [];
  ListNVdangky: NVdangkyKTX[] = [];
  GetAllGDNV: Giadinhnhanvien[];
  GetAllTSNV: Tieusunhanvien[];
  getAllPhong: Phongktx[];
  getAllDodung: Taisanktx[]
  getAllCapphatdodung: Capphatdodung[]
  getAllCapphatdodung1: Capphatdodung[]
  selectCapphatdodung = new Capphatdodung()
  GetDetailNVdangky: NVdangkyKTX[];
  getAllCapphatphong: Capphatphong[]
  getAllCapphatphong1:Capphatphong[]
  NewPhongbyNhanVien = []
  selectCapphatphong = new Capphatphong()
  form: FormGroup;
  form1: FormGroup;
  formCapphatphong: FormGroup;
  formCapphatdodung: FormGroup;
  FullName: string = sessionStorage.getItem('Fullname');
  UserID: string = sessionStorage.getItem('Userid');
  @ViewChild('MaIDNV') MaIDNV: ElementRef;
  @ViewChild('ghichuDuyet') ghichuDuyet: ElementRef;
  constructor(private fb: FormBuilder,
    private _serviceNhanviendangky: NhanviendangkyService,
    private toaster: ToasterService,
    private _serviceGDnhanvien: ThanhphangiadinhnhanvienService,
    private _serviceTSnhanvien: TieusunhanvienService,
    private _servicePhongktx: PhongktxService,
    private _serviceQuytrinh: QuytrinhvaoraService,
    private _serviceTaisanktx: TaisanktxService,
    private _serviceCapphatdodung: CapphatdodungService,
    private _serviceCapphatphong: CapphatphongService,
    private _serviceBaophetaisanktx: BaophetaisanktxService,
    private renderer: Renderer2 ,
    private _serviceExcel:ExcelService,
    private _servicefile: FileService,
    private serviceTTnhanvien: ThongtinNVService
     ) {
    this.formCapphatphong = this.fb.group({
      credentialsCapphatphong: this.fb.array([]),
    });
    this.formCapphatdodung = this.fb.group({
      credentialsCapphatdodung: this.fb.array([]),
    });
    this.form = this.fb.group({
      credentials: this.fb.array([]),
    });
    for (let i = 0; i < 3; i++) {
      this.addCreds();
    }
    this.form1 = this.fb.group({
      credentials1: this.fb.array([]),
    });
    for (let i = 0; i < 3; i++) {
      this.addCreds1();
    }
    for (let i = 0; i < 2; i++) {
      this.addCredsCapphatphong();
    }
    for (let i = 0; i < 2; i++) {
      this.addCredsCapphatdodung();
    }
    this.pageIndex = 0;
    this.pageSize = 19;
  }
  addCredsCapphatphong() {
    const credsCapphatphong = this.formCapphatphong.controls.credentialsCapphatphong as FormArray;
    credsCapphatphong.push(this.fb.group({
      Phongid: ['', Validators.required],
      Tenphong: ['', Validators.required],
      Manhanvien: ['', Validators.required],
      Hoten: ['', Validators.required],
      Ghichu: [''],
      Nhanviendangkyid: ['', Validators.required],
    }));
  }
  getAllTTnhanvien() {
    this.serviceTTnhanvien.GetTTnhanvien().subscribe(data => {
      this.getthongtinNV = data;
    });
  }
  getAllTTphongban() {
    this.serviceTTnhanvien.GetTTphongban().subscribe(data => {
      this.getthongtinPB = data;
    });
  }
  removeGroupCapphatphong(i: number) {
    const controlCapphatphong = <FormArray>this.formCapphatphong.controls['credentialsCapphatphong'];
    controlCapphatphong.removeAt(i);
  }
  addCredsCapphatdodung() {
    const credsCapphatdodung = this.formCapphatdodung.controls.credentialsCapphatdodung as FormArray;
    credsCapphatdodung.push(this.fb.group({
      Dodungid: ['', Validators.required],
      Tendodung: ['', Validators.required],
      Soluong: ['', Validators.required],
      Trigia: ['', Validators.required],
      Ghichu: [''],
      Nhanviendangkyid: ['', Validators.required]
    }));
  }
  removeGroupCapphatdodung(i: number) {
    const controlCapphatdodung = <FormArray>this.formCapphatdodung.controls['credentialsCapphatdodung'];
    controlCapphatdodung.removeAt(i);
  }
  getArrayControlsCapphatdodung() {
    return (this.formCapphatdodung.get('credentialsCapphatdodung') as FormArray).controls;
  }
  getArrayControlsCapphatphong() {
    return (this.formCapphatphong.get('credentialsCapphatphong') as FormArray).controls;
  }


  getArrayControls() {
    return (this.form.get('credentials') as FormArray).controls;
  }
  getArrayControls1() {
    return (this.form1.get('credentials1') as FormArray).controls;
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.selectNVdangky = new NVdangkyKTX();
  }
  ngOnInit() {
    this.toaster.subject.next(null)
    this.getAllCapphatphongKTX()
    this.getAllCapphatdodungKTX()
    this.getAllNhanviendangky();
    this.getAllPhongKTX()
    this.getAllDodungKTX()
    this.getAllTTphongban()
    this.getAllTTnhanvien();
  }
 async getAllPhongKTX() {
   await this._servicePhongktx.GetPhongktx().subscribe(data => {
      this.getAllPhong = data;
    })
  }
  Capphatphongchodoituong(gioitinh: number,loai: number) {
    for (let i = 0; i < this.getAllPhong.length; i++) {
      if (this.getAllPhong[i].Controng > 0 && this.getAllPhong[i].Gioitinh == gioitinh&&this.getAllPhong[i].Trangthai==true&&this.getAllPhong[i].Loai==loai) {
        this.gettenphong.push(this.getAllPhong[i]['Tenphong'])
      }
    }
  }
  getAllDodungKTX() {
    this._serviceTaisanktx.GetTaisanktx().subscribe(data => {
      this.getAllDodung = data
      for (let i = 0; i < data.length; i++) {
        if(data[i].Trangthai==true)
        {
          this.gettendodung.push(data[i]['Tendodung'])
        }
       
      }
    })
  }
  getAllCapphatdodungKTXbyid(nhanviendangkyid: string) {
    this._serviceCapphatdodung.GetCapphatdodungktxbyid(nhanviendangkyid).subscribe(data => {
      this.getAllCapphatdodung = data
    })
  }
  async getAllCapphatdodungKTX() {
    this.getAllCapphatdodung1=  await this._serviceCapphatdodung.GetCapphatdodungktx()
  }
  getAllCapphatphongKTXbyid(nhanviendangkyid: string) {
    this._serviceCapphatphong.GetCapphatphongktxbyid(nhanviendangkyid).subscribe(data => {
      this.getAllCapphatphong = data
    })
  }
async getAllCapphatphongKTX() {
    await this._serviceCapphatphong.GetCapphatphongktx().subscribe(data => {
      this.getAllCapphatphong1 = data
    })
  }
  onSubmitCapphatdodung() {
    var control = <FormArray>this.formCapphatdodung.get('credentialsCapphatdodung');
    for (let i = 0; i < control.length; i++) {
      control.controls[i].get('Nhanviendangkyid').setValue(this.selectNVdangky.Nhanviendangkyid);
    }
    if (control.valid) {

      var df = JSON.stringify(this.formCapphatdodung.value);
      var json: any[] = JSON.parse(df);
      let capphatdodung = Object.values(json)[0]
      for (let i = 0; i < capphatdodung.length; i++) {
        let checksoluong = this.CheckSoluongdodung(capphatdodung[i]['Soluong'], i)
        if (checksoluong == true) {
          if (capphatdodung[i]['Soluong'] > 0) {
            this._serviceCapphatdodung.AddCapphatdodungktx(capphatdodung[i]).subscribe(data => {
              for (let j = 0; j < this.getAllDodung.length; j++) {
                if (this.getAllDodung[j].Dodungid == capphatdodung[i]['Dodungid']) {
                  this.getAllDodung[j].Soluongdadung += capphatdodung[i]['Soluong']
                  this.getAllDodung[j].Soluongchuadung -= capphatdodung[i]['Soluong']
                  //console.log(this.getAllDodung[j])
                  this._serviceTaisanktx.UpdateTaisanktx(this.getAllDodung[j]).subscribe()
                  break
                }
              }
              this.getAllCapphatdodungKTXbyid(this.selectNVdangky.Nhanviendangkyid)
            })
          } else {
            this.toaster.show('warning', 'Thông báo!', 'Số lượng > 0');
          }

        } else {
          this.toaster.show('warning', 'Thông báo!', 'Trong kho không còn ' + capphatdodung[i]['Tendodung']);
        }
      }
      let element: HTMLElement = document.getElementById('childModalCapphatdodungClose') as HTMLElement;
      element.click();
      this.formCapphatdodung.reset();
      for (let i = control.length; 0 <= i; i--) {
        control.removeAt(i)
      }
      for (let i = 0; i < 2; i++) {
        this.addCredsCapphatdodung();
      }
    } else {

      this.toaster.show('error', 'Thất Bại!', 'Cần nhập đầy đủ thông tin.');
    }
  }
  onSubmitCapphatphong() {
    var control = <FormArray>this.formCapphatphong.get('credentialsCapphatphong');
    for (let i = 0; i < control.length; i++) {
      control.controls[i].get('Nhanviendangkyid').setValue(this.selectNVdangky.Nhanviendangkyid);
      control.controls[i].get('Hoten').setValue(this.selectNVdangky.Hotenkhaisinh);
      control.controls[i].get('Manhanvien').setValue(this.selectNVdangky.Manhanvien);
    }
    if (control.valid) {

      var df = JSON.stringify(this.formCapphatphong.value);
      var json: any[] = JSON.parse(df);
      let capphatphong = Object.values(json)[0]
      for (let i = 0; i < capphatphong.length; i++) {
        if (capphatphong[i]['Phongid'] && capphatphong[i]['Tenphong'] && capphatphong[i]['Nhanviendangkyid']) {

          for (let j = 0; j < this.getAllPhong.length; j++) {
            if (this.getAllPhong[j].Phongid == capphatphong[i]['Phongid']) {
              if (this.getAllPhong[j].Controng >= 1) {
                this._serviceCapphatphong.AddCapphatphongktx(capphatphong[i]).subscribe(data => {
                  for (let a = 0; a < this.GetAllNVdangky.length; a++) {
                    if (this.GetAllNVdangky[a].Nhanviendangkyid = this.selectNVdangky.Nhanviendangkyid) {
                      this.GetAllNVdangky[a].Ophong = (parseInt(this.GetAllNVdangky[a].Ophong) + 1).toString()
                      break
                    }
                  }
                  this.getAllPhong[j].Controng -= 1
                  this.gettenphong = []
                  this.Capphatphongchodoituong(this.selectNVdangky.Gioitinh,this.selectNVdangky.Loai)
                  this.getAllCapphatphongKTXbyid(this.selectNVdangky.Nhanviendangkyid)
                })
                break;
              }

            }

          }

        }
      }

      let element: HTMLElement = document.getElementById('childModalCapphatphongClose') as HTMLElement;
      element.click();

      this.formCapphatphong.reset();
      for (let i = control.length; 0 <= i; i--) {
        control.removeAt(i)
      }
      for (let i = 0; i < 2; i++) {
        this.addCredsCapphatphong();
      }
    }
    else {

      this.toaster.show('error', 'Thất Bại!', 'Cần nhập đầy đủ thông tin.');
    }
  }
  MultipleCheckSoluongdodung(iddodung: string, soluong: number): boolean {

    let dodung = this.getAllDodung.find(x => x.Dodungid == iddodung)
    if (dodung) {
      if (soluong <= dodung.Soluongchuadung) {
        return true
      } else {
        return false
      }
    }

  }
  CheckSoluongdodung(soluong: number, i): boolean {
    var control = <FormArray>this.formCapphatdodung.get('credentialsCapphatdodung');
    let iddodung = control.controls[i].get('Dodungid').value
    let dodung = this.getAllDodung.find(x => x.Dodungid == iddodung)
    if (dodung) {
      if (soluong <= dodung.Soluongchuadung) {
        return true

      } else {
        return false
      }
    } else {
      this.toaster.show('warning', 'Cảnh báo!', 'Nhập tên đồ dùng');
    }
  }
  getdodungid(tendodung: string, i) {
    if (tendodung) {
      var control = <FormArray>this.formCapphatdodung.get('credentialsCapphatdodung');
      control.controls[i].get('Tendodung').setValue(tendodung);
      let dodung = this.getAllDodung.find(x => x.Tendodung == tendodung)
      control.controls[i].get('Dodungid').setValue(dodung.Dodungid);
      control.controls[i].get('Trigia').setValue(dodung.Trigia);
    }
  }
  getphongid(tenphong: string, i) {
    if (tenphong) {
      var control = <FormArray>this.formCapphatphong.get('credentialsCapphatphong');
      control.controls[i].get('Tenphong').setValue(tenphong);
      let phong = this.getAllPhong.find(x => x.Tenphong == tenphong)
      control.controls[i].get('Phongid').setValue(phong.Phongid);
    }
  }
  OpenchildModalCapphatphong() {
    this.Capphatphongchodoituong(this.selectNVdangky.Gioitinh,this.selectNVdangky.Loai)
    let element: HTMLElement = document.getElementById('childModalCapphatphongShow') as HTMLElement;
    element.click();
  }
   GetTTNV(value: string) {
    this.selectNVdangky = new NVdangkyKTX();
    this.getthongtinnhanvien =  this.getthongtinNV.find(x=>x.manhansu==value)
    if (this.getthongtinnhanvien) {
        this.toaster.show('success', 'Thành Công!');
      this.selectNVdangky.Hoten = this.getthongtinnhanvien.hodem + ' ' + this.getthongtinnhanvien.ten
      this.selectNVdangky.Hotenkhaisinh = this.getthongtinnhanvien.hodem + ' ' + this.getthongtinnhanvien.ten
      this.selectNVdangky.Capbac = this.getthongtinnhanvien.capbac
      this.selectNVdangky.Cmt = this.getthongtinnhanvien.cmtnd_so
      let capbac = this.getthongtinnhanvien.capbac
      if (capbac <= 3) {
        this.selectNVdangky.Doituong = 'Công Nhân'
        this.selectNVdangky.Loai = 3
      }
      else if (capbac > 3 && capbac < 7) {
        this.selectNVdangky.Doituong = 'Nhân Viên'
        this.selectNVdangky.Loai = 2
      }
      else {
        this.selectNVdangky.Doituong = 'Chuyên Gia'
        this.selectNVdangky.Loai = 1
      }
      let langianhap = []
      for (let i = 0; i < this.haha.length; i++) {
        if (this.haha[i].Manhanvien == value) {
          langianhap.push(this.haha[i].Solan_gianhap)
        }
      }
      let Maxlangianhap = Math.max.apply(null, langianhap)
      if (Maxlangianhap > 0) {
        this.selectNVdangky.Solan_gianhap = Maxlangianhap + 1
      }
      else {
        this.selectNVdangky.Solan_gianhap = 1
      }
      this.selectNVdangky.Manhanvien = this.getthongtinnhanvien.manhansu
      this.selectNVdangky.Sodidong = this.getthongtinnhanvien.dienthoai_didong
      this.selectNVdangky.Sonharieng = this.getthongtinnhanvien.dienthoai_nharieng
      this.selectNVdangky.Gioitinh = this.getthongtinnhanvien.gioitinh
      this.selectNVdangky.Ngaysinh = formatDate(this.getthongtinnhanvien.ngaysinh, 'dd-MM-yyyy', 'en-US')
      this.selectNVdangky.Noisinh = this.getthongtinnhanvien.noisinh
      this.selectNVdangky.Quequan = this.getthongtinnhanvien.diachitamtru
      this.selectNVdangky.noicap_cmt = this.getthongtinnhanvien.cmtnd_noicap
      this.selectNVdangky.ngaycap_cmt = formatDate(this.getthongtinnhanvien.cmtnd_ngayhethan, 'dd-MM-yyyy', 'en-US')
      this.selectNVdangky.Noithuongtru = this.getthongtinnhanvien.diachithuongtru
 
      if (this.getthongtinnhanvien.phong_id) {
        this.getphong =  this.getthongtinPB.find(x=>x.id==this.getthongtinnhanvien.phong_id)
        this.selectNVdangky.Phong = this.getphong.bophan_ten
      }
      if (this.getthongtinnhanvien.ban_id) {
        this.getban =  this.getthongtinPB.find(x=>x.id==this.getthongtinnhanvien.ban_id)
        this.selectNVdangky.Ban = this.getban.bophan_ten
      }
      if (this.getthongtinnhanvien.congdoan_id) {
        this.congdoan =  this.getthongtinPB.find(x=>x.id==this.getthongtinnhanvien.congdoan_id)
        this.selectNVdangky.Congdoan = this.congdoan.bophan_ten
      }
      let element: HTMLElement = document.getElementById('GetEmpClose') as HTMLElement;
      element.click();
      let element1: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
      element1.click();
      this.MaIDNV.nativeElement.value = null;
    } else {
      this.toaster.show('error', 'Thất Bại!');
      this.MaIDNV.nativeElement.value = null;
    }
   
  }
   GetTTNV1(value: string) :NVdangkyKTX{
    this.selectNVdangky = new NVdangkyKTX();
    this.getthongtinnhanvien =  this.getthongtinNV.find(x=>x.manhansu==value)
    if (this.getthongtinnhanvien) {
     // this.toaster.show('success', 'Thành Công!');
      this.selectNVdangky.Hoten = this.getthongtinnhanvien.hodem + ' ' + this.getthongtinnhanvien.ten
      this.selectNVdangky.Hotenkhaisinh = this.getthongtinnhanvien.hodem + ' ' + this.getthongtinnhanvien.ten
      this.selectNVdangky.Capbac = this.getthongtinnhanvien.capbac
      this.selectNVdangky.Cmt = this.getthongtinnhanvien.cmtnd_so
      let capbac = this.getthongtinnhanvien.capbac
      if (capbac <= 3) {
        this.selectNVdangky.Doituong = 'Công Nhân'
        this.selectNVdangky.Loai = 3
      }
      else if (capbac > 3 && capbac < 7) {
        this.selectNVdangky.Doituong = 'Nhân Viên'
        this.selectNVdangky.Loai = 2
      }
      else {
        this.selectNVdangky.Doituong = 'Chuyên Gia'
        this.selectNVdangky.Loai = 1
      }
      let langianhap = []
      for (let i = 0; i < this.haha.length; i++) {
        if (this.haha[i].Manhanvien == value) {
          langianhap.push(this.haha[i].Solan_gianhap)
        }
      }
      let Maxlangianhap = Math.max.apply(null, langianhap)
      if (Maxlangianhap > 0) {
        this.selectNVdangky.Solan_gianhap = Maxlangianhap + 1
      }
      else {
        this.selectNVdangky.Solan_gianhap = 1
      }
      this.selectNVdangky.Manhanvien = this.getthongtinnhanvien.manhansu
      this.selectNVdangky.Sodidong = this.getthongtinnhanvien.dienthoai_didong
      this.selectNVdangky.Sonharieng = this.getthongtinnhanvien.dienthoai_nharieng
      this.selectNVdangky.Gioitinh = this.getthongtinnhanvien.gioitinh
      this.selectNVdangky.Ngaysinh = formatDate(this.getthongtinnhanvien.ngaysinh, 'dd-MM-yyyy', 'en-US')
      this.selectNVdangky.Noisinh = this.getthongtinnhanvien.noisinh
      this.selectNVdangky.Quequan = this.getthongtinnhanvien.diachitamtru
      this.selectNVdangky.noicap_cmt = this.getthongtinnhanvien.cmtnd_noicap
      this.selectNVdangky.ngaycap_cmt = formatDate(this.getthongtinnhanvien.cmtnd_ngayhethan, 'dd-MM-yyyy', 'en-US')
      this.selectNVdangky.Noithuongtru = this.getthongtinnhanvien.diachithuongtru
 
      if (this.getthongtinnhanvien.phong_id) {
        this.getphong =  this.getthongtinPB.find(x=>x.id==this.getthongtinnhanvien.phong_id)
        this.selectNVdangky.Phong = this.getphong.bophan_ten
      }
      if (this.getthongtinnhanvien.ban_id) {
        this.getban =  this.getthongtinPB.find(x=>x.id==this.getthongtinnhanvien.ban_id)
        this.selectNVdangky.Ban = this.getban.bophan_ten
      }
      if (this.getthongtinnhanvien.congdoan_id) {
        this.congdoan =  this.getthongtinPB.find(x=>x.id==this.getthongtinnhanvien.congdoan_id)
        this.selectNVdangky.Congdoan = this.congdoan.bophan_ten
      }
    }
    return this.selectNVdangky
  }
  onSubmit(item: NVdangkyKTX) {

    if (item.Lydodangky && item.Somayle) {
      if (item.edittable == false) {
        this.ListNVdangky.push(item)
        this._serviceNhanviendangky.AddNhanviendangky(this.ListNVdangky).subscribe(data => {
          this.ListNVdangky = []
          this.getAllNhanviendangky()
          let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
          element.click();
        })
      }
      else {
        this._serviceNhanviendangky.UpdateNhanviendangky(item).subscribe()

        let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
        element.click();
      }

    }
    else {
      this.toaster.show('error', 'Thất Bại!', 'Cần nhập đầy đủ thông tin.');
    }
  }
  onEditKhainhankhau(item: NVdangkyKTX) {
    if (this.GetAllTSNV.length > 0 && this.GetAllGDNV.length > 0) {
      item.Hoanthanh = 3;
    }
    else if (this.GetAllTSNV.length > 0 || this.GetAllGDNV.length > 0) {
      item.Hoanthanh = 2;
    } else {
      item.Hoanthanh = 1;
    }
    this._serviceNhanviendangky.Updatekhainhankhau(item).subscribe();
    this._serviceTSnhanvien.UpdateTSnhanvien(this.GetAllTSNV).subscribe()
    this._serviceGDnhanvien.UpdateGDnhanvien(this.GetAllGDNV).subscribe()
    let element: HTMLElement = document.getElementById('khainhankhauClose') as HTMLElement;
    element.click();

  }
  openEdit(item: NVdangkyKTX) {
    this.selectNVdangky = item;
    item.edittable = true;
    let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
    element.click();
  }
  openDelete(item: NVdangkyKTX) {
    this.selectNVdangky = item;
    this.getAllCapphatdodungKTXbyid(this.selectNVdangky.Nhanviendangkyid)
    this.getAllCapphatphongKTXbyid(this.selectNVdangky.Nhanviendangkyid)
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
  }
  tesst() {
    this.GetAllNVdangky = this.haha.filter(x => x.Tinhtrang == 'IN');
    let GetOUT = this.haha.filter(x => x.Tinhtrang == 'OUT');

    for (let x = 0; x < this.GetAllNVdangky.length; x++) {
      for (let y = 0; y < GetOUT.length; y++) {
        if(GetOUT[y].Xacnhan==false)
        {
          let checknhanvien = this.getAllCapphatphong1.filter(x => x.Nhanviendangkyid == GetOUT[y].Nhanviendangkyid).length
          if(checknhanvien>0)
          {
            GetOUT[y].Ophong=checknhanvien.toString()
          }
        }
        if (this.GetAllNVdangky[x].Xacnhan == true && this.GetAllNVdangky[x].Nhanviendangkyid == GetOUT[y].Nhanviendangkyid) {
          this.GetAllNVdangky.splice(x, 1)
          GetOUT[y].Trangthai = true;
          this.GetAllNVdangky.push(GetOUT[y])
        }
      }
    }
    this.FGetAllNVdangky= this.GetAllNVdangky
    this.count = this.GetAllNVdangky.length

  }
  _FilterMaID: string;
  get FilterMaID():string{
    return this._FilterMaID;
  }
  set FilterMaID(value:string){
    this._FilterMaID=value;
    this.GetAllNVdangky=this.FilterMaID ? this.GetFilterMaID(this.FilterMaID):this.FGetAllNVdangky;
    this.count = this.GetAllNVdangky.length;
  }
  GetFilterMaID(filterBy: string): NVdangkyKTX[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.FGetAllNVdangky.filter((NVdangky: NVdangkyKTX) =>
    NVdangky.Manhanvien.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
  getAllNhanviendangky() {
    this._serviceNhanviendangky.GetNhanviendangky().subscribe(data => {
      this.haha = data;
      this.tesst()
    });

  }
  getAllGDnhanvien(khainhankhauid: string) {
    this._serviceGDnhanvien.GetGDnhanvien(khainhankhauid).subscribe(data => {
      this.GetAllGDNV = data

    });
  }
  getAllTSnhanvien(khainhankhauid: string) {
    this._serviceTSnhanvien.GetTSnhanvien(khainhankhauid).subscribe(data => {
      this.GetAllTSNV = data

    });
  }
  openXacnhan(item: NVdangkyKTX) {
    this.selectNVdangky = item;
    this.getAllCapphatdodungKTXbyid(this.selectNVdangky.Nhanviendangkyid)
    this.getAllCapphatphongKTXbyid(this.selectNVdangky.Nhanviendangkyid)
    this.GetDetailNVdangky = this.haha.filter(x => x.Nhanviendangkyid == item.Nhanviendangkyid)
    if (this.selectNVdangky.Sotienboithuong) {
      if (this.selectNVdangky.Sotienboithuong.indexOf(';')) {
        let tam = this.selectNVdangky.Sotienboithuong.split(';')
        if (tam) {
          let tong = 0
          for (let i = 0; i < tam.length; i++) {
            let t = tam[i].indexOf('(');

            if (t > 0) {
              let z = tam[i].slice(t + 1, tam[i].length - 1)
              tong += parseInt(z)
            }
          }
          this.selectNVdangky.Tongsotienboithuong = tong.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
      }
    }
    else {
      this.selectNVdangky.Tongsotienboithuong = null
    }
    let element: HTMLElement = document.getElementById('modalXacNhanShow') as HTMLElement;
    element.click();
  }
  onSubmitXacNhan() {
    if (this.selectNVdangky.Ghichu) {
      if (this.selectNVdangky.Tinhtrang == 'OUT' && this.selectNVdangky.Xacnhan == false) {
        if (this.getAllCapphatphong.length > 0 || this.getAllCapphatdodung.length > 0) {
          this.toaster.show('warning', 'Thất Bại!', 'Chưa trả đồ dùng, phòng');
          this.selectNVdangky.Ghichu = null
        } else {
          this.selectNVdangky.Xacnhan = true;
          this.selectNVdangky.Trangthai = true;
          this.selectNVdangky.Nguoixacnhan = this.FullName;
          this.selectNVdangky.Nguoixacnhanid = this.UserID
          this.selectNVdangky.Thoigianky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
          this._serviceQuytrinh.UpdateQuytrinh(this.selectNVdangky).subscribe();
          this._serviceNhanviendangky.UpdateNhanviendangky(this.selectNVdangky).subscribe()
          this.tesst();
        }
      } else {
        this.selectNVdangky.Xacnhan = true;
        this.selectNVdangky.Trangthai = true;
        this.selectNVdangky.Nguoixacnhan = this.FullName;
        this.selectNVdangky.Nguoixacnhanid = this.UserID
        this.selectNVdangky.Thoigianky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
        this._serviceQuytrinh.UpdateQuytrinh(this.selectNVdangky).subscribe();
        this._serviceNhanviendangky.UpdateNhanviendangky(this.selectNVdangky).subscribe()
        this.tesst();
      }
    }
    let element: HTMLElement = document.getElementById('modalXacNhanClose') as HTMLElement;
    element.click();
    this.getAllCapphatphongKTX()
    this.getAllCapphatdodungKTX()
  }
  OpenEditNVDK(item: NVdangkyKTX) {
    this.selectNVdangky = item;
  }
  onDeleteDK(item: NVdangkyKTX) {
    if (this.getAllCapphatphong.length > 0 || this.getAllCapphatdodung.length > 0) {
      this.toaster.show('warning', 'Thất Bại!', 'Chưa trả đồ dùng, phòng');
    } else {
      this._serviceNhanviendangky.DeleteNhanviendangky(item.Nhanviendangkyid).subscribe(data => {
        this.getAllNhanviendangky()
        this.selectNVdangky = new NVdangkyKTX();
        let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
        element.click();
      });
    }
  }
  onThoatDK() {
    this.selectNVdangky = new NVdangkyKTX();
    let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
    element.click();
  }
  openKhainhankhau(item: NVdangkyKTX) {
    this.selectNVdangky = item;
    this.getAllGDnhanvien(item.Khainhankhauid);
    this.getAllTSnhanvien(item.Khainhankhauid);
    let element: HTMLElement = document.getElementById('khainhankhauShow') as HTMLElement;
    element.click();
  }
  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      Khainhankhauid: '',
      Tuthangnamdenthangnam: '',
      Choo: '',
      Nghenghiepnoilamviec: ''
    }));
  }
  removeGroup(i: number) {
    const control = <FormArray>this.form.controls['credentials'];
    control.removeAt(i);
  }
  addCreds1() {
    const creds = this.form1.controls.credentials1 as FormArray;
    creds.push(this.fb.group({
      Khainhankhauid: '',
      Hoten: '',
      Namsinh: '',
      Quan_he: '',
      Nghe_nghiep: '',
      Choohiennay: ''
    }));
  }
  removeGroup1(i: number) {
    const control = <FormArray>this.form1.controls['credentials1'];
    control.removeAt(i);
  }
  AddTSnhanvien() {
    var control = <FormArray>this.form.get('credentials');
    if (control.controls[0].get('Tuthangnamdenthangnam').value && control.controls[0].get('Choo').value && control.controls[0].get('Nghenghiepnoilamviec').value) {
      for (let i = 0; i < control.length; i++) {
        control.controls[i].get('Khainhankhauid').setValue(this.selectNVdangky.Khainhankhauid);
      }
      var df = JSON.stringify(this.form.value);
      var json: any[] = JSON.parse(df);
      this._serviceTSnhanvien.AddTSnhanvien(Object.values(json)[0]).subscribe(data => {
        this.getAllTSnhanvien(this.selectNVdangky.Khainhankhauid)
        let element: HTMLElement = document.getElementById('childModal2Close') as HTMLElement;
        element.click();
        this.form.reset();
        for (let i = control.length; 0 <= i; i--) {
          control.removeAt(i)
        }
        for (let i = 0; i < 3; i++) {
          this.addCreds();
        }
      })
    }
    else {
      this.toaster.show('error', 'Thất Bại!', 'Cần nhập đầy đủ thông tin.');
    }
  }
  AddGDnhanvien() {
    var control = <FormArray>this.form1.get('credentials1');
    if (control.controls[0].get('Hoten').value && control.controls[0].get('Namsinh').value && control.controls[0].get('Quan_he').value && control.controls[0].get('Nghe_nghiep').value && control.controls[0].get('Choohiennay').value) {
      for (let i = 0; i < control.length; i++) {
        control.controls[i].get('Khainhankhauid').setValue(this.selectNVdangky.Khainhankhauid);
      }
      var df = JSON.stringify(this.form1.value);
      var json: any[] = JSON.parse(df);
      this._serviceGDnhanvien.AddGDnhanvien(Object.values(json)[0]).subscribe(data => {
        this.getAllGDnhanvien(this.selectNVdangky.Khainhankhauid)
        let element: HTMLElement = document.getElementById('childModal3Close') as HTMLElement;
        element.click();
        this.form1.reset();
        for (let i = control.length; 0 <= i; i--) {
          control.removeAt(i)
        }
        for (let i = 0; i < 3; i++) {
          this.addCreds1();
        }
      })
    } else {
      this.toaster.show('error', 'Thất Bại!', 'Cần nhập đầy đủ thông tin.');
    }
  }
  openDelTSNV(item: Tieusunhanvien) {
    this.selectTSNV = item;
    let element: HTMLElement = document.getElementById('childModal4Show') as HTMLElement;
    element.click();
  }
  openDelGDNV(item: Giadinhnhanvien) {
    this.selectGDNV = item
    let element: HTMLElement = document.getElementById('childModal5Show') as HTMLElement;
    element.click();
  }
  onDelTSNV(item: Tieusunhanvien) {
    this._serviceTSnhanvien.DeleteTSnhanvien(item.Tieusunhanvienid).subscribe(data => {
      this.getAllTSnhanvien(item.Khainhankhauid);
      this.selectTSNV = new Tieusunhanvien();
      let element: HTMLElement = document.getElementById('childModal4Hide') as HTMLElement;
      element.click();
    });
  }
  onDelGDNV(item: Giadinhnhanvien) {
    this._serviceGDnhanvien.DeleteGDnhanvien(item.Thanhphangiadinhnhanvienid).subscribe(data => {
      this.getAllGDnhanvien(item.Khainhankhauid);
      this.selectGDNV = new Giadinhnhanvien();
      let element: HTMLElement = document.getElementById('childModal5Hide') as HTMLElement;
      element.click();
    });
  }
  OpenEditTSnv(item: Tieusunhanvien) {
    this.selectTSNV = item;
    for (let i = 0; i < this.GetAllTSNV.length; i++) {
      if (this.GetAllTSNV[i].edittable == true) {
        this.GetAllTSNV[i].edittable = false
      }
    }
    item.edittable = !item.edittable

  }
  OpenEditGDnv(item: Giadinhnhanvien) {
    this.selectGDNV = item;
    for (let i = 0; i < this.GetAllGDNV.length; i++) {
      if (this.GetAllGDNV[i].edittable == true) {
        this.GetAllGDNV[i].edittable = false
      }
    }
    item.edittable = !item.edittable

  }
  OpenDeleteCapphatphong(item: Capphatphong) {
    this.selectCapphatphong = item
    let element: HTMLElement = document.getElementById('DeletechildModalCapphatphongShow') as HTMLElement;
    element.click();
  }
  onDeleteCapphatphong(item: Capphatphong) {
    this._serviceCapphatphong.DeleteCapphatphongktx(item.Nhanvien_nhanphongid).subscribe(data => {
      for (let i = 0; i < this.getAllCapphatphong.length; i++) {
        if (this.getAllCapphatphong[i].Nhanvien_nhanphongid == item.Nhanvien_nhanphongid) {
          this.getAllCapphatphong.splice(i, 1)
          for (let j = 0; j < this.getAllPhong.length; j++) {
            if (this.getAllPhong[j].Phongid == item.Nhanvien_nhanphongid) {
              this.getAllPhong[j].Controng += 1
              this.gettenphong = []
              this.Capphatphongchodoituong(this.selectNVdangky.Gioitinh,this.selectNVdangky.Loai)
              break;
            }
          }
        }
      }
    })
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].Nhanviendangkyid == item.Nhanviendangkyid) {
        this.GetAllNVdangky[i].Ophong = (parseInt(this.GetAllNVdangky[i].Ophong) - 1).toString()
        break
      }
    }
    let element: HTMLElement = document.getElementById('DeletechildModalCapphatphongClose') as HTMLElement;
    element.click();
  }
  OpenDeleteCapphatdodung(item: Capphatdodung) {
    this.LydoXoaCapphatdodung = 'true'
    this.selectCapphatdodung = item
    let element: HTMLElement = document.getElementById('DeletechildModalCapphatdodungShow') as HTMLElement;
    element.click();
  }
  onDeleteCapphatdodung(item: Capphatdodung) {
    if (this.LydoXoaCapphatdodung == 'true') {
      this._serviceCapphatdodung.DeleteCapphatdodungktx(item.Dodungcanhanid).subscribe(data => {
        for (let i = 0; i < this.getAllCapphatdodung.length; i++) {
          if (this.getAllCapphatdodung[i].Dodungcanhanid == item.Dodungcanhanid) {
            this.getAllCapphatdodung.splice(i, 1)
            for (let j = 0; j < this.getAllDodung.length; j++) {
              if (this.getAllDodung[j].Dodungid == item.Dodungid) {
                this.getAllDodung[j].Soluongdadung -= item.Soluong
                this.getAllDodung[j].Soluongchuadung += item.Soluong
                this._serviceTaisanktx.UpdateTaisanktx(this.getAllDodung[j]).subscribe()
                break
              }
            }
            break
          }
        }
        let element: HTMLElement = document.getElementById('DeletechildModalCapphatdodungClose') as HTMLElement;
        element.click();
      })
    } else {
      if (this.selectNVdangky.Sotienboithuong == null) {
        this.selectNVdangky.Sotienboithuong = item.Tendodung + '(' + parseFloat(item.Trigia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")) * item.Soluong + ');'
        let tam = this.selectNVdangky.Sotienboithuong.split(';')
        let tong = 0
        for (let i = 0; i < tam.length; i++) {
          let t = tam[i].indexOf('(');

          if (t > 0) {
            let z = tam[i].slice(t + 1, tam[i].length - 1)
            tong += parseInt(z)
          }
        }
        this.selectNVdangky.Tongsotienboithuong = tong.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      } else {
        this.selectNVdangky.Sotienboithuong += item.Tendodung + '(' + parseFloat(item.Trigia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")) * item.Soluong + ');'
        let tam = this.selectNVdangky.Sotienboithuong.split(';')
        let tong = 0
        for (let i = 0; i < tam.length; i++) {
          let t = tam[i].indexOf('(');

          if (t > 0) {
            let z = tam[i].slice(t + 1, tam[i].length - 1)
            tong += parseInt(z)
          }
        }
        this.selectNVdangky.Tongsotienboithuong = tong.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      for (let i = 0; i < this.GetAllNVdangky.length; i++) {
        if (this.GetAllNVdangky[i].Nhanviendangkyid == this.selectNVdangky.Nhanviendangkyid) {
          this.GetAllNVdangky[i] = this.selectNVdangky
          this._serviceNhanviendangky.UpdateNhanviendangky(this.GetAllNVdangky[i]).subscribe()
          break;
        }
      }
      this._serviceCapphatdodung.DeleteCapphatdodungktx(item.Dodungcanhanid).subscribe(data => {
        for (let i = 0; i < this.getAllCapphatdodung.length; i++) {
          if (this.getAllCapphatdodung[i].Dodungcanhanid == item.Dodungcanhanid) {
            this.getAllCapphatdodung.splice(i, 1)
            for (let j = 0; j < this.getAllDodung.length; j++) {
              if (this.getAllDodung[j].Dodungid == item.Dodungid) {
                let baotaisan = new Baophetaisanktx();
                baotaisan.Dodungid = item.Dodungid
                baotaisan.MaNVL = this.getAllDodung[j].MaNVL
                baotaisan.Masododung = this.getAllDodung[j].Masododung
                baotaisan.Masododung = this.getAllDodung[j].Tendodung
                baotaisan.Truocbaophe = this.getAllDodung[j].Soluongtong
                baotaisan.Saubaophe = this.getAllDodung[j].Soluongtong - item.Soluong
                baotaisan.Soluong = item.Soluong
                baotaisan.Ghichu = 'Nhân viên bồi thường'
                baotaisan.Nguoitaoid = this.UserID
                baotaisan.Nguoitao = this.FullName
                this._serviceBaophetaisanktx.AddBaophetaisanktx(baotaisan).subscribe(data => {
                  this.getAllDodung[j].Soluongtong -= item.Soluong
                  this.getAllDodung[j].Soluongdadung -= item.Soluong
                  this.getAllDodung[j].Soluongchuadung = this.getAllDodung[j].Soluongtong - this.getAllDodung[j].Soluongdadung
                  this._serviceTaisanktx.UpdateTaisanktx(this.getAllDodung[j]).subscribe()
                })

                break
              }
            }
            break
          }
        }
        let element: HTMLElement = document.getElementById('DeletechildModalCapphatdodungClose') as HTMLElement;
        element.click();
      })
    }
  }
  onEventLydoXoaCapphatdodung(lydo: string) {
    this.LydoXoaCapphatdodung = lydo
  }
  getColor(z): string {
    if (this.tam === z) {
      return 'bold';
    }
  }
  openSelect(item: NVdangkyKTX, i) {
    
      const tbody = document.getElementById(i);
      this.tam = i;
      for (let i = 0; i < this.GetAllNVdangky.length; i++) {
        if (this.GetAllNVdangky[i].Nhanviendangkyid === item.Nhanviendangkyid) {
          this.GetAllNVdangky[i].edittable = !this.GetAllNVdangky[i].edittable
          if (this.GetAllNVdangky[i].edittable == true) {
            this.renderer.setStyle(tbody, 'background-color', '#67aefabb');
          }
          else {
            this.renderer.removeStyle(tbody, 'background-color');
          }
        }
      }
    
   
  }
  MultipleApprove() {
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable === true) {
        for (let j = 0; j < this.getAllPhong.length; j++) {

          if (this.getAllPhong[j].Gioitinh == this.GetAllNVdangky[i].Gioitinh&&this.getAllPhong[j].Trangthai==true&&this.GetAllNVdangky[i].Loai==this.getAllPhong[j].Loai) {
            let Congiuong = this.getAllCapphatphong1.filter(x => x.Phongid == this.getAllPhong[j].Phongid).length
            let checknhanvien = this.getAllCapphatphong1.filter(x => x.Nhanviendangkyid == this.GetAllNVdangky[i].Nhanviendangkyid).length
            let songuoio = this.getAllPhong[j].So_nguoi_o
            if (Congiuong < songuoio&&checknhanvien == 0) {
                let nhanviennhanphong = new Capphatphong()
                nhanviennhanphong.Phongid = this.getAllPhong[j].Phongid
                nhanviennhanphong.Nhanviendangkyid = this.GetAllNVdangky[i].Nhanviendangkyid
                nhanviennhanphong.Hoten = this.GetAllNVdangky[i].Hotenkhaisinh
                nhanviennhanphong.Manhanvien = this.GetAllNVdangky[i].Manhanvien
                nhanviennhanphong.Tenphong = this.getAllPhong[j].Tenphong
                nhanviennhanphong.Nguoitaoid = this.UserID
                nhanviennhanphong.Nguoitao = this.FullName
                this.getAllCapphatphong1.push(nhanviennhanphong)
                this._serviceCapphatphong.AddCapphatphongktx(nhanviennhanphong).subscribe(data=>{
                 // this.GetAllNVdangky[i].Ophong=(parseInt(this.GetAllNVdangky[i].Ophong)+1).toString()
                })
                
              }
          }
        }
      }
    }
    let phanloaihangtieuhao = this.getAllDodung.filter(x => x.Phanloai == false&&x.Trangthai==true)
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable === true) {
        for (let j = 0; j < phanloaihangtieuhao.length; j++) {
          let checknhanviennhantaisan = this.getAllCapphatdodung1.filter(x => x.Nhanviendangkyid == this.GetAllNVdangky[i].Nhanviendangkyid && x.Dodungid == phanloaihangtieuhao[j].Dodungid).length
          let checksoluongchuadung
          checksoluongchuadung= this.getAllDodung.find(y=>y.Dodungid==phanloaihangtieuhao[j].Dodungid)
            if(checksoluongchuadung.Soluongchuadung>0){
              if (checknhanviennhantaisan == 0){
                let nhanviennhantaisan = new Capphatdodung()
                nhanviennhantaisan.Dodungid = phanloaihangtieuhao[j].Dodungid
                nhanviennhantaisan.Nhanviendangkyid = this.GetAllNVdangky[i].Nhanviendangkyid
                nhanviennhantaisan.Tendodung = phanloaihangtieuhao[j].Tendodung
                nhanviennhantaisan.Soluong = 1
                nhanviennhantaisan.Trigia = phanloaihangtieuhao[j].Trigia
                nhanviennhantaisan.Nguoitaoid = this.UserID
                nhanviennhantaisan.Nguoitao = this.FullName
                this.getAllCapphatdodung1.push(nhanviennhantaisan)
                for (let z = 0; z < this.getAllDodung.length; z++) {
                  if (this.getAllDodung[z].Dodungid == nhanviennhantaisan.Dodungid) {
                    this.getAllDodung[z].Soluongdadung +=1 
                    this.getAllDodung[z].Soluongchuadung -=1 
                    this._serviceTaisanktx.UpdateTaisanktx(this.getAllDodung[z]).subscribe()
                  }
                }
                this._serviceCapphatdodung.AddCapphatdodungktx(nhanviennhantaisan).subscribe()
              }
             
            }
            else{
              this.toaster.show('error', 'Thất Bại!', 'Số lượng '+checksoluongchuadung.Tendodung+' đã hết!');
            }
        }

      }
    }
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable == true) {
        if (this.GetAllNVdangky[i].Tinhtrang == 'IN' && this.GetAllNVdangky[i].Xacnhan == false){
          this.GetAllNVdangky[i].Ghichu= this.ghichuDuyet.nativeElement.value
          this.GetAllNVdangky[i].Xacnhan = true;
          this.GetAllNVdangky[i].Trangthai = true;
          this.GetAllNVdangky[i].Nguoixacnhan = this.FullName;
          this.GetAllNVdangky[i].Nguoixacnhanid = this.UserID
          this.GetAllNVdangky[i].Thoigianky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
          this._serviceQuytrinh.UpdateQuytrinh(this.GetAllNVdangky[i]).subscribe();
          this._serviceNhanviendangky.UpdateNhanviendangky(this.GetAllNVdangky[i]).subscribe()
         
        }
       
        this.GetAllNVdangky[i].edittable = false
        let CountTam = i;
        if (CountTam < this.pageSize) {
          const tbody = document.getElementById(CountTam.toString());
          this.renderer.removeStyle(tbody, 'background-color');
        } else {
          while (CountTam > 0) {
            CountTam = CountTam - this.pageSize;
            if (0 < CountTam && CountTam < this.pageSize) {
              const tbody = document.getElementById(CountTam.toString());
              this.renderer.removeStyle(tbody, 'background-color');
            }
          }
        }
      }
    }
    this.tesst();
  }
  ClearOnSelect() {
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable === true) {
        this.GetAllNVdangky[i].edittable = false
      }
    }
  }
  XNduyet(noidung){
    let checkselect:boolean=false
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable === true) {
        checkselect=true
        break
      }
    }
    if(checkselect==true)
    {
      if(noidung)
      {
        this.MultipleApprove()
        let element: HTMLElement = document.getElementById('XacnhanduyetClose') as HTMLElement;
        element.click();
        this.ghichuDuyet.nativeElement.value = null;
      }
      else
      {
        this.toaster.show('error', 'Thất Bại!', 'Chưa nhập nội dung!');
      }
    }else
    {
      let element: HTMLElement = document.getElementById('XacnhanduyetClose') as HTMLElement;
      element.click();
      this.toaster.show('error', 'Thất Bại!', 'Chưa có dòng lựa chọn!');
    }
     
  }
  Uploadfilenhanviendangky(ev){
    let workBook = null;
    let jsonData = null;
    const file = ev.target.files[0];
    const reader = new FileReader();
    let checkfiletype=ev.target.files[0].name.split(".").pop()
    if(checkfiletype=='xlsx'||checkfiletype=='xls')
    {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
           initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.ListNVdangky = []
       for(let i=0;i<jsonData['Sheet1'].length;i++){
         this.selectNVdangky =new NVdangkyKTX()
         this.selectNVdangky.Manhanvien=jsonData['Sheet1'][i]['Manhanvien']
         this.selectNVdangky.Hotenkhaisinh=jsonData['Sheet1'][i]['Hotenkhaisinh']
         this.selectNVdangky.Gioitinh =jsonData['Sheet1'][i]['Gioitinh']
         this.selectNVdangky.Cmt=jsonData['Sheet1'][i]['Cmt']
         this.selectNVdangky.ngaycap_cmt=jsonData['Sheet1'][i]['ngaycap_cmt']
         this.selectNVdangky.noicap_cmt=jsonData['Sheet1'][i]['noicap_cmt']
         this.selectNVdangky.Ngaysinh=jsonData['Sheet1'][i]['Ngaysinh']
         this.selectNVdangky.Noisinh=jsonData['Sheet1'][i]['Noisinh']
         this.selectNVdangky.Sodidong=jsonData['Sheet1'][i]['Sodidong']
         this.selectNVdangky.Phong=jsonData['Sheet1'][i]['Phong']
         this.selectNVdangky.Ban=jsonData['Sheet1'][i]['Ban']
         this.selectNVdangky.Congdoan=jsonData['Sheet1'][i]['Congdoan']
         this.selectNVdangky.Capbac=jsonData['Sheet1'][i]['Capbac']
         this.selectNVdangky.Lydodangky=jsonData['Sheet1'][i]['Lydodangky']
         let checksolangianhap=this.haha.filter(x=>x.Manhanvien==this.selectNVdangky.Manhanvien)
         let langianhap = []
          for(let j=0;j<checksolangianhap.length;j++)
          {
            langianhap.push(checksolangianhap[j].Solan_gianhap)    
          }
          let Maxlangianhap = Math.max.apply(null, langianhap)
          if (Maxlangianhap > 0) {
            this.selectNVdangky.Solan_gianhap = Maxlangianhap + 1
          }
          else {
            this.selectNVdangky.Solan_gianhap = 1
          }
         if (parseInt( this.selectNVdangky.Capbac) <= 3) {
          this.selectNVdangky.Doituong = 'Công Nhân'
          this.selectNVdangky.Loai = 3
        }
        else if (parseInt( this.selectNVdangky.Capbac) > 3 && parseInt( this.selectNVdangky.Capbac) < 7) {
          this.selectNVdangky.Doituong = 'Nhân Viên'
          this.selectNVdangky.Loai = 2
        }
        else {
          this.selectNVdangky.Doituong = 'Chuyên Gia'
          this.selectNVdangky.Loai = 1
        }
        this.ListNVdangky.push(this.selectNVdangky)
       }
       //console.log(this.ListNVdangky)

       this._serviceNhanviendangky.AddNhanviendangkylist(this.ListNVdangky).subscribe(data => {
         let list=[]
         for(let i=0;i<data.length;i++)
         {
          let Log_nhanvien = 
            {
              "STT":null,
              "Manhanvien":data[i]['Manhanvien'],
              "Hotenkhaisinh":data[i]['Hotenkhaisinh'],
              "Gioitinh":data[i]['Gioitinh'],
              "Cmt":data[i]['Cmt'],
              "ngaycap_cmt":data[i]['ngaycap_cmt'],
              "noicap_cmt":data[i]['noicap_cmt'],
              "Ngaysinh":data[i]['Ngaysinh'],
              "Noisinh":data[i]['Noisinh'],
              "Phong":data[i]['Phong'],
              "Ban":data[i]['Ban'],
              "Congdoan":data[i]['Congdoan'],
              "Capbac":data[i]['Capbac'],
              "Sodidong":data[i]['Sodidong'],
              "Lydodangky":data[i]['Lydodangky']
            }
           list.push(Log_nhanvien)
         }
         this._serviceExcel.exportAsExcelFile(list,'Danh sách Import Lỗi')
        this.ListNVdangky = []
        this.getAllCapphatphongKTX()
        this.getAllCapphatdodungKTX()
        this.getAllNhanviendangky()
        this.toaster.show('success', 'Thông báo!', 'Đã có thêm dữ liệu mới!');
      })
      }
      reader.readAsBinaryString(file);
    }else
    {
      this.toaster.show('error', 'Thất Bại!', 'Vui lòng input file excel!');
    }
  
  }
  lammoi(){
    this.toaster.subject.next(null)
    this.getAllCapphatphongKTX()
    this.getAllCapphatdodungKTX()
    this.getAllNhanviendangky();
    this.getAllPhongKTX()
    this.getAllDodungKTX()
  }
  ExportFormNVdangky(){
    this._serviceExcel.exportAsExcelFileNVdangky()
  }
  ExportFormNVdanglamviec(){
    this._serviceExcel.exportAsExcelFileNVdanglamviecdangky()
  }
  Danhsachsapphong(){
    let dssapphong=[]
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable == true) {
             for(let j=0;j<this.getAllCapphatphong1.length;j++)
             {
                if(this.GetAllNVdangky[i].Manhanvien==this.getAllCapphatphong1[j].Manhanvien)
                {
                  let ds = 
                  {
                    "Manhanvien":this.getAllCapphatphong1[j].Manhanvien,
                    "Hoten":this.getAllCapphatphong1[j].Hoten,
                    "Tenphong":this.getAllCapphatphong1[j].Tenphong,
                    "Ghichu":this.getAllCapphatphong1[j].Ghichu
                  }
                  dssapphong.push(ds)
                  
                }
             }
             this.GetAllNVdangky[i].edittable=false
             let CountTam = i;
             if (CountTam < this.pageSize) {
               const tbody = document.getElementById(CountTam.toString());
               this.renderer.removeStyle(tbody, 'background-color');
             } else {
               while (CountTam > 0) {
                 CountTam = CountTam - this.pageSize;
                 if (0 < CountTam && CountTam < this.pageSize) {
                   const tbody = document.getElementById(CountTam.toString());
                   this.renderer.removeStyle(tbody, 'background-color');
                 }
               }
             }
      }
    }
    if(dssapphong.length>0)
    {
      this._serviceExcel.exportAsExcelFile(dssapphong,'Danh sách Sắp Phòng')
    }else
    {
      this.toaster.show('error', 'Thất Bại!', 'Nhân viên chưa được sắp phòng!');
    }
  }
  Uploadfilenhanviendanglamviec(ev){
    let workBook = null;
    let jsonData = null;
    const file = ev.target.files[0];
    const reader = new FileReader();
    let checkfiletype=ev.target.files[0].name.split(".").pop()
    if(checkfiletype=='xlsx'||checkfiletype=='xls')
    {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
           initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.ListNVdangky=[]
         for(let i=0;i<jsonData['Sheet1'].length;i++)
         {
          this.ListNVdangky.push(this.GetTTNV1(jsonData['Sheet1'][i]['Manhanvien']))
         }
         this._serviceNhanviendangky.AddNhanviendangky(this.ListNVdangky).subscribe(data => {
          this.ListNVdangky = []
          this.getAllNhanviendangky()
        })
       
      }
      reader.readAsBinaryString(file);
    }else
    {
      this.toaster.show('error', 'Thất Bại!', 'Vui lòng input file excel!');
    }
  }
}
