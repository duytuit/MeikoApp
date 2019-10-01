import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { thongkeloi } from 'src/app/Shareds/models/thongkeloima5';
import { formatDate } from '@angular/common';
import { FormArray, FormControl, ValidationErrors, FormBuilder, FormGroup } from '@angular/forms';
import { PartnoService } from 'src/app/Shareds/services/partno.service';
import { Thongkeloima5v1Service } from 'src/app/Shareds/services/thongkeloima5v1.service';
import { MayService } from 'src/app/Shareds/services/may.service';
import { may } from 'src/app/Shareds/models/may';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congdoan1-v1',
  templateUrl: './congdoan1-v1.component.html',
  styleUrls: ['./congdoan1-v1.component.css']
})
export class Congdoan1V1Component implements OnInit {
  @Input() zIndex: number = 1000000000;
  form: FormGroup;
  GetAllPartNo: any[];
  GetAllLotNo: any[];
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  getthongkeloi: thongkeloi[];
  Fgetthongkeloi: thongkeloi[];
  getngay: thongkeloi[];
  Fgetngay: thongkeloi[];
  getthongkeloiRow: thongkeloi;
  mahang: string;
  malot: string;
  tam: number;
  daky: boolean;
  chucnang: boolean = true;
  maykiemtra: string;
  banso: string;
  pageIndexds: number;
  pageSizeds: number;
  ghichunoidung: string;
  getmay:may[];
  user_fullname:string=sessionStorage.getItem('Fullname');
  danhmuc_id: string = sessionStorage.getItem('Danhmucid');
  user_id: string = sessionStorage.getItem('Userid');
  user_name: string = sessionStorage.getItem('Username');
  constructor(private router: Router,private fb: FormBuilder, private el: ElementRef, private servicethongkeloi: Thongkeloima5v1Service, private servicePartNo: PartnoService,private servicemay:MayService) {
    this.pageIndex = 0;
    this.pageSize = 15;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
    this.form = this.fb.group({
      credentials: this.fb.array([]),
    });
    for (let i = 0; i < 3; i++) {
      this.addCreds();
    }
  }
  getArrayControls() {
    return (this.form.get('credentials') as FormArray).controls;
  }
  getAllthongkeloi() {
    this.servicethongkeloi.GetGroupThongKeLoiByIdnguoikiemtra(this.user_id).subscribe(data1 => {
      if (data1.length > 0) {
        this.getngay = data1.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.Ngay === thing.Ngay)) === i
        });
        this.Fgetngay=this.getngay;
        this.countds=this.Fgetngay.length;
        this.getthongkeloi=data1;
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
  close() {
    let element: HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
  }
  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      Ca: '',
      Maykiemtra: '',
      Mahang: '',
      Malot: '',
      Banso: '',
      Thoigianbatdau: '',
      Thoigianketthuc: '',
      Loiphathien: '',
      OK: '',
      NG: '',
      Nguoikiemtra: '',
      Idnguoikiemtra: '',
      Nguoixacnhan: null,
      Idnguoixacnhan: null,
      Ghichu: '',
      Trangthai:'false'
    }));
  }
  private passwordValidator(control: FormControl): ValidationErrors {
    const value = control.value;
    // const hasNumber = /[0-9]/.test(value);
    // const hasCapitalLetter = /[A-Z]/.test(value);
    // const hasLowercaseLetter = /[a-z]/.test(value);
    const isLengthValid = value ? value.length > 7 : false;

    const passwordValid = isLengthValid;

    if (!passwordValid) {
      return { invalidPassword: 'số lượng kí tự phải lớn hơn 7' };
    }

    return null;
  }
  removeGroup(i: number) {
    const control = <FormArray>this.form.controls['credentials'];
    control.removeAt(i);
  }
  getAllmay() {
    this.servicemay.GetMay().subscribe(data => {
      this.getmay = data;
    });
  }
  ngOnInit() {
    this.servicePartNo.GetAllPartNo().subscribe(data => {
      this.GetAllPartNo = data;
    });
    this.getAllthongkeloi();
    this.getAllmay();
  }
  getTypeahead(event: string, i: number) {
      var control = <FormArray>this.form.get('credentials');
      control.controls[i].get('Mahang').setValue(event);
      if (event.split('(').length > 0) {
        this.servicePartNo.GetLotNoByPart(event.split('(')[0].trim()).subscribe(data => {
          this.GetAllLotNo = data
        });
      }
      else {
        this.servicePartNo.GetLotNoByPart(event.trim()).subscribe(data => {
          this.GetAllLotNo = data
        });
      }
    
  }
  getTypeahead1(event: string, i: number) {
      var control = <FormArray>this.form.get('credentials');
      control.controls[i].get('Malot').setValue(event);
  }
  onSubmit() {
    if(sessionStorage.getItem('Userid')!=null)
    {
      if(this.maykiemtra!=null&&this.maykiemtra!='tenmay')
      {
        var control = <FormArray>this.form.get('credentials');
        if (control.controls[0].get('Mahang').value && control.controls[0].get('Malot').value) {
          let hour = formatDate(Date.now(), 'HH', 'en-US');
          let ca;
          if (0 < parseInt(hour) && parseInt(hour) < 20) {
            ca = 'Ngày'
          } else {
            ca = 'Đêm'
          }
          for (let i = 0; i < control.length; i++) {
            control.controls[i].get('Ca').setValue(ca);
            control.controls[i].get('Maykiemtra').setValue(this.maykiemtra);
            control.controls[i].get('Banso').setValue(this.banso);
            control.controls[i].get('Idnguoikiemtra').setValue(this.user_id);
            control.controls[i].get('Nguoikiemtra').setValue(this.user_name);
          }
          var df = JSON.stringify(this.form.value);
          var json: any[] = JSON.parse(df);
          this.servicethongkeloi.AddThongKeLoi(Object.values(json)[0], this.danhmuc_id).subscribe(data => {
            this.getAllthongkeloi();
            this.form.reset();
            for(let i=0;i<control.length;i++)
            {
              control.removeAt(i)
            }
            for (let i = 0; i < 2; i++) {
              this.addCreds();
            }
          })
        }
      }
    }else
    {
      this.router.navigate(['']);
      this.refresh();
    }
  }
  refresh(): void {
    window.location.reload();
  }
  onEventParentID(tenmay){
     this.maykiemtra=tenmay;
  }
  onSelect() {
    this.Fgetthongkeloi = null;
    this.count = 0;
  }
  onGroup(ngay: string, z) {
    if (ngay != null) {
        this.Fgetthongkeloi = this.getthongkeloi.filter(x=>x.Ngay==ngay);
        this.count = this.Fgetthongkeloi.length;
    }
    this.tam = z;
  }
  lammoi() {
    this.getAllthongkeloi();
  }
  modalopen(Thongkeloi: thongkeloi, z: number) {
    this.mahang = Thongkeloi.Mahang;
    this.malot = Thongkeloi.Malot;
    this.getthongkeloiRow = Thongkeloi;
    this.maykiemtra=Thongkeloi.Maykiemtra;
    if (Thongkeloi.Mahang.split('(').length > 0) {
      this.servicePartNo.GetLotNoByPart(Thongkeloi.Mahang.split('(')[0].trim()).subscribe(data => {
        this.GetAllLotNo = data
      });
    }
    else {
      this.servicePartNo.GetLotNoByPart(Thongkeloi.Mahang.trim()).subscribe(data => {
        this.GetAllLotNo = data
      });
    }
    for (let i = 0; i < this.getthongkeloi.length; i++) {
      if (this.getthongkeloi[i].edittable == true) {
        this.getthongkeloi[i].edittable = false
      }
    }
    Thongkeloi.edittable = !Thongkeloi.edittable;
  }
  modalclose(Thongkeloi: thongkeloi, i: number) {
    if(this.maykiemtra!=null&&this.maykiemtra!='tenmay')
    {
      Thongkeloi.edittable = !Thongkeloi.edittable;
      if (Thongkeloi.edittable == false) {
        Thongkeloi = this.getthongkeloiRow;
        Thongkeloi.Mahang = this.mahang;
        Thongkeloi.Malot = this.malot;
        Thongkeloi.Maykiemtra=this.maykiemtra;
      }
      this.servicethongkeloi.UpdateThongKeLoi(Thongkeloi).subscribe()
    }
    
  }
  getMahang(event: string, Thongkeloi: thongkeloi) {
    this.mahang = event;
    Thongkeloi.Malot = null;
    if (event.split('(').length > 0) {
      this.servicePartNo.GetLotNoByPart(event.split('(')[0].trim()).subscribe(data => {
        this.GetAllLotNo = data
      });
    }
    else {
      this.servicePartNo.GetLotNoByPart(event.trim()).subscribe(data => {
        this.GetAllLotNo = data
      });
    }
  }
  getMalot(event: string) {
    this.malot = event;
  }
  openDelete(Thongkeloi: thongkeloi) {
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
    this.mahang = Thongkeloi.Mahang;
    this.malot = Thongkeloi.Malot;
    this.getthongkeloiRow = Thongkeloi;
  }
  onDeleteThongkeloi(idthongkeloi: string) {
    if (idthongkeloi != null) {
      this.servicethongkeloi.DeleteThongKeLoi(idthongkeloi).subscribe(data => {
        this.lammoi();
      });
      let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
      element.click();
    }
  }

}
