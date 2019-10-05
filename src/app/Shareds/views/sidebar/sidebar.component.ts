import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { phanquyen } from '../../models/phanquyen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // intervalId: number = 0;
  // message: string = '';
  // seconds: number = 11;
  @Input() Phanquyen: phanquyen[];

  @Output() LogOutClicked= new EventEmitter();

  @Output() LogOut1Clicked= new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
   
  }
  LogOut(){
   this.LogOutClicked.emit();
   this.router.navigate(['']);
  }
  LogOut1(){
    this.LogOut1Clicked.emit();
    this.router.navigate(['']);
   }
  //  ngOnDestroy() {
  //     this.clearTimer(); 
  //   }

  //  clearTimer(): void { 
  //    clearInterval(this.intervalId); 
  //   }
 
  //  start(): void { this.countDown(); }
  //  stop(): void {
  //    this.clearTimer();
  //    this.message = `${this.seconds}`;
  //  }
  
  //  private countDown(): void {
  //    this.clearTimer();
  //    this.intervalId = window.setInterval(() => {
  //      this.seconds -= 1;
  //      if (this.seconds === 0) {
  //        this.message = 'Blast off!';
  //      } else {
  //        if (this.seconds < 0)
  //         { this.seconds = 10; } // reset
  //        this.message = `${this.seconds}`;
  //      }
  //    }, 1000);
  //  }
  //  @HostListener('document:mouseup', ['$event'])
  // onMouseUp(event) {
  //   console.log(event);
  // }
  // @HostListener('document:mouseover', ['$event'])
  // mouseover(event) {
  //   console.log(event);
  // }

  // // event keyup

  // @HostListener('window:keyup.w', ['$event']) w(e: KeyboardEvent) {
  //   console.log('w captured', e);
  // }


  // @HostListener('window:keyup.Shift.w', ['$event']) sw(e: KeyboardEvent) {
  //   console.log('shift w captured', e);
  // }

  // @HostListener('window:keyup', ['$event']) keyUp(e: KeyboardEvent) {
  //   console.log('key up', e);
  // }

//   /**
//    * Mutating event and creating an event object instead of a keyboard event
//    * to avoid a webkit bug
//    * @see http://jsbin.com/kosanodeve/edit?html,js,output
//    * @see https://bugs.chromium.org/p/chromium/issues/detail?id=327853&
//    */
//   triggerKeyboardEvent(el: any, keyString: string) {
//     var eventObj = document.createEvent("Events") as any;
  
//     if(eventObj.initEvent){
//       eventObj.initEvent("keyup", true, true);
//     }

//     eventObj.shiftKey = true;
//     eventObj.ctrlKey = false;
//     eventObj.metaKey = false;
//     eventObj.altKey = false;
//     eventObj.key = keyString;
    
//     el.dispatchEvent ? 
//     el.dispatchEvent(eventObj) : 
//     el.fireEvent("onkeyup", eventObj); 
  
// } 


//   press(keyString: string) {
//     this.triggerKeyboardEvent(window, keyString);
//   }
}
