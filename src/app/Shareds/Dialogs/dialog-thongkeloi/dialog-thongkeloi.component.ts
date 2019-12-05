import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dialog-thongkeloi',
  templateUrl: './dialog-thongkeloi.component.html',
  styleUrls: ['./dialog-thongkeloi.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ opacity: '0.1' }),
        animate(1000)
      ]),
    ])
  ]
})
export class DialogThongkeloiComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
