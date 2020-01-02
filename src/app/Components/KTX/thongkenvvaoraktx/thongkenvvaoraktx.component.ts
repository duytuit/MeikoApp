import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NVdangkyKTX } from 'src/app/Shareds/models/KTX-model/NVdangky';
import { NhanviendangkyService } from 'src/app/Shareds/services/KTX-service/nhanviendangky.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-thongkenvvaoraktx',
  templateUrl: './thongkenvvaoraktx.component.html',
  styleUrls: ['./thongkenvvaoraktx.component.css']
})
export class ThongkenvvaoraktxComponent implements OnInit {
  canvas: any;
  ctx: any;
  str: string = formatDate(Date.now(), 'yyyy', 'en-US');
  GetAllnhanviendangkyktx: NVdangkyKTX[]
  Count_Vao = []
  Count_Ra = []
  @ViewChild('mychart') mychart;

  constructor(private _serviceNhanviendangky: NhanviendangkyService, ) {

  }

  ngOnInit() {
    this.getAllNhanviendangky()
  }
  getAllNhanviendangky() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this._serviceNhanviendangky.GetNhanviendangky().subscribe(data => {
      this.GetAllnhanviendangkyktx = data;
      for (let i = 0; i < this.GetAllnhanviendangkyktx.length; i++) {
        if (this.GetAllnhanviendangkyktx[i].Thoigianky != null) {
          this.GetAllnhanviendangkyktx[i].Thoigianky = parseInt(formatDate(new Date(this.GetAllnhanviendangkyktx[i].Thoigianky), 'MM', 'en-US')).toString()
        }
      }
      for (let a = 1; a < 13; a++) {
        this.Count_Ra.push(this.GetAllnhanviendangkyktx.filter(x => x.Thoigianky == a.toString() && x.Xacnhan == true && x.Tinhtrang == 'OUT').length)
        this.Count_Vao.push(this.GetAllnhanviendangkyktx.filter(x => x.Thoigianky == a.toString() && x.Xacnhan == true && x.Tinhtrang == 'IN').length-this.GetAllnhanviendangkyktx.filter(x => x.Thoigianky == a.toString() && x.Xacnhan == true && x.Tinhtrang == 'OUT').length)

        new Chart(this.ctx, {
          type: 'bar',

          data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [{
              label: 'Vào',
              backgroundColor: "red",
              borderColor: "rgb(255, 99, 132)",
              fill: true,
              data: this.Count_Vao,
            },
            {
              label: 'Ra',
              backgroundColor: "green",
              borderColor: "rgb(255, 99, 132)",
              fill: true,
              data: this.Count_Ra,
            }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Thống kê nhân viên ra - vào ktx'
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    });

  }
}
