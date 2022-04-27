import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import{HttpClientModule}from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsulterComponent } from './chart/consulter/consulter.component';
import { CreateComponent } from './chart/create/create.component';
import { ConfigDatabaseComponent } from './chart/config-database/config-database.component';
import { FormsModule } from '@angular/forms';
import { ConsulteDashboardComponent } from './dashboard/consulte-dashboard/consulte-dashboard.component';
import { CreateDashboardComponent } from './dashboard/create-dashboard/create-dashboard.component';
import { ConsulteChartComponent } from './dashboard/consulte-chart/consulte-chart.component';
import { LoadChartComponent } from './chart/load-chart/load-chart.component';
import { EditDashboardComponent } from './dashboard/edit-dashboard/edit-dashboard.component';
import { ParameterChartComponent } from './chart/parameter-chart/parameter-chart.component';
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
    ParameterChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    HttpClientModule
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
