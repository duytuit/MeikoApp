import { Component, OnInit, Input } from '@angular/core';
import { may } from 'src/app/Shareds/models/may';
import { FormGroup, FormControl } from '@angular/forms';
import { MayService } from 'src/app/Shareds/services/may.service';

@Component({
  selector: 'app-may',
  templateUrl: './may.component.html',
  styleUrls: ['./may.component.css']
})
export class MayComponent implements OnInit {
  @Input() zIndex: number = 1000000000;
  
  trangthai:string='trangthai';
  getmay:may[];
  idmay:string
  ghichu:string
  tenmay:string
  user_fullname:string=sessionStorage.getItem('Fullname');
  constructor(private servicemay:MayService) { }

  ngOnInit() {
    this.getAllmay();
  }
  addmay = new FormGroup(
    {
      Tenmay: new FormControl(),
      Ghichu: new FormControl(),
      Trangthai: new FormControl(),
    }
  );
  getAllmay() {
    this.servicemay.GetMay().subscribe(data => {
      this.getmay = data;
    });
  }
  onSubmit() {
    if(this.trangthai!=null&&this.trangthai!='trangthai')
    {
      if( this.addmay.controls['Tenmay'].value!=null)
      {
        this.servicemay.AddMay(this.addmay.value).subscribe(data=>{
          this.getAllmay();
          this.close();
          this.addmay.reset();
          this.trangthai='trangthai';
        }); 
      }
    }
  }
  lammoi(){
    this.getAllmay();
  }
  close(){
      let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
      element.click();
  }
  openDelete(item:may){
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
    this.idmay=item.May_id;
    this.tenmay=item.Tenmay;
    this.ghichu=item.Ghichu;
  }
  onDeleteMay(idmay:string){
    if (idmay != null) {
      this.servicemay.DeleteMay(idmay).subscribe(data => {
        this.lammoi();
      });
      let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
      element.click();
    }
  }
  modalopen(may:may) {
    this.tenmay=may.Tenmay;
    this.ghichu=may.Ghichu;
    if(may.Trangthai==true)
    {
       this.trangthai='true';
    }else
    {
      this.trangthai='false';
    }
    for (let i = 0; i < this.getmay.length; i++) {
      if (this.getmay[i].edittable == true) {
        this.getmay[i].edittable = false
      }
    }
     may.edittable = !may.edittable;
  }
  modalclose(may:may) {
    may.edittable = !may.edittable;
    if (may.edittable == false) {
      may.Tenmay = this.tenmay;
      may.Ghichu=this.ghichu;
      if(this.trangthai=='true')
      {
        may.Trangthai=true;
      }else
      {
        may.Trangthai=false;
      }
    }
    this.servicemay.UpdateMay(may).subscribe();
  }
  onEvent(trangthai:string){
     this.trangthai=trangthai;
     this.addmay.controls['Trangthai'].reset(trangthai);
  }
  ResetForm(){
    this.addmay.reset();
    this.trangthai='trangthai';
  }
}
