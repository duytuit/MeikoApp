import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NhanviendangkyService } from 'src/app/Shareds/services/KTX-service/nhanviendangky.service';
import { ToasterService } from 'src/app/Shareds/services/toaster.service';
import { NgForm, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NVdangkyKTX } from 'src/app/Shareds/models/KTX-model/NVdangky';
import { formatDate } from '@angular/common';
import { TieusunhanvienService } from 'src/app/Shareds/services/KTX-service/tieusunhanvien.service';
import { ThanhphangiadinhnhanvienService } from 'src/app/Shareds/services/KTX-service/thanhphangiadinhnhanvien.service';
import { Tieusunhanvien } from 'src/app/Shareds/models/KTX-model/Tsnhanvien';
import { Giadinhnhanvien } from 'src/app/Shareds/models/KTX-model/Gdnhanvien';
import { QuytrinhvaoraService } from 'src/app/Shareds/services/KTX-service/quytrinhvaora.service';
import { PhongktxService } from 'src/app/Shareds/services/KTX-service/phongktx.service';
import { TaisanktxService } from 'src/app/Shareds/services/KTX-service/taisanktx.service';
import { Phongktx } from 'src/app/Shareds/models/KTX-model/Phongktx';
import { Taisanktx } from 'src/app/Shareds/models/KTX-model/taisanktx';
import { CapphatdodungService } from 'src/app/Shareds/services/KTX-service/capphatdodung.service';
import { CapphatphongService } from 'src/app/Shareds/services/KTX-service/capphatphong.service';
import { Capphatdodung } from 'src/app/Shareds/models/KTX-model/capphatdodung';
import { Capphatphong } from 'src/app/Shareds/models/KTX-model/capphatphong';

