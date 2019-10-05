import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernhomService } from '../../services/usernhom.service';
import { usernhom } from '../../models/usernhom';
import { phanquyen } from '../../models/phanquyen';
import { PhanquyenService } from '../../services/phanquyen.service';
import { TrinhkyService } from '../../services/trinhky.service';
import { trinhky } from '../../models/trinhky';
import { UserService } from '../../services/user.service';
import { TimerService } from '../../services/timer.service';
import { timer } from '../../models/timer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// library.add(fas);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  intervalId: number = 0;
  message: string = '';
  seconds: number;
  // =========================
  showDropDown: boolean = false;
  showLogIn: boolean = false;
  showLogOut: boolean = false;
  getUserNhom: usernhom[];
  FgetUserNhom: usernhom[];
  getphanquyen: phanquyen[] = [];
  getall: phanquyen[] = [];
  MenuCha: phanquyen[] = [];
  pquyen: phanquyen;
  gettrinhky: trinhky[];
  main: boolean = true;
  flag: number;
  NameLogIn: string;
  messageBox: string;
  showChangePass: boolean = false;
  gettimer: timer;
  flagTimer: number;
  badge:boolean=false;
  opendropdown() {
    let dangnhap = sessionStorage.getItem('Userid');
    if (dangnhap == 'null') {
      this.showLogIn = true;
      this.showLogOut = false;
    } else {
      this.showLogOut =  !this.showLogOut;
      this.showLogIn = false;
    }

  }
  closedropdown() {
    this.showLogIn = false;
    this.showLogOut = false;
  }
  OpenChangePassword() {
    this.showChangePass = !this.showChangePass;
    this.messageBox = null;
  }
  formdata = new FormGroup({
    uname: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    passwd: new FormControl("")
  });
  formchangepass = new FormGroup({
    passwdOld: new FormControl(),
    passwdNew: new FormControl(),
    passwdChange: new FormControl()
  });
  showDialog: boolean
  constructor(private servicePhanQuyen: PhanquyenService, private router: Router, private serviceLogin: LoginService, private serviceUserNhom: UsernhomService, private servicetrinhky: TrinhkyService, private serviceUser: UserService, private serviceTimer: TimerService) {
    this.countDown();
    library.add(fas);
  }
  getAllTimer() {
    this.serviceTimer.GetTimer().subscribe(data => {
      if (data) {
        this.gettimer = data;
        this.flagTimer = this.gettimer.Trangthai;
        if (this.flagTimer == 1) {
          this.seconds = this.gettimer.Thoigiandangxuat;
        }
      }
    });
  }
  ngOnInit() {
    this.getAllTimer();
    this.getAllUserNhom();
    this.getAlltrinhky();
    sessionStorage.setItem('Danhmucid', null);
    sessionStorage.setItem('Username', null);
    sessionStorage.setItem('Userid', null);
    sessionStorage.setItem('Trinhkyid', null);
    sessionStorage.setItem('IdApp', null);
    sessionStorage.setItem('Fullname', null);
    this.router.navigate(['']);
  }
  getAlltrinhky() {
    this.servicetrinhky.GetTrinhKy().subscribe(data => {
      this.gettrinhky = data;
    });
  }
  onClickSubmit(data) {
    this.flagTimer=null;
    this.getAllTimer();
    let dataLogIn = [{
      "Manhanvien": data.uname,
      "password": data.passwd
    }]
    this.serviceLogin.LogIn(dataLogIn[0]).subscribe(data => {
      this.MenuCha = [];
      this.getall = [];
      let userid = data['UserLogin']
      this.flag = data['flag']
      if (userid != null) {
        if (this.flag == 2) {
          let listnhomkybyUser = this.getUserNhom.filter(data => data.Manhanvien == userid);
          this.FgetUserNhom = listnhomkybyUser;
          for (let i = 0; i < listnhomkybyUser.length; i++) {
            this.getAllPhanQuyenTree(listnhomkybyUser[i].Nhomky_id)
          }
          let ten = this.getUserNhom.find(data => data.Manhanvien == userid).Username;
          sessionStorage.setItem('Fullname', ten);
          let lengthName = ten.split(' ').length;
          this.NameLogIn = 'Xin Chào! ' + ten.split(' ')[lengthName - 1].trim();
          sessionStorage.setItem('Username', ten);
          sessionStorage.setItem('Userid', userid);
          sessionStorage.setItem('IdApp', data['IdUser']);
          this.badge=true;
        }
        if (this.flag == 1) {
          this.NameLogIn = 'Xin Chào! Admin';
          sessionStorage.setItem('Userid', userid);
          this.getAllPhanQuyenTree(this.getUserNhom[0].Nhomky_id);
        }

        this.formdata.reset()
      } else {
        this.formdata.reset();
      }

    });
    this.showDialog = !this.showDialog
  }
  onClickSubmitChangePass() {

    let passwdcu = this.formchangepass.controls['passwdOld'].value;
    let passwdmoi = this.formchangepass.controls['passwdNew'].value;
    let passwdthaydoi = this.formchangepass.controls['passwdChange'].value;
    let IdApp = sessionStorage.getItem('IdApp');
    let UserChangePass = [
      {
        "IdUser": IdApp,
        "passwordOld": passwdcu,
        "PasswordNew": passwdmoi
      }]
    if (passwdmoi == passwdthaydoi) {
      this.serviceUser.ChangePassword(UserChangePass[0]).subscribe(data => {
        if (data) {
          this.messageBox = data['messageBox']
          this.formchangepass.reset()
        }
        else {
          this.messageBox = null
          this.formchangepass.reset()
        }
      })

    } else
      this.messageBox = 'Nhập lại mật khẩu mới!'
    this.formchangepass.reset()
  }
  CallMainOpen(item: phanquyen) {
    if (this.flag == 2) {
      this.getall.push(this.MenuCha.find(x => x.quyenXem == true && x.Nhomky_id == item.Nhomky_id))
      let children = this.MenuCha.find(x => x.quyenXem == true && x.Nhomky_id == item.Nhomky_id).ListPhanquyen.filter(y => y.quyenXem == true && y.Nhomky_id == item.Nhomky_id)
      for (let i = 0; i < children.length; i++) {
        this.getall.push(children[i])
      }
      sessionStorage.setItem('Danhmucid', this.getall[0].Danhmucid);
      let gettrinhkyid = this.gettrinhky.find(x => x.Danhmucid == this.getall[0].Danhmucid && x.Nhomky_id == item.Nhomky_id);
      if (gettrinhkyid) {
        sessionStorage.setItem('Trinhkyid', gettrinhkyid.Trinhky_id);
      }
    }
    if (this.flag == 1) {
      this.getall = this.getphanquyen;
      this.MenuCha = this.getphanquyen.filter(x => x.Idcha == null);
    }
    this.main = false;
    this.router.navigate(['thongtin']);
  }
  LogOut() {
    this.showLogOut = false;
    this.showDropDown = false;
    this.CallMainClose();
  }
  LogOut1() {
    this.showLogOut = false;
    this.showDropDown = false;
    this.CallMainCloseLogOut();
  }
  CallMainClose() {
    this.router.navigate(['']);
    this.flagTimer=null;
    this.main = true;
    this.getall = [];
    // this.MenuCha = [];
    sessionStorage.setItem('Danhmucid', null);
    // sessionStorage.setItem('Username',null);
    // sessionStorage.setItem('Userid',null);
    sessionStorage.setItem('Trinhkyid', null);
    this.getAllTimer();
    this.getAllUserNhom();
  }
  CallMainCloseLogOut() {
    this.badge=false;
    this.router.navigate(['']);
    this.flagTimer=null;
    this.main = true;
    this.getall = [];
    this.MenuCha = [];
    sessionStorage.setItem('Fullname', null);
    sessionStorage.setItem('Danhmucid', null);
    sessionStorage.setItem('Username', null);
    sessionStorage.setItem('Userid', null);
    sessionStorage.setItem('Trinhkyid', null);
    sessionStorage.setItem('IdApp', null);
    this.NameLogIn = null;
    this.getAllUserNhom();
    this.getAllTimer();
  }
  getAllUserNhom() {
    this.serviceUserNhom.GetUserNhom().subscribe(data => {
      this.getUserNhom = data;
    });
  }
  getAllPhanQuyenTree(idnhomky: string) {
    this.servicePhanQuyen.GetPhanQuyen(idnhomky).subscribe(data => {
      this.getphanquyen = [];
      this.getAllPhanQuyen(data);
    });
  }
  getAllPhanQuyen(phanquyen: phanquyen[]) {
    for (let i = 0; i < phanquyen.length; i++) {
      this.getphanquyen.push(phanquyen[i]);
      if (phanquyen[i].ListPhanquyen.length > 0) {
        for (let j = 0; j < phanquyen[i].ListPhanquyen.length; j++) {
          this.getphanquyen.push(phanquyen[i].ListPhanquyen[j]);
          if (phanquyen[i].ListPhanquyen[j].ListPhanquyen.length > 0) {
            this.getAllPhanQuyen(phanquyen[i].ListPhanquyen[j].ListPhanquyen);
          }
        }
      }
    }
    //Xử lý đăng nhập ở đây
    if (this.flag == 2) {
      // this.getall = this.getphanquyen.filter(x => x.quyenXem == true);
      this.MenuCha.push(this.getphanquyen.find(x => x.quyenXem == true && x.Idcha == null));
    }
    else if (this.flag == 1) {
      this.getall = this.getphanquyen;
      this.MenuCha = this.getphanquyen.filter(x => x.Idcha == null);
    } else {
      this.CallMainCloseLogOut()
    }
  }

  // Event LogOut

  ngOnDestroy() {
    this.clearTimer();
  }

  clearTimer(): void {
    clearInterval(this.intervalId);
  }

  start(): void { this.countDown(); }
  stop(): void {
    this.clearTimer();
    this.message = `${this.seconds}`;
  }
  private countDown(): void {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        // đăng xuất ở đây.
        this.CallMainCloseLogOut();
      }
      //  else {
      //    if (this.seconds < 0)
      //     {
      //       // this.seconds = 20; 
      //      } // reset
      //  }
    }, 1000);
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event) {
    if (this.flagTimer == 1) {
      this.seconds = this.gettimer.Thoigiandangxuat;
    }
   // this.showLogOut=false;
  }
  @HostListener('document:mouseover', ['$event'])
  mouseover(event) {
    if (this.flagTimer == 1) {
      this.seconds = this.gettimer.Thoigiandangxuat;
    }
  }
  // event keyup

  // @HostListener('window:keyup.w', ['$event']) w(e: KeyboardEvent) {
  //   this.seconds = 20; 
  // }


  // @HostListener('window:keyup.Shift.w', ['$event']) sw(e: KeyboardEvent) {
  //   this.seconds = 20; 
  // }

  @HostListener('window:keyup', ['$event']) keyUp(e: KeyboardEvent) {
    if (this.flagTimer == 1) {
      this.seconds = this.gettimer.Thoigiandangxuat;
    }
  
  }
}
