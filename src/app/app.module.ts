import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import{HttpClientModule,HTTP_INTERCEPTORS }from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsulterComponent } from './chart/consulter/consulter.component';
import { CreateComponent } from './chart/create/create.component';
import { ConfigDatabaseComponent } from './chart/config-database/config-database.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsulteDashboardComponent } from './dashboard/consulte-dashboard/consulte-dashboard.component';
import { CreateDashboardComponent } from './dashboard/create-dashboard/create-dashboard.component';
import { ConsulteChartComponent } from './dashboard/consulte-chart/consulte-chart.component';
import { LoadChartComponent } from './chart/load-chart/load-chart.component';
import { EditDashboardComponent } from './dashboard/edit-dashboard/edit-dashboard.component';
import { ParameterChartComponent } from './chart/parameter-chart/parameter-chart.component';
import { LoginComponent } from './auth/login/login.component';

import { AllChartsComponent } from './chart/all-charts/all-charts.component';
import { SpecChartComponent } from './chart/spec-chart/spec-chart.component';

import { AuthService } from './auth.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { UserComponent } from './manage/user/user.component';
import { UpdateComponent } from './manage/update/update.component';
import { AddComponent } from './manage/add/add.component';
@NgModule({
  declarations: [
    AppComponent,
    ConsulterComponent,
    CreateComponent,
    ConfigDatabaseComponent,
    ConsulteDashboardComponent,
    CreateDashboardComponent,
    ConsulteChartComponent,
    LoadChartComponent,
    EditDashboardComponent,
    ParameterChartComponent,
    LoginComponent,

    AllChartsComponent,
     SpecChartComponent,
     UserComponent,
     UpdateComponent,
     AddComponent,
     
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    HttpClientModule,
    ReactiveFormsModule
 
    
  ],
  providers: [ 
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