@Component({
  selector: 'app-nhanviendangkygianhap',
  templateUrl: './nhanviendangkygianhap.component.html',
  styleUrls: ['./nhanviendangkygianhap.component.css']
})
export class NhanviendangkygianhapComponent implements OnInit {
  @Input() zIndex: number = 1000000000;
  getthongtinnhanvien
  getphong
  getban
  congdoan
  loai
  Tinhtrang
  haha
  LydoXoaCapphatdodung
  gettenphong = []
  gettendodung = []
  selectNVdangky = new NVdangkyKTX();
  selectGDNV = new Giadinhnhanvien();
  selectTSNV = new Tieusunhanvien();
  GetAllNVdangky: NVdangkyKTX[] = [];
  ListNVdangky: NVdangkyKTX[] = [];
  GetAllGDNV: Giadinhnhanvien[];
  GetAllTSNV: Tieusunhanvien[];
  getAllPhong: Phongktx[];
  getAllDodung: Taisanktx[]
  getAllCapphatdodung: Capphatdodung[]
  selectCapphatdodung = new Capphatdodung()
  GetDetailNVdangky: NVdangkyKTX[];
  getAllCapphatphong: Capphatphong[]
  selectCapphatphong = new Capphatphong()
  form: FormGroup;
  form1: FormGroup;
  formCapphatphong: FormGroup;
  formCapphatdodung: FormGroup;
  FullName: string = sessionStorage.getItem('Fullname');
  UserID: string = sessionStorage.getItem('Userid');
  @ViewChild('MaIDNV') MaIDNV: ElementRef;
  constructor(private fb: FormBuilder,
    private _serviceNhanviendangky: NhanviendangkyService,
    private toaster: ToasterService,
    private _serviceGDnhanvien: ThanhphangiadinhnhanvienService,
    private _serviceTSnhanvien: TieusunhanvienService,
    private _serviceQuytrinh: QuytrinhvaoraService,
    private _servicePhongktx: PhongktxService,
    private _serviceTaisanktx: TaisanktxService,
    private _serviceCapphatdodung: CapphatdodungService,
    private _serviceCapphatphong: CapphatphongService,
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
  }
  addCredsCapphatphong() {
    const credsCapphatphong = this.formCapphatphong.controls.credentialsCapphatphong as FormArray;
    credsCapphatphong.push(this.fb.group({
      Phongid: '',
      Tenphong: '',
      Ghichu: '',
      Nhanviendangkyid: ''
    }));
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
      Ghichu: ['',],
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
    this.getAllNhanviendangky();
    this.getAllPhongKTX()
    this.getAllDodungKTX()
  }
  getAllPhongKTX() {
    this._servicePhongktx.GetPhongktx().subscribe(data => {
      this.getAllPhong = data;
      for (let i = 0; i < data.length; i++) {
        this.gettenphong.push(data[i]['Tenphong'])
      }
    })
  }
  getAllDodungKTX() {
    this._serviceTaisanktx.GetTaisanktx().subscribe(data => {
      this.getAllDodung = data
      for (let i = 0; i < data.length; i++) {
        this.gettendodung.push(data[i]['Tendodung'])
      }
    })
  }
  getAllCapphatdodungKTX(nhanviendangkyid: string) {
    this._serviceCapphatdodung.GetCapphatdodungktx(nhanviendangkyid).subscribe(data => {
      this.getAllCapphatdodung = data
    })
  }
  getAllCapphatphongKTX(nhanviendangkyid: string) {
    this._serviceCapphatphong.GetCapphatphongktx(nhanviendangkyid).subscribe(data => {
      this.getAllCapphatphong = data
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
          if(capphatdodung[i]['Soluong']>0){
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
              this.getAllCapphatdodungKTX(this.selectNVdangky.Nhanviendangkyid)
            })
          }else
          {
            this.toaster.show('warning', 'Thông báo!', 'Số lượng > 0');
          }
         
        } else {
          this.toaster.show('warning', 'Thông báo!', 'Trong kho không còn ' + capphatdodung[i]['Tendodung'], 20000);
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
  async GetTTNV(value: string) {
    this.selectNVdangky = new NVdangkyKTX();
    this.getthongtinnhanvien = await this._serviceNhanviendangky.GetTTNV(value)
    if (this.getthongtinnhanvien) {
      this.toaster.show('success', 'Thành Công!');
      this.selectNVdangky.Hoten = this.getthongtinnhanvien['hodem'] + ' ' + this.getthongtinnhanvien['ten']
      this.selectNVdangky.Hotenkhaisinh = this.getthongtinnhanvien['hodem'] + ' ' + this.getthongtinnhanvien['ten']
      this.selectNVdangky.Capbac = this.getthongtinnhanvien['chucvu']
      this.selectNVdangky.Cmt = this.getthongtinnhanvien['cmtnd_so']
      let capbac = 3
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
      for (let i = 0; i < this.GetAllNVdangky.length; i++) {
        if (this.GetAllNVdangky[i].Manhanvien == value) {
          langianhap.push(this.GetAllNVdangky[i].Solan_gianhap)
        }
      }
      let Maxlangianhap = Math.max.apply(null, langianhap)
      if (Maxlangianhap > 0) {
        this.selectNVdangky.Solan_gianhap = Maxlangianhap + 1
      }
      else {
        this.selectNVdangky.Solan_gianhap = 1
      }
      this.selectNVdangky.Manhanvien = this.getthongtinnhanvien['manhansu']
      this.selectNVdangky.Sodidong = this.getthongtinnhanvien['dienthoai_didong']
      this.selectNVdangky.Sonharieng = this.getthongtinnhanvien['dienthoai_nharieng']
      this.selectNVdangky.Gioitinh = this.getthongtinnhanvien['gioitinh']
      this.selectNVdangky.Ngaysinh = formatDate(this.getthongtinnhanvien['ngaysinh'], 'dd-MM-yyyy', 'en-US')
      this.selectNVdangky.Noisinh = this.getthongtinnhanvien['noisinh']
      this.selectNVdangky.Quequan = this.getthongtinnhanvien['diachitamtru']
      this.selectNVdangky.noicap_cmt = this.getthongtinnhanvien['cmtnd_noicap']
      this.selectNVdangky.ngaycap_cmt = formatDate(this.getthongtinnhanvien['cmtnd_ngayhethan'], 'dd-MM-yyyy', 'en-US')
      this.selectNVdangky.Noithuongtru = this.getthongtinnhanvien['diachithuongtru']

      if (this.getthongtinnhanvien['phong_id']) {
        this.getphong = await this._serviceNhanviendangky.GetTTNV_dept(this.getthongtinnhanvien['phong_id'])
        this.selectNVdangky.Phong = this.getphong['bophan_ten']
      }
      if (this.getthongtinnhanvien['ban_id']) {
        this.getban = await this._serviceNhanviendangky.GetTTNV_dept(this.getthongtinnhanvien['ban_id'])
        this.selectNVdangky.Ban = this.getban['bophan_ten']
      }
      if (this.getthongtinnhanvien['congdoan_id']) {
        this.congdoan = await this._serviceNhanviendangky.GetTTNV_dept(this.getthongtinnhanvien['congdoan_id'])
        this.selectNVdangky.Congdoan = this.congdoan['bophan_ten']
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
  onSubmit(item: NVdangkyKTX) {

    if (item.Lydodangky && item.Somayle) {
      if (item.edittable == false) {
        this.ListNVdangky.push(item)
        this._serviceNhanviendangky.AddNhanviendangky(this.ListNVdangky).subscribe(data => {
          this.ListNVdangky = []
          this.getAllNhanviendangky();
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
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
  }
  tesst() {
    this.GetAllNVdangky = this.haha.filter(x => x.Tinhtrang == 'IN');
    let GetOUT = this.haha.filter(x => x.Tinhtrang == 'OUT');

    for (let x = 0; x < this.GetAllNVdangky.length; x++) {
      for (let y = 0; y < GetOUT.length; y++) {
        if (this.GetAllNVdangky[x].Xacnhan == true && this.GetAllNVdangky[x].Nhanviendangkyid == GetOUT[y].Nhanviendangkyid) {
          this.GetAllNVdangky.splice(x, 1)
          GetOUT[y].Trangthai = true;
          this.GetAllNVdangky.push(GetOUT[y])
        }
      }
    }
  }
  getAllNhanviendangky() {
    this._serviceNhanviendangky.GetNhanviendangky().subscribe(data => {
      this.haha = data;
      this.tesst()
      this.GetAllNVdangky = data.filter(x => x.Tinhtrang == 'IN');
      let GetOUT = data.filter(x => x.Tinhtrang == 'OUT');
      for (let x = 0; x < this.GetAllNVdangky.length; x++) {
        for (let y = 0; y < GetOUT.length; y++) {
          if (this.GetAllNVdangky[x].Xacnhan == true && this.GetAllNVdangky[x].Nhanviendangkyid == GetOUT[y].Nhanviendangkyid) {
            this.GetAllNVdangky.splice(x, 1)
            this.GetAllNVdangky.push(GetOUT[y])
          }
        }
      }
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
    this.getAllCapphatdodungKTX(this.selectNVdangky.Nhanviendangkyid)
    this.getAllCapphatphongKTX(this.selectNVdangky.Nhanviendangkyid)
    this.GetDetailNVdangky = this.haha.filter(x => x.Nhanviendangkyid == item.Nhanviendangkyid)
    let element: HTMLElement = document.getElementById('modalXacNhanShow') as HTMLElement;
    element.click();
  }
  onSubmitXacNhan() {
    this.selectNVdangky.Xacnhan = true;
    this.selectNVdangky.Trangthai = true;
    this.selectNVdangky.Nguoixacnhan = this.FullName;
    this.selectNVdangky.Nguoixacnhanid = this.UserID
    this.selectNVdangky.Thoigianky = formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US');
    this._serviceQuytrinh.UpdateQuytrinh(this.selectNVdangky).subscribe();
    this._serviceNhanviendangky.UpdateNhanviendangky(this.selectNVdangky).subscribe()
    this.tesst();
    let element: HTMLElement = document.getElementById('modalXacNhanClose') as HTMLElement;
    element.click();
  }
  OpenEditNVDK(item: NVdangkyKTX) {
    this.selectNVdangky = item;
  }
  onDeleteDK(item: NVdangkyKTX) {
    this._serviceNhanviendangky.DeleteNhanviendangky(item.Nhanviendangkyid).subscribe(data => {
      this.getAllNhanviendangky();
      this.selectNVdangky = new NVdangkyKTX();
      let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
      element.click();
    });
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
                this.getAllDodung[j].Soluongdadung -=  item.Soluong
                this.getAllDodung[j].Soluongchuadung +=  item.Soluong
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
        this.selectNVdangky.Sotienboithuong = item.Tendodung + '(' +parseFloat(item.Trigia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ""))*item.Soluong + ');'
        let tam =this.selectNVdangky.Sotienboithuong.split('(').toString().split(');')
        let tong=0
        for(let i=0;i<tam.length;i++)
        {
             if(parseInt(tam[i])%2==0)
             {
                 tong+=parseInt(tam[i])
             }
        }
        this.selectNVdangky.Tongsotienboithuong=tong.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        console.log(this.selectNVdangky.Tongsotienboithuong)
      } else {
        this.selectNVdangky.Sotienboithuong += item.Tendodung + '(' + parseFloat(item.Trigia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ""))*item.Soluong + ');'
        let tam =this.selectNVdangky.Sotienboithuong.split('(').toString().split(');')
        let tong=0
        for(let i=0;i<tam.length;i++)
        {
             if(parseInt(tam[i])%2==0)
             {
                 tong+=parseInt(tam[i])
             }
        }
        this.selectNVdangky.Tongsotienboithuong=tong.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        console.log(this.selectNVdangky.Tongsotienboithuong)
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
                this.getAllDodung[j].Soluongtong -= item.Soluong
                this.getAllDodung[j].Soluongdadung -=  item.Soluong
                this.getAllDodung[j].Soluongchuadung -=  item.Soluong
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
    }
  }
  onEventLydoXoaCapphatdodung(lydo: string) {
    this.LydoXoaCapphatdodung = lydo
  }
}
