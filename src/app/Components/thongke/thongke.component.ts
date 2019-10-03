import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ExcelService } from 'src/app/Shareds/services/excel.service';
import { thongke } from 'src/app/Shareds/models/thongke';
import { ThongkeService } from 'src/app/Shareds/services/thongke.service';
import { GroupService } from 'src/app/Shareds/services/group.service';
import { group } from 'src/app/Shareds/models/group';
import * as FileSaver from 'file-saver';
import { FileService } from 'src/app/Shareds/services/file.service';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent implements OnInit {
  pageIndex: number;
  pageSize: number;
  count: number;
  pageIndexds: number;
  pageSizeds: number;
  countds: number;
  showDialog: boolean = true;
  @ViewChild('fromdate') fromdate: ElementRef;
  @ViewChild('todate') todate: ElementRef;
  viewthongke: thongke;
  getthongke: thongke[];
  Fgetthongke: thongke[];
  getGroup: thongke[];
  FgetGroup: thongke[];
  indexGroupID: string;
  trangthai: string = 'null';
  getallGroup: group[];
  constructor(private serviceThongke: ThongkeService, private serviceGroup: GroupService, private excelService: ExcelService,private servicefile: FileService) {
    this.pageIndex = 0;
    this.pageSize = 19;
    this.pageIndexds = 0;
    this.pageSizeds = 19;
  }
  GetThongKeBydate(fromdate: string, todate: string): void {
    if (fromdate && todate) {
      this.serviceThongke.GetThongKe(fromdate, todate, this.trangthai).subscribe(data => {
        this.getGroup = data.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.Groupid === thing.Groupid)) === i;
        });
        this.FgetGroup = this.getGroup
        this.countds = this.FgetGroup.length
        this.getthongke = data;
        this.Fgetthongke = this.getthongke;
        this.count = this.Fgetthongke.length
        let GroupRow: group;
        let dodai: string;
        let tyle: string;
        for (let i = 0; i < this.FgetGroup.length; i++) {
          GroupRow = this.getallGroup.find(x => x.Groupid == this.FgetGroup[i].Groupid)
          if (GroupRow != null) {
            dodai = (GroupRow.Hoanthanh / GroupRow.Tongnhomky * 100).toString();
            tyle = GroupRow.Hoanthanh + '/' + GroupRow.Tongnhomky;
            this.FgetGroup[i].Hoanthanh = dodai + '%';
            if (GroupRow.Hoanthanh != 0) {
              this.FgetGroup[i].Tongnhomky = tyle;
            } else {
              this.FgetGroup[i].Tongnhomky = null;
            }

          }
        }
      });
    }

  }
  onSeach(trangthai: string) {
    this.trangthai = trangthai;
  }
  getColor(z): string {
    if (this.indexGroupID === z) {
      return '#4b9bf1bb';
    }
  }
  getAllgroup() {
    this.serviceGroup.GetGroup().subscribe(data => {
      this.getallGroup = data;
    });
  }
  DownloadFile(tentep){
    this.servicefile.DownloadFile(tentep).subscribe((result: any) => {  
          if (result.type != 'text/plain') {  
            var blob = new Blob([result]);    
            FileSaver.saveAs(blob, tentep);  
          }}); 
  }
  SelectGroupID(item: thongke, i) {
    this.indexGroupID = i;
    this.Fgetthongke = this.getthongke;
    this.Fgetthongke = item.Groupid ? this.FluxFilterGroupID(item.Groupid) : this.getthongke;
    this.count = this.Fgetthongke.length;
  }
  onMouseEnter(item: thongke) {
    this.showDialog = false;
    this.viewthongke = item;
  }
  onMouseEnterClose() {
    this.showDialog = true;
  }
  @HostListener('document:click', ['$event'])
  onClickEvent(event: MouseEvent) {
    this.showDialog = true;
  }
  _listFilterXNQL: string;
  get listFilterXNQL(): string {
    return this._listFilterXNQL;
  }
  set listFilterXNQL(value: string) {
    this._listFilterXNQL = value;
    this.Fgetthongke = this.listFilterXNQL ? this.PerformFilterXNQL(this.listFilterXNQL) : this.getthongke;
    this.count = this.Fgetthongke.length;
  }
  PerformFilterXNQL(filterBy: string): thongke[] {
    filterBy = filterBy.toLowerCase();
    return this.getthongke.filter((Flux: thongke) =>
      Flux.Xacnhanql.toLowerCase().indexOf(filterBy) !== -1);
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
  PerformFilterYeuCau(filterBy: string): thongke[] {
    filterBy = filterBy.toLowerCase();
    return this.getGroup.filter((Flux: thongke) =>
      Flux.Groupid.toLowerCase().indexOf(filterBy) !== -1);
  }
  _listFilterXNPQ: string;
  get listFilterXNPQ(): string {
    return this._listFilterXNPQ;
  }
  set listFilterXNPQ(value: string) {
    this._listFilterXNPQ = value;
    this.Fgetthongke = this.listFilterXNPQ ? this.PerformFilterXNPQ(this.listFilterXNPQ) : this.getthongke;
    this.count = this.Fgetthongke.length;
  }
  PerformFilterXNPQ(filterBy: string): thongke[] {
    filterBy = filterBy.toLowerCase();
    return this.getthongke.filter((Flux: thongke) =>
      Flux.Xacnhanpq.toLowerCase().indexOf(filterBy) !== -1);
  }
  _listFilterMaHang: string;
  get listFilterMahang(): string {
    return this._listFilterMaHang;
  }
  set listFilterMahang(value: string) {
    this._listFilterMaHang = value;
    this.Fgetthongke = this.listFilterMahang ? this.FluxFilterMahang(this.listFilterMahang) : this.getthongke;
    this.count = this.Fgetthongke.length;
  }
  _listFilterMaLot: string;
  get listFilterMalot(): string {
    return this._listFilterMaLot;
  }
  set listFilterMalot(value: string) {
    this._listFilterMaLot = value;
    this.Fgetthongke = this.listFilterMalot ? this.FluxFilterMaLot(this.listFilterMalot) : this.getthongke;
    this.count = this.Fgetthongke.length;
  }
  FluxFilterMahang(filterByMahang: string): thongke[] {
    if (filterByMahang) {
      return this.Fgetthongke.filter((Flux: thongke) =>
        Flux.Mahang.toLowerCase().indexOf(filterByMahang.toLowerCase()) !== -1);
    }
  }
  FluxFilterMaLot(filterByMalot: string): thongke[] {
    if (filterByMalot) {
      return this.Fgetthongke.filter((Flux: thongke) =>
        Flux.Malot.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
    }
  }
  FluxFilterGroupID(filterByMalot: string): thongke[] {
    if (filterByMalot) {
      return this.Fgetthongke.filter((Flux: thongke) =>
        Flux.Groupid.toLowerCase().indexOf(filterByMalot.toLowerCase()) !== -1);
    }
  }
  refresh(): void {
    this.fromdate.nativeElement.value = '';
    this.todate.nativeElement.value = '';
    this.Fgetthongke = null;
    this.FgetGroup = null;
    this.getthongke = null;
    this.getGroup = null;
    this.count = null;
    this.countds = null;
  }
  ngOnInit() {
    this.getAllgroup();
    this.viewthongke = null;
  }
  exportAsXLSX() {
    if (this.Fgetthongke.length > 1) {
      this.excelService.exportAsExcelFile(this.Fgetthongke, 'Thống kê danh sách tái Flux');
    }

  }
}
