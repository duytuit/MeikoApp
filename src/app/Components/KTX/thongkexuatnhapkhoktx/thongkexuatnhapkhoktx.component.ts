import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { Chart } from 'chart.js';
import { CapphatdodungService } from 'src/app/Shareds/services/KTX-service/capphatdodung.service';
import { TaisanktxService } from 'src/app/Shareds/services/KTX-service/taisanktx.service';
import { BaophetaisanktxService } from 'src/app/Shareds/services/KTX-service/baophetaisanktx.service';
import { NhaptaisanktxService } from 'src/app/Shareds/services/KTX-service/nhaptaisanktx.service';
import { Taisanktx } from 'src/app/Shareds/models/KTX-model/taisanktx';
import { Capphatdodung } from 'src/app/Shareds/models/KTX-model/capphatdodung';
import { Baophetaisanktx } from 'src/app/Shareds/models/KTX-model/baophetaisanktx';
import { Nhaptaisanktx } from 'src/app/Shareds/models/KTX-model/nhaptaisanktx';
import { DatasetsXN } from 'src/app/Shareds/models/KTX-model/datasetsxuatnhap';

@Component({
  selector: 'app-thongkexuatnhapkhoktx',
  templateUrl: './thongkexuatnhapkhoktx.component.html',
  styleUrls: ['./thongkexuatnhapkhoktx.component.css']
})
export class ThongkexuatnhapkhoktxComponent implements OnInit {
  colours = [ "#556b2f", "#faebd7", "#00ffff", "#7fffd4", "#00ced1",
    "#f5f5dc", "#ffe4c4", "#000000", "#ffebcd", "#0000ff", "#8a2be2", "#a52a2a", "#deb887",
    "#5f9ea0", "#7fff00", "#d2691e", "#ff7f50", "#6495ed", "#fff8dc", "#dc143c", "#00ffff",
    "#00008b", "#008b8b", "#b8860b", "#a9a9a9", "#006400", "#bdb76b", "#8b008b","#f0f8ff",
    "#ff8c00", "#9932cc", "#8b0000", "#e9967a", "#8fbc8f", "#483d8b", "#2f4f4f","#f0ffff",
    "#9400d3", "#ff1493", "#00bfff", "#696969", "#1e90ff",
    "#b22222", "#fffaf0", "#228b22", "#ff00ff",
    "#dcdcdc", "#f8f8ff", "#ffd700", "#daa520", "#808080", "#008000", "#adff2f",
    "#f0fff0", "#ff69b4",
    "#cd5c5c", "#4b0082", "#fffff0", "#f0e68c",
    "#e6e6fa", "#fff0f5", "#7cfc00", "#fffacd", "#add8e6", "#f08080", "#e0ffff", "#fafad2",
    "#d3d3d3", "#90ee90", "#ffb6c1", "#ffa07a", "#20b2aa", "#87cefa", "#778899", "#b0c4de",
    "#ffffe0", "#00ff00", "#32cd32", "#faf0e6",
    "#ff00ff", "#800000", "#66cdaa", "#0000cd", "#ba55d3", "#9370d8", "#3cb371", "#7b68ee",
    "#00fa9a", "#48d1cc", "#c71585", "#191970", "#f5fffa", "#ffe4e1", "#ffe4b5",
    "#ffdead", "#000080",
    "#fdf5e6", "#808000", "#6b8e23", "#ffa500", "#ff4500", "#da70d6",
    "#eee8aa", "#98fb98", "#afeeee", "#d87093", "#ffefd5", "#ffdab9", "#cd853f", "#ffc0cb", "#dda0dd", "#b0e0e6", "#800080",
    "#663399", "#ff0000", "#bc8f8f", "#4169e1",
    "#8b4513", "#fa8072", "#f4a460", "#2e8b57", "#fff5ee", "#a0522d", "#c0c0c0", "#87ceeb", "#6a5acd", "#708090", "#fffafa", "#00ff7f", "#4682b4",
    "#d2b48c", "#008080", "#d8bfd8", "#ff6347", "#40e0d0",
    "#ee82ee",
    "#f5deb3", "#ffffff", "#f5f5f5",
    "#ffff00", "#9acd32"];
  GetAllBaopheTaisanKTX: Baophetaisanktx[] = []
  GetAllNhapTaisanKTX: Nhaptaisanktx[] = []
  GetAllCapphattaisanKTX: Capphatdodung[] = []
  NewDataSet: DatasetsXN[] = []

  canvas: any;
  ctx: any;
  str: string = formatDate(Date.now(), 'yyyy', 'en-US');
  Count_Vao = []
  Count_Ra = []
  @ViewChild('mychart') mychart;
  constructor(
    private _serviceTaisanktx: TaisanktxService,
    private _serviceBaophetaisanktx: BaophetaisanktxService,
    private _serviceNhaptaisanktx: NhaptaisanktxService,
    private _serviceCapphatdodung: CapphatdodungService,

  ) { }

  ngOnInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.GetAllNhapTaisan()
    this.getAllCapphatdodungKTX()
    this.GetAllBaopheTaisan()
  }
 async ngAfterViewInit() {
    await new Promise(resolve => setTimeout(resolve, 300));
    new Chart(this.ctx, {
      type: 'bar',

      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: this.NewDataSet
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Thống kê xuất - nhập - báo phế kho ktx'
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          }
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }
async getAllCapphatdodungKTX() {
    this.GetAllCapphattaisanKTX= await this._serviceCapphatdodung.GetCapphatdodungktx()
    if ( this.GetAllCapphattaisanKTX.length > 0) {
      let tam = this.GetAllCapphattaisanKTX.filter((thing, i, arr) => {
        return arr.indexOf(arr.find(t => t.Dodungid === thing.Dodungid)) === i;
      });
      for (let b = 0; b < tam.length; b++) {

        let newdataset = new DatasetsXN()
        newdataset.label = 'Xuất ' + tam[b].Tendodung
        newdataset.backgroundColor = this.colours[b]
        newdataset.stack = 'Stack 1'
        let data1 = []
        for (let a = 1; a < 13; a++) {
          tam[b].Tongsoluong = 0
          if (this.GetAllCapphattaisanKTX.length > 0) {
            for (let c = this.GetAllCapphattaisanKTX.length - 1; 0 <= c; c--) {

              this.GetAllCapphattaisanKTX[c].Ngaycapnhap = parseInt(formatDate(new Date(this.GetAllCapphattaisanKTX[c].Ngaycapnhap), 'MM', 'en-US')).toString()
              if (a.toString() == this.GetAllCapphattaisanKTX[c].Ngaycapnhap && this.GetAllCapphattaisanKTX[c].Dodungid == tam[b].Dodungid) {
                tam[b].Tongsoluong += this.GetAllCapphattaisanKTX[c].Soluong
                this.GetAllCapphattaisanKTX.splice(c, 1)
              }
            }
          }
          data1.push(tam[b].Tongsoluong)
          newdataset.data = data1

        }
        this.NewDataSet.push(newdataset)
      }
     
    }
  }
async GetAllNhapTaisan() {

    this.GetAllNhapTaisanKTX=await this._serviceNhaptaisanktx.GetNhaptaisanktx1()
    if (this.GetAllNhapTaisanKTX.length > 0) {
      let tam = this.GetAllNhapTaisanKTX.filter((thing, i, arr) => {
        return arr.indexOf(arr.find(t => t.Dodungid === thing.Dodungid)) === i;
      });
      for (let b = 0; b < tam.length; b++) {

        let newdataset = new DatasetsXN()
        newdataset.label = 'Nhập ' + tam[b].Tendodung
        newdataset.backgroundColor = this.colours[b]
        newdataset.stack = 'Stack 0'
        let data1 = []
        for (let a = 1; a < 13; a++) {
          tam[b].Tongsoluong = 0
          if (this.GetAllNhapTaisanKTX.length > 0) {
            for (let c = this.GetAllNhapTaisanKTX.length - 1; 0 <= c; c--) {

              this.GetAllNhapTaisanKTX[c].Ngaycapnhap = parseInt(formatDate(new Date(this.GetAllNhapTaisanKTX[c].Ngaycapnhap), 'MM', 'en-US')).toString()
              if (a.toString() == this.GetAllNhapTaisanKTX[c].Ngaycapnhap && this.GetAllNhapTaisanKTX[c].Dodungid == tam[b].Dodungid) {
                tam[b].Tongsoluong += this.GetAllNhapTaisanKTX[c].Soluong
                this.GetAllNhapTaisanKTX.splice(c, 1)
              }
            }
          }
          data1.push(tam[b].Tongsoluong)
          newdataset.data = data1

        }
        this.NewDataSet.push(newdataset)
      }
     
    }
  }
 async GetAllBaopheTaisan() {
   
    this.GetAllBaopheTaisanKTX=await this._serviceBaophetaisanktx.GetBaophetaisanktx1()
    if ( this.GetAllBaopheTaisanKTX.length > 0) {
      let tam = this.GetAllBaopheTaisanKTX.filter((thing, i, arr) => {
        return arr.indexOf(arr.find(t => t.Dodungid === thing.Dodungid)) === i;
      });
      for (let b = 0; b < tam.length; b++) {

        let newdataset = new DatasetsXN()
        newdataset.label = 'Báo phế ' + tam[b].Tendodung
        newdataset.backgroundColor = this.colours[b]
        newdataset.stack = 'Stack 2'
        let data1 = []
        for (let a = 1; a < 13; a++) {
          tam[b].Tongsoluong = 0
          if (this.GetAllBaopheTaisanKTX.length > 0) {
            for (let c = this.GetAllBaopheTaisanKTX.length - 1; 0 <= c; c--) {

              this.GetAllBaopheTaisanKTX[c].Ngaycapnhap = parseInt(formatDate(new Date(this.GetAllBaopheTaisanKTX[c].Ngaycapnhap), 'MM', 'en-US')).toString()
              if (a.toString() == this.GetAllBaopheTaisanKTX[c].Ngaycapnhap && this.GetAllBaopheTaisanKTX[c].Dodungid == tam[b].Dodungid) {
                tam[b].Tongsoluong += this.GetAllBaopheTaisanKTX[c].Soluong
                this.GetAllBaopheTaisanKTX.splice(c, 1)
              }
            }
          }
          data1.push(tam[b].Tongsoluong)
          newdataset.data = data1

        }
        
        this.NewDataSet.push(newdataset)
      
      }
     
    }
  }
}
