import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Shareds/views/home/home.component';
import { QlComponent } from './Components/ql/ql.component';
import { FluxComponent } from './Components/flux/flux.component';
import { PqComponent } from './Components/pq/pq.component';
import { MenuComponent } from './Components/menu/menu.component';
import { DanhmucComponent } from './Components/danhmuc/danhmuc.component';
import { UsernhomComponent } from './Components/usernhom/usernhom.component';
import { PhanquyenComponent } from './Components/phanquyen/phanquyen.component';
import { NhomkyComponent } from './Components/nhomky/nhomky.component';
import { ThongtinComponent } from './Shareds/views/thongtin/thongtin.component';
import { ThongkeComponent } from './Components/thongke/thongke.component';
import { TrinhkyComponent } from './Components/trinhky/trinhky.component';
import { Congdoan1Component } from './Components/ThongkeloiMA5/congdoan1/congdoan1.component';
import { Congdoan2Component } from './Components/ThongkeloiMA5/congdoan2/congdoan2.component';
import { ThongkeMA5Component } from './Components/ThongkeloiMA5/thongke-ma5/thongke-ma5.component';
import { Congdoan1V1Component } from './Components/ThongkeloiMA5/congdoan1-v1/congdoan1-v1.component';
import { Congdoan2V1Component } from './Components/ThongkeloiMA5/congdoan2-v1/congdoan2-v1.component';
import { ThongkeMa5V1Component } from './Components/ThongkeloiMA5/thongke-ma5-v1/thongke-ma5-v1.component';
import { MayComponent } from './Components/may/may.component';
import { Pq1Component } from './Components/pq1/pq1.component';
import { RemoveListMa5Component } from './Components/ThongkeloiMA5/remove-list-ma5/remove-list-ma5.component';
import { ChatboxComponent } from './Shareds/views/chatbox/chatbox.component';
import { PhongKtxComponent } from './Components/KTX/phong-ktx/phong-ktx.component';
import { TaisanKtxComponent } from './Components/KTX/taisan-ktx/taisan-ktx.component';
import { NhanviendangkygianhapComponent } from './Components/KTX/nhanviendangkygianhap/nhanviendangkygianhap.component';
import { NhanviendangkyComponent } from './Components/KTX/nhanviendangky/nhanviendangky.component';
import { ThongkenvvaoraktxComponent } from './Components/KTX/thongkenvvaoraktx/thongkenvvaoraktx.component';
import { ThongkexuatnhapkhoktxComponent } from './Components/KTX/thongkexuatnhapkhoktx/thongkexuatnhapkhoktx.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'flux',
        component: FluxComponent
      },
      {
        path: 'ql',
        component: QlComponent
      },
      {
        path: 'pq',
        component: PqComponent
      },
      {
        path: 'pq1',
        component: Pq1Component
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'danhmuc',
        component: DanhmucComponent
      },
      {
        path: 'usernhom',
        component: UsernhomComponent
      },
      {
        path: 'phanquyen',
        component: PhanquyenComponent
      },
      {
        path: 'nhomky',
        component: NhomkyComponent
      },
      {
        path: 'removeMa5',
        component: RemoveListMa5Component
      },
      {
        path: 'thongtin',
        component: ThongtinComponent
      },
      {
        path: 'trinhky',
        component: TrinhkyComponent
      },
      {
        path: 'congdoan1',
        component: Congdoan1Component
      },
      {
        path: 'congdoan1v1',
        component: Congdoan1V1Component
      },
      {
        path: 'congdoan2',
        component: Congdoan2Component
      },
      {
        path: 'congdoan2v1',
        component: Congdoan2V1Component
      },
      {
        path: 'thongkema5',
        component: ThongkeMA5Component
      },
      {
        path: 'thongkema5v1',
        component: ThongkeMa5V1Component
      },
      {
        path: 'thongke',
        component: ThongkeComponent
      },
      {
        path: 'may',
        component: MayComponent
      },
      {
        path: 'phongktx',
        component: PhongKtxComponent
      },
      {
        path: 'taisanktx',
        component: TaisanKtxComponent
      },
      {
        path: 'qlnvdangkyktx',
        component: NhanviendangkygianhapComponent
      },
      {
        path: 'nvdangkyktx',
        component: NhanviendangkyComponent
      },
      {
        path: 'thongkeravaoktx',
        component: ThongkenvvaoraktxComponent
      },
      {
        path: 'thongkexuatnhapkho',
        component: ThongkexuatnhapkhoktxComponent
      },
      {
        path: 'adminremoveMa5',
        component: RemoveListMa5Component
      },
      {
        path: 'administratordanhmuc',
        component: DanhmucComponent
      },
      {
        path: 'administratortrinhky',
        component: TrinhkyComponent
      },
      {
        path: 'administratormenu',
        component: MenuComponent
      },
      {
        path: 'administratorphanquyen',
        component: PhanquyenComponent
      },
      {
        path: 'administratorthongke',
        component: ThongkeComponent
      },
      {
        path: 'administratornhomky',
        component: NhomkyComponent
      },
      {
        path: 'administratorcongdoan1',
        component: Congdoan1Component
      },
      {
        path: 'thongtin12',
        component: ThongtinComponent
      },
      {
        path: 'administratorusernhomky',
        component: UsernhomComponent
      },
      {
        path: 'adminichatbox',
        component: ChatboxComponent
      },
      {
        path: 'adminphongktx',
        component: PhongKtxComponent
      },
      {
        path: 'qladminnvdangkyktx',
        component: NhanviendangkygianhapComponent
      },
      {
        path: 'admintaisanktx',
        component: TaisanKtxComponent
      },
      {
        path: 'adminnvdangkyktx',
        component: NhanviendangkyComponent
      },
      {
        path: 'may12',
        component: MayComponent
      },
      {
        path: 'adminthongkexuatnhapkho',
        component: ThongkexuatnhapkhoktxComponent
      }
     
    ]
  },
  {
    path: 'adminthongkeravaoktx',
    component: ThongkenvvaoraktxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
