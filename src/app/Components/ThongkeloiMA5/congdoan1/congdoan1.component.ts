import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { quytrinh } from 'src/app/Shareds/models/quytrinh';
import { PartnoService } from 'src/app/Shareds/services/partno.service';
import { ThongtinkyService } from 'src/app/Shareds/services/thongtinky.service';
import { thongkeloi } from 'src/app/Shareds/models/thongkeloima5';
import { formatDate } from '@angular/common';
import { Thongkeloima5Service } from 'src/app/Shareds/services/thongkeloima5.service';
import { GroupService } from 'src/app/Shareds/services/group.service';
import { group } from 'src/app/Shareds/models/group';

@Component({
  selector: 'app-congdoan1',
  templateUrl: './congdoan1.component.html',
  styleUrls: ['./congdoan1.component.css']
})
export class Congdoan1Component implements OnInit {
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
  getthongkeloiRow:thongkeloi;
  mahang: string;
  malot: string;
  getGroup:group[];
  tam: number;
  daky: boolean;
  quytrinh: quytrinh;
  getquytrinh: quytrinh[];
  Fgetquytrinh: quytrinh[];
  chucnang: boolean = true;
  maykiemtra:string;
  banso:string;
  pageIndexds: number;
  pageSizeds: number;
  ghichunoidung:string;
  danhmuc_id: string = sessionStorage.getItem('Danhmucid');
  constructor(private fb: FormBuilder,private renderer: Renderer2,private serviceGroup:GroupService, private el: ElementRef, private servicethongkeloi: Thongkeloima5Service, private servicePartNo: PartnoService, private servicequytrinh: ThongtinkyService) {
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
  getArrayControls(){
    return (this.form.get('credentials') as FormArray).controls;
  }
  getAllthongkeloi() {
    let strtrinhky_id: string = sessionStorage.getItem('Trinhkyid');
    this.servicequytrinh.GetQuytrinhByIdTrinhky(strtrinhky_id).subscribe(data => {
      if (data.length > 0) {
        this.getquytrinh = data.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.Groupid === thing.Groupid)) === i;
        });
        this.Fgetquytrinh=this.getquytrinh
        this.countds = this.Fgetquytrinh.length;
        this.quytrinh = this.getquytrinh[0];
        this.servicethongkeloi.GetGroupThongKeLoi(this.getquytrinh[0].Groupid).subscribe(data1 => {
          if (data1.length > 0) {
            this.getthongkeloi = data1;
            this.Fgetthongkeloi=this.getthongkeloi;
            this.count = this.Fgetthongkeloi.length;
            this.tam = 0;
            this.daky = this.getquytrinh[0].Daky;
            if (this.daky == true) {
              this.chucnang = false
            } else
              this.chucnang = true
          }
          else {
            this.getthongkeloi = null;
            this.Fgetthongkeloi=this.getthongkeloi;
            this.count = 0;
          }
        });
       let GroupRow:group;
       let dodai:string;
       let tyle:string;
       //Xử lý hiển thị tên nhân viên 
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
      } else {
        this.getquytrinh = null;
        this.Fgetquytrinh=this.getquytrinh
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
  close() {
    let element: HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
  }
  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    
    creds.push(this.fb.group({
      Ca:'',
      Maykiemtra:'',
      Mahang :'',
      Malot :'',
      Banso :'',
      Thoigianbatdau:'',
      Thoigianketthuc:'',
      Loiphathien: '',
      OK :'',
      NG :'',
      Ghichu :'',
      Trangthai :'false'
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
  ngOnInit() {
    this.getAllgroup();
    this.servicePartNo.GetAllPartNo().subscribe(data => {
      this.GetAllPartNo = data;
    });
    this.getAllthongkeloi();
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
    var control = <FormArray>this.form.get('credentials');
    if(control.controls[0].get('Mahang').value&&control.controls[0].get('Malot').value)
    {
      let hour =formatDate(Date.now(),'HH', 'en-US');
      let ca;
      if(0<parseInt(hour)&&parseInt(hour)<20)
      {
         ca='Ngày'  
      }else
      {
        ca='Đêm'
      }
     
      for(let i=0;i<control.length;i++)
      {
        control.controls[i].get('Ca').setValue(ca);  
        control.controls[i].get('Maykiemtra').setValue(this.maykiemtra);  
        control.controls[i].get('Banso').setValue(this.banso);  
      }
      var df = JSON.stringify(this.form.value);
      var json: any[] = JSON.parse(df);
      this.servicethongkeloi.AddThongKeLoi(Object.values(json)[0],this.danhmuc_id).subscribe(data=>{
        this.getAllthongkeloi();
        this.close();
      })
    }
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
// getbackgroud(z):string{
//   if (this.tam === z) {
//     return '#364f6969';
//   }
// }
  onGroup(group: string,z) {
    if (group != null) {
      this.servicethongkeloi.GetGroupThongKeLoi(group).subscribe(data => {
        this.getthongkeloi = data;
        this.Fgetthongkeloi=this.getthongkeloi;
        this.count = this.Fgetthongkeloi.length;
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
  lammoi() {
    this.getAllgroup();
    this.getAllthongkeloi();
  }
  modalopen(Thongkeloi: thongkeloi, z: number) {
    this.mahang = Thongkeloi.Mahang;
    this.malot = Thongkeloi.Malot;
    this.getthongkeloiRow=Thongkeloi;
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
    Thongkeloi.edittable = !Thongkeloi.edittable;
    if (Thongkeloi.edittable == false) {
      Thongkeloi=this.getthongkeloiRow;
      Thongkeloi.Mahang = this.mahang;
      Thongkeloi.Malot = this.malot;
    }
    this.servicethongkeloi.UpdateThongKeLoi(Thongkeloi).subscribe()
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
    this.getthongkeloiRow=Thongkeloi;
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
  updatequytrinh(quytrinh: quytrinh) {
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
      this.servicequytrinh.UpdateQuytrinh(quytrinh).subscribe();
      let element: HTMLElement = document.getElementById('modalNoidungHide') as HTMLElement;
      element.click();
      this.daky = true;
      this.chucnang = false;
    } else {
      console.log('Bạn không thể hủy ký!')
    }

  }
  OpenUpdateQuytrinh(){
   this.getAllgroup();
    let element: HTMLElement = document.getElementById('modalNoidung') as HTMLElement;
    element.click();
  }
}
