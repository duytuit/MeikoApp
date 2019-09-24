import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ExcelService } from 'src/app/Shareds/services/excel.service';
import { ThongkeloiService } from 'src/app/Shareds/services/thongkeloi.service';
import { thongke1 } from 'src/app/Shareds/models/thongkeloi';
import { GroupService } from 'src/app/Shareds/services/group.service';
import { group } from 'src/app/Shareds/models/group';

@Component({
  selector: 'app-thongke-ma5',
  templateUrl: './thongke-ma5.component.html',
  styleUrls: ['./thongke-ma5.component.css']
})
export class ThongkeMA5Component implements OnInit {
  pageIndex: number;
  pageSize: number;
  count: number;
  countds: number;
  getthongkeloi: thongke1[];
  Fgetthongkeloi: thongke1[];
  tam: number;
  pageIndexds: number;
  pageSizeds: number;

  showDialog: boolean = true;
  @ViewChild('fromdate') fromdate: ElementRef;
  @ViewChild('todate') todate: ElementRef;
  trangthai: string = 'null';
  getGroup: thongke1[];
  FgetGroup: thongke1[];
  getallGroup:group[];
  viewthongke: thongke1;
  constructor(private serviceThongkeMa5: ThongkeloiService, private excelService: ExcelService,private serviceGroup:GroupService,) {
    this.pageIndex = 0;
    this.pageSize = 19;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }

  getColor(z): string {
    if (this.tam === z) {
      return 'bold';
    }
  }
  _listFilterYeuCau: string;
  get listFilterYeuCau(): string {
    return this._listFilterYeuCau;
  }
  set listFilterYeuCau(value: string) {
    this._listFilterYeuCau = value;
    this.FgetGroup = this.listFilterYeuCau ? this.PerformFilterYeuCau(this.listFilterYeuCau) : this.getGroup;
    this.countds = this.FgetGroup.length;
  }
  PerformFilterYeuCau(filterBy: string): thongke1[] {
    filterBy = filterBy.toLowerCase();
    return this.getGroup.filter((MA5: thongke1) =>
    MA5.Groupid.toLowerCase().indexOf(filterBy) !== -1);
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
  ThongkeloiFilterMahang(filterByMahang: string): thongke1[] {
    if (filterByMahang) {
      return this.Fgetthongkeloi.filter((MA5: thongke1) =>
      MA5.Mahang.toLowerCase().indexOf(filterByMahang.toLowerCase()) !== -1);
    }
  }
  ThongkeloiFilterMaLot(filterByMalot: string): thongke1[] {
    if (filterByMalot) {
      return this.Fgetthongkeloi.filter((MA5: thongke1) =>
      MA5.Malot.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
    }
  }
  getAllgroup() {
    this.serviceGroup.GetGroup().subscribe(data => {
      this.getallGroup = data;
    });
  }
  ngOnInit() {
    this.viewthongke=null;
    this.getAllgroup();
  }
  onSelect() {
    this.getthongkeloi = null;
    this.Fgetthongkeloi = this.getthongkeloi;
    this.count = 0;
  }
  lammoi() {
    this.fromdate.nativeElement.value = '';
    this.todate.nativeElement.value = '';
    this.Fgetthongkeloi=null;
    this.FgetGroup=null;
    this.getthongkeloi=null;
    this.getGroup=null;
    this.count=null;
    this.countds=null;
  }
  refresh(): void {
    this.fromdate.nativeElement.value = '';
    this.todate.nativeElement.value = '';
    this.Fgetthongkeloi = null;
    this.FgetGroup = null;
    this.getthongkeloi = null;
    this.getGroup = null;
    this.count = null;
    this.countds = null;
  }
  exportAsXLSX() {
    if (this.Fgetthongkeloi.length > 1) {
      this.excelService.exportAsExcelFile(this.Fgetthongkeloi, 'Danh sách thống kê lỗi');
    }

  }
  SelectGroupID(item: thongke1, i) {
    this.tam = i;
    this.Fgetthongkeloi = this.getthongkeloi;
    this.Fgetthongkeloi = item.Groupid ? this.ThongKeLoiFilterGroupID(item.Groupid) : this.getthongkeloi;
    this.count = this.Fgetthongkeloi.length;
  }
  ThongKeLoiFilterGroupID(GroupID: string): thongke1[] {
    if (GroupID) {
      return this.Fgetthongkeloi.filter((MA5: thongke1) =>
      MA5.Groupid.toLowerCase().indexOf(GroupID.toLowerCase()) !== -1);
    }
  }
  onMouseEnter(item: thongke1) {
    this.showDialog = false;
    this.viewthongke = item
  }
  onMouseEnterClose() {
    this.showDialog = true;
  }
  @HostListener('document:click', ['$event'])
  onClickEvent() {
    this.showDialog = true;
  }
  GetThongKeMa5Bydate(fromdate: string, todate: string): void {
    if (fromdate && todate) {
      this.serviceThongkeMa5.GetThongKeMa5(fromdate, todate, this.trangthai).subscribe(data => {
        this.getGroup = data.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.Groupid === thing.Groupid)) === i;
        });
        this.FgetGroup = this.getGroup
        this.countds = this.FgetGroup.length
        this.getthongkeloi = data;
        this.Fgetthongkeloi = this.getthongkeloi;
        this.count = this.Fgetthongkeloi.length;
        let GroupRow:group;
        let dodai:string;
        let tyle:string;
         for(let i=0;i<this.FgetGroup.length;i++)
         {
           GroupRow = this.getallGroup.find(x=>x.Groupid==this.FgetGroup[i].Groupid)
           if(GroupRow!=null){
             dodai=(GroupRow.Hoanthanh/GroupRow.Tongnhomky*100).toString();
             tyle=GroupRow.Hoanthanh+'/'+GroupRow.Tongnhomky;
             this.FgetGroup[i].Hoanthanh=dodai+'%';
             if(GroupRow.Hoanthanh!=0)
             {
               this.FgetGroup[i].Tongnhomky=tyle;
             }else
             {
               this.FgetGroup[i].Tongnhomky=null;
             }
            
           } 
         }
      });
    }

  }
  onSeach(trangthai: string) {
    this.trangthai = trangthai;
  }
 
}
