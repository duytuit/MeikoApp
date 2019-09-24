import { Component, OnInit, Input } from '@angular/core';
import { danhmuc } from 'src/app/Shareds/models/danhmuc';
import { DanhmucService } from 'src/app/Shareds/services/danhmuc.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TrinhkyService } from 'src/app/Shareds/services/trinhky.service';
import { NhomkyService } from 'src/app/Shareds/services/nhomky.service';
import { nhomky } from 'src/app/Shareds/models/nhomky';
import { trinhky } from 'src/app/Shareds/models/trinhky';

@Component({
  selector: 'app-trinhky',
  templateUrl: './trinhky.component.html',
  styleUrls: ['./trinhky.component.css']
})
export class TrinhkyComponent implements OnInit {
  
  @Input() zIndex: number = 1000000000;
  
  trangthai:string;
  getdanhmuc:danhmuc[];
  getnhomky:nhomky[];
  gettrinhky:trinhky[];
  Fgettrinhky:trinhky[];
  iddanhmuc:string
  tendanhmuc:string
  idnhomky:string
  tennhomky:string
  idtendanhmuc:string
  idtennhomky:string
  idtrinhky:string
  kieutrinhky:string
  ghichu:string
  pageIndex: number;
  pageSize: number;
  count: number;

  constructor(private servicedanhmuc:DanhmucService,private servicetrinhky:TrinhkyService,private servicenhomky:NhomkyService) { 
    this.pageIndex=0;
    this.pageSize=19;
  }

  ngOnInit() {
    this.getAlltrinhky();
    this.getAlldanhmuc();
    this.getAllnhomky();
  }
  addtrinhky = new FormGroup(
    {
      Trinhky_id :new FormControl(),
      Nhomky_id :new FormControl(),
      Tennhomky :new FormControl(),
      Danhmucid:new FormControl(),
      Tendanhmuc :new FormControl(),
      Kieutrinhky :new FormControl(),
      Ngaytao :new FormControl(),
      Ngaycapnhap :new FormControl(),
      Ghichu :new FormControl(),
      Trangthai:new FormControl(),
    }
  );
  getAlldanhmuc() {
    this.servicedanhmuc.GetDanhMuc().subscribe(data => {
      this.getdanhmuc = data;
    });
  }
  getAlltrinhky() {
    this.servicetrinhky.GetTrinhKy().subscribe(data => {
      this.gettrinhky = data;
      this.Fgettrinhky=this.gettrinhky;
      this.count=this.Fgettrinhky.length;
    });
  }
  getAllnhomky() {
    this.servicenhomky.GetNhom().subscribe(data => {
      this.getnhomky = data;
    });
  }
  onSubmit() {
      this.servicetrinhky.AddTrinhKy(this.addtrinhky.value).subscribe(data=>{
        this.getAlltrinhky();
        this.close();
        this.addtrinhky.reset();
      }); 
  }
  lammoi(){
    this.getAlldanhmuc();
    this.getAllnhomky();
    this.getAlltrinhky();
  }
  close(){
      let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
      element.click();
  }
  openDelete(item:trinhky){
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
    this.idtrinhky=item.Trinhky_id;
    this.tennhomky=item.Tennhomky;
    this.tendanhmuc=item.Tendanhmuc;
  }
  onDeleteTrinhky(idtrinhky:string){
    if (idtrinhky != null) {
      this.servicetrinhky.DeleteTrinhKy(idtrinhky).subscribe(data => {
        this.lammoi();
      });
      let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
      element.click();
    }
  }
  modalopen(Trinhky:trinhky) {
    this.kieutrinhky=Trinhky.Kieutrinhky;
    this.ghichu=Trinhky.Ghichu;
    this.iddanhmuc=Trinhky.Danhmucid;
    this.tendanhmuc=Trinhky.Tendanhmuc;
    this.idnhomky=Trinhky.Nhomky_id;
    this.tennhomky=Trinhky.Tennhomky;
    this.idtennhomky=this.idnhomky+'+'+this.tennhomky
    this.idtendanhmuc=this.iddanhmuc+'+'+this.tendanhmuc
    if(Trinhky.Trangthai==true)
    {
       this.trangthai='true';
    }else
    {
      this.trangthai='false';
    }
    for (let i = 0; i < this.getdanhmuc.length; i++) {
      if (this.getdanhmuc[i].edittable == true) {
        this.getdanhmuc[i].edittable = false
      }
    }
    Trinhky.edittable = !Trinhky.edittable;
  }
  modalclose(Trinhky:trinhky) {
    Trinhky.edittable = !Trinhky.edittable;
    if (Trinhky.edittable == false) {
      Trinhky.Danhmucid = this.iddanhmuc;
      Trinhky.Tendanhmuc=this.tendanhmuc;
      Trinhky.Nhomky_id = this.idnhomky;
      Trinhky.Tennhomky=this.tennhomky;
      if(this.trangthai=='true')
      {
        Trinhky.Trangthai=true;
      }else
      {
        Trinhky.Trangthai=false;
      }
    }
    this.servicetrinhky.UpdateTrinhKy(Trinhky).subscribe(data=>{
    this.getAlltrinhky();
    });
  }
  onEvent(trangthai:string){
     this.trangthai=trangthai;
  }
  onEventNhomKy(idnhomky:string){
    if (idnhomky == 'null') {
      this.addtrinhky.controls['Nhomky_id'].reset();
    }
    else {
      this.addtrinhky.controls['Nhomky_id'].reset(idnhomky.split('+')[0].trim());
      this.addtrinhky.controls['Tennhomky'].reset(idnhomky.split('+')[1].trim());
    }
  }
  onEventDanhMuc(iddanhmuc:string){
    if (iddanhmuc == 'null') {
      this.addtrinhky.controls['Danhmucid'].reset();
    }
    else {
      this.addtrinhky.controls['Danhmucid'].reset(iddanhmuc.split('+')[0].trim());
      this.addtrinhky.controls['Tendanhmuc'].reset(iddanhmuc.split('+')[1].trim());
    }
  }
}
