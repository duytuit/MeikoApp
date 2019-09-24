import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css']
})
export class ThongtinComponent implements OnInit {
  someDate: Date = new Date;
  constructor() { }

  ngOnInit() {
  }
  change() {
    alert(this.someDate);
  }
}
