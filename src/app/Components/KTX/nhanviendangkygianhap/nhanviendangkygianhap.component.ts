import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NhanviendangkyService } from 'src/app/Shareds/services/KTX-service/nhanviendangky.service';
import { ToasterService } from 'src/app/Shareds/services/toaster.service';
import { NgForm, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { NVdangkyKTX } from 'src/app/Shareds/models/KTX-model/NVdangky';
import { formatDate } from '@angular/common';
import { TieusunhanvienService } from 'src/app/Shareds/services/KTX-service/tieusunhanvien.service';
import { ThanhphangiadinhnhanvienService } from 'src/app/Shareds/services/KTX-service/thanhphangiadinhnhanvien.service';
import { Tieusunhanvien } from 'src/app/Shareds/models/KTX-model/Tsnhanvien';
import { Giadinhnhanvien } from 'src/app/Shareds/models/KTX-model/Gdnhanvien';
import { QuytrinhvaoraService } from 'src/app/Shareds/services/KTX-service/quytrinhvaora.service';

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
  selectNVdangky = new NVdangkyKTX();
  selectGDNV = new Giadinhnhanvien();
  selectTSNV = new Tieusunhanvien();
  GetAllNVdangky: NVdangkyKTX[] = [];
  ListNVdangky: NVdangkyKTX[] = [];
  GetAllGDNV: Giadinhnhanvien[];
  GetAllTSNV: Tieusunhanvien[];
  Tinhtrang
  haha
  form: FormGroup;
  form1: FormGroup;
  @ViewChild('MaIDNV') MaIDNV: ElementRef;
  constructor(private fb: FormBuilder, private _serviceNhanviendangky: NhanviendangkyService, private toaster: ToasterService, private _serviceGDnhanvien: ThanhphangiadinhnhanvienService, private _serviceTSnhanvien: TieusunhanvienService,private _serviceQuytrinh:QuytrinhvaoraService) {
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
    this.getAllNhanviendangky()
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
      this.selectNVdangky.Doituong = '4'
      this.selectNVdangky.Solan_gianhap = 3
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
    if (this.GetAllTSNV.length>0&&this.GetAllGDNV.length>0) {
      item.Hoanthanh =3;
    }
    else if(this.GetAllTSNV.length>0||this.GetAllGDNV.length>0)
    {
      item.Hoanthanh =2;
    }else
    {
      item.Hoanthanh =1;
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
        if (this.GetAllNVdangky[x].Xacnhan == true && this.GetAllNVdangky[x].Manhanvien == GetOUT[y].Manhanvien) {
          this.GetAllNVdangky.splice(x, 1)
          GetOUT[y].Trangthai=true;
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
          if (this.GetAllNVdangky[x].Xacnhan == true && this.GetAllNVdangky[x].Manhanvien == GetOUT[y].Manhanvien) {
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
    this.selectNVdangky=item;
    let element: HTMLElement = document.getElementById('modalXacNhanShow') as HTMLElement;
    element.click();
  }
  onSubmitXacNhan(){
    this.selectNVdangky.Xacnhan=true;
    this.selectNVdangky.Trangthai=true;
     this._serviceQuytrinh.UpdateQuytrinh(this.selectNVdangky).subscribe();
     this._serviceNhanviendangky.UpdateNhanviendangky(this.selectNVdangky).subscribe()
     this.tesst();
    let element: HTMLElement = document.getElementById('modalXacNhanClose') as HTMLElement;
    element.click();
  }
  OpenEditNVDK(item:NVdangkyKTX){
    this.selectNVdangky=item;
    for (let i = 0; i < this.GetAllNVdangky.length; i++) {
      if (this.GetAllNVdangky[i].edittable == true) {
        this.GetAllNVdangky[i].edittable = false
      }
    }
    item.edittable = !item.edittable
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
    else{
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
    }else
    {
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
}
