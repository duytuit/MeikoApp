import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-show-popup',
  templateUrl: './show-popup.component.html',
  styleUrls: ['./show-popup.component.css']
})
export class ShowPopupComponent implements OnInit {

  private show = false;

  @Input() title: string;

  mousemoveEvent: any;
  mouseupEvent: any;

  firstPopupX: number = 100;
  firstPopupY: number = 100;
  firstPopupZ: number = 3;
  xStep: number = 30;
  yStep: number = 30;
  zStep: number = 3;
  curX: number;
  curY: number;
  curZIndex: number;
  xStartElementPoint: number;
  yStartElementPoint: number;
  xStartMousePoint: number;
  yStartMousePoint: number;
  fatherPopup:any;
  isMouseBtnOnPress: boolean;

  constructor(private elementRef: ElementRef,
      private renderer: Renderer2) {
      this.mouseup = this.unboundMouseup.bind(this);
      this.dragging = this.unboundDragging.bind(this);
  }

  appear() {
      //prevent drag event 
      document.getSelection().removeAllRanges();
      this.setPos();
      this.show = true;
  }

  disappear() {
    this.show = false;
  }

  setPos() {
      if (this.fatherPopup == undefined) {
          this.curX = this.firstPopupX;
          this.curY = this.firstPopupY;
          this.curZIndex = this.firstPopupZ;
      }
      else {
          this.curX = this.fatherPopup.curX + this.xStep;
          this.curY = this.fatherPopup.curY + this.yStep;
          this.curZIndex = this.fatherPopup.curZIndex + this.zStep;
      }
  }

  mouseup: (event: any) => void;
  unboundMouseup(event: any) {
      // Remove listeners
      this.mousemoveEvent();
      this.mouseupEvent();
  }

  mousedown(event: any) {
      if (event.button === 0/*only left mouse click*/) {
          this.xStartElementPoint = this.curX;
          this.yStartElementPoint = this.curY;
          this.xStartMousePoint = event.pageX;
          this.yStartMousePoint = event.pageY;

          // if listeners exist, first Remove listeners
          if (this.mousemoveEvent)
              this.mousemoveEvent();
          if (this.mouseupEvent)
              this.mouseupEvent();

          this.mousemoveEvent = this.renderer.listen("document", "mousemove", this.dragging);
          this.mouseupEvent = this.renderer.listen("document", "mouseup", this.mouseup);
      }
  }
  dragging: (event: any) => void;
  unboundDragging(event: any) {
      this.curX = this.xStartElementPoint + (event.pageX - this.xStartMousePoint);
      this.curY = this.yStartElementPoint + (event.pageY - this.yStartMousePoint);
  }

  ngOnInit() {
  }

}
