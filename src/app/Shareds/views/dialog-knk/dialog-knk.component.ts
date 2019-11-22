import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dialog-knk',
  templateUrl: './dialog-knk.component.html',
  styleUrls: ['./dialog-knk.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.6, .6, .6)' }),
        animate(100)
      ])
    ])
  ]
})
export class DialogKnkComponent implements OnInit {

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
