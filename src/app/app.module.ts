import { BrowserModule } from '@angular/platform-browser';
import { NgModule,} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Shareds/views/home/home.component';
import { SidebarComponent } from './Shareds/views/sidebar/sidebar.component';
import { NhomkyComponent } from './Components/nhomky/nhomky.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";
import { FilterPartNoPipe } from './Shareds/pipes/filter-part-no.pipe';
import { FilterLotNoPipe } from './Shareds/pipes/filter-lot-no.pipe';
import { FluxComponent } from './Components/flux/flux.component';
import { QlComponent } from './Components/ql/ql.component';
import { PqComponent } from './Components/pq/pq.component';
import { ModalModule } from '../lib/modal';
import { FluxPipe } from './Shareds/pipes/flux.pipe';
import { GroupfluxPipe } from './Shareds/pipes/groupflux.pipe';
import { QuytrinhPipe } from './Shareds/pipes/quytrinh.pipe';
import { MenuComponent } from './Components/menu/menu.component';
import { DanhmucComponent } from './Components/danhmuc/danhmuc.component';
import { PhanquyenComponent } from './Components/phanquyen/phanquyen.component';
import { UsernhomComponent } from './Components/usernhom/usernhom.component';
import { TreeViewComponent } from './Components/tree-view/tree-view.component';
import { TreePhanquyenComponent } from './Components/phanquyen/tree-phanquyen/tree-phanquyen.component';
import { ThongtinComponent } from './Shareds/views/thongtin/thongtin.component';
import { ThongkeComponent } from './Components/thongke/thongke.component';
import { TrinhkyComponent } from './Components/trinhky/trinhky.component';
import { Congdoan1Component } from './Components/ThongkeloiMA5/congdoan1/congdoan1.component';
import { Congdoan2Component } from './Components/ThongkeloiMA5/congdoan2/congdoan2.component';
import { ThongkeMA5Component } from './Components/ThongkeloiMA5/thongke-ma5/thongke-ma5.component';
import { ToasterContainerComponent } from './Shareds/views/toaster-container/toaster-container.component';
import { ToasterComponent } from './Shareds/views/toaster/toaster.component';
import { Congdoan1V1Component } from './Components/ThongkeloiMA5/congdoan1-v1/congdoan1-v1.component';
import { Congdoan2V1Component } from './Components/ThongkeloiMA5/congdoan2-v1/congdoan2-v1.component';
import { ThongkeMa5V1Component } from './Components/ThongkeloiMA5/thongke-ma5-v1/thongke-ma5-v1.component';
import { MayComponent } from './Components/may/may.component';
import { Pq1Component } from './Components/pq1/pq1.component';
import { RemoveListMa5Component } from './Components/ThongkeloiMA5/remove-list-ma5/remove-list-ma5.component';
import { ShowPopupComponent } from './Shareds/views/show-popup/show-popup.component';
import { ChatboxComponent } from './Shareds/views/chatbox/chatbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatService } from './Shareds/services/chat.service';
import { TaisanKtxComponent } from './Components/KTX/taisan-ktx/taisan-ktx.component';
import { PhongKtxComponent } from './Components/KTX/phong-ktx/phong-ktx.component';
import { NhanviendangkygianhapComponent } from './Components/KTX/nhanviendangkygianhap/nhanviendangkygianhap.component';
import { KhainhankhauComponent } from './Components/KTX/khainhankhau/khainhankhau.component';
import { FilterKtxComponent } from './Shareds/Filterdropdown/filter-ktx/filter-ktx.component';
import { PagdingComponent } from './Shareds/Pagding/pagding/pagding.component';
import { FilterDropdownComponent } from './Shareds/Filterdropdown/filter-dropdown/filter-dropdown.component';
import { CustomPagdingComponent } from './Shareds/Pagding/custom-pagding/custom-pagding.component';
import { PagdingUserComponent } from './Shareds/Pagding/pagding-user/pagding-user.component';
import { DialogComponent } from './Shareds/Dialogs/dialog/dialog.component';
import { DialogDetailComponent } from './Shareds/Dialogs/dialog-detail/dialog-detail.component';
import { TimepickerComponent } from './Shareds/views/timepicker/timepicker.component';
import { DialogThongkeloiComponent } from './Shareds/Dialogs/dialog-thongkeloi/dialog-thongkeloi.component';
import { DialogChangeComponent } from './Shareds/Dialogs/dialog-change/dialog-change.component';
import { FilterMalotComponent } from './Shareds/Filterdropdown/filter-malot/filter-malot.component';
import { FilterMahangMa5Component } from './Shareds/Filterdropdown/filter-mahang-ma5/filter-mahang-ma5.component';
import { FilterMalotMa5Component } from './Shareds/Filterdropdown/filter-malot-ma5/filter-malot-ma5.component';
import { PagdingRigthMa5Component } from './Shareds/Pagding/pagding-rigth-ma5/pagding-rigth-ma5.component';
import { PagdingLeftMa5Component } from './Shareds/Pagding/pagding-left-ma5/pagding-left-ma5.component';
import { DialogKtxComponent } from './Shareds/Dialogs/dialog-ktx/dialog-ktx.component';
import { DialogKnkComponent } from './Shareds/Dialogs/dialog-knk/dialog-knk.component';
import { PagdingMini2Component } from './Shareds/Pagding/pagding-mini2/pagding-mini2.component';
import { PagdingMini1Component } from './Shareds/Pagding/pagding-mini1/pagding-mini1.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpSetHeaders } from './http.interceptor';
import { NhanviendangkyComponent } from './Components/KTX/nhanviendangky/nhanviendangky.component';
import { ThongkenvvaoraktxComponent } from './Components/KTX/thongkenvvaoraktx/thongkenvvaoraktx.component';
import { ThongkexuatnhapkhoktxComponent } from './Components/KTX/thongkexuatnhapkhoktx/thongkexuatnhapkhoktx.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NhomkyComponent,
    PagdingComponent,
    FilterPartNoPipe,
    FilterLotNoPipe,
    FilterDropdownComponent,
    FluxComponent,
    QlComponent,
    PqComponent,
    FluxPipe,
    CustomPagdingComponent,
    GroupfluxPipe,
    QuytrinhPipe,
    DialogComponent,
    MenuComponent,
    DanhmucComponent,
    PhanquyenComponent,
    UsernhomComponent,
    TreeViewComponent,
    TreePhanquyenComponent,
    ThongtinComponent,
    PagdingUserComponent,
    ThongkeComponent,
    DialogDetailComponent,
    TrinhkyComponent,
    Congdoan1Component,
    Congdoan2Component,
    ThongkeMA5Component,
    TimepickerComponent,
    DialogThongkeloiComponent,
    DialogChangeComponent,
    ToasterContainerComponent,
    ToasterComponent,
    Congdoan1V1Component,
    Congdoan2V1Component,
    ThongkeMa5V1Component,
    MayComponent,
    FilterMalotComponent,
    Pq1Component,
    RemoveListMa5Component,
    ShowPopupComponent,
    ChatboxComponent,
    FilterMahangMa5Component,
    FilterMalotMa5Component,
    PagdingRigthMa5Component,
    PagdingLeftMa5Component,
    TaisanKtxComponent,
    PhongKtxComponent,
    NhanviendangkygianhapComponent,
    KhainhankhauComponent,
    DialogKtxComponent,
    DialogKnkComponent,
    PagdingMini1Component,
    PagdingMini2Component,
    FilterKtxComponent,
    NhanviendangkyComponent,
    ThongkenvvaoraktxComponent,
    ThongkexuatnhapkhoktxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    FontAwesomeModule,
  ],
  providers: [
    ChatService,
    // {provide: HTTP_INTERCEPTORS, useClass: httpSetHeaders, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
