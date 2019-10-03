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
import { PagdingComponent } from './Components/pagding/pagding.component';
import { FilterPartNoPipe } from './Shareds/pipes/filter-part-no.pipe';
import { FilterLotNoPipe } from './Shareds/pipes/filter-lot-no.pipe';
import { FilterDropdownComponent } from './Components/filter-dropdown/filter-dropdown.component';
import { FluxComponent } from './Components/flux/flux.component';
import { QlComponent } from './Components/ql/ql.component';
import { PqComponent } from './Components/pq/pq.component';
import { ModalModule } from '../lib/modal';
import { FluxPipe } from './Shareds/pipes/flux.pipe';
import { CustomPagdingComponent } from './Components/custom-pagding/custom-pagding.component';
import { GroupfluxPipe } from './Shareds/pipes/groupflux.pipe';
import { QuytrinhPipe } from './Shareds/pipes/quytrinh.pipe';
import { DialogComponent } from './Shareds/views/dialog/dialog.component';
import { MenuComponent } from './Components/menu/menu.component';
import { DanhmucComponent } from './Components/danhmuc/danhmuc.component';
import { PhanquyenComponent } from './Components/phanquyen/phanquyen.component';
import { UsernhomComponent } from './Components/usernhom/usernhom.component';
import { TreeViewComponent } from './Components/tree-view/tree-view.component';
import { TreePhanquyenComponent } from './Components/phanquyen/tree-phanquyen/tree-phanquyen.component';
import { ThongtinComponent } from './Shareds/views/thongtin/thongtin.component';
import { PagdingUserComponent } from './Components/pagding-user/pagding-user.component';
import { ThongkeComponent } from './Components/thongke/thongke.component';
import { DialogDetailComponent } from './Shareds/views/dialog-detail/dialog-detail.component';
import { TrinhkyComponent } from './Components/trinhky/trinhky.component';
import { Congdoan1Component } from './Components/ThongkeloiMA5/congdoan1/congdoan1.component';
import { Congdoan2Component } from './Components/ThongkeloiMA5/congdoan2/congdoan2.component';
import { ThongkeMA5Component } from './Components/ThongkeloiMA5/thongke-ma5/thongke-ma5.component';
import { TimepickerComponent } from './Components/timepicker/timepicker.component';
import { DialogThongkeloiComponent } from './Shareds/views/dialog-thongkeloi/dialog-thongkeloi.component';
import { DialogChangeComponent } from './Shareds/views/dialog-change/dialog-change.component';
import { ToasterContainerComponent } from './Shareds/views/toaster-container/toaster-container.component';
import { ToasterComponent } from './Shareds/views/toaster/toaster.component';
import { Congdoan1V1Component } from './Components/ThongkeloiMA5/congdoan1-v1/congdoan1-v1.component';
import { Congdoan2V1Component } from './Components/ThongkeloiMA5/congdoan2-v1/congdoan2-v1.component';
import { ThongkeMa5V1Component } from './Components/ThongkeloiMA5/thongke-ma5-v1/thongke-ma5-v1.component';
import { MayComponent } from './Components/may/may.component';
import { FilterMalotComponent } from './Components/filter-malot/filter-malot.component';
import { Pq1Component } from './Components/pq1/pq1.component';
import { RemoveListMa5Component } from './Components/ThongkeloiMA5/remove-list-ma5/remove-list-ma5.component';
import { ShowPopupComponent } from './Shareds/views/show-popup/show-popup.component';

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
    ShowPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
