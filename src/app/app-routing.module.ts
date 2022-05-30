import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AllChartsComponent } from './chart/all-charts/all-charts.component';
import { ConfigDatabaseComponent } from './chart/config-database/config-database.component';
import { ConsulterComponent } from './chart/consulter/consulter.component';
import { CreateComponent } from './chart/create/create.component';
import { LoadChartComponent } from './chart/load-chart/load-chart.component';
import { ParameterChartComponent } from './chart/parameter-chart/parameter-chart.component';
import { SpecChartComponent } from './chart/spec-chart/spec-chart.component';
import { ConsulteChartComponent } from './dashboard/consulte-chart/consulte-chart.component';
import { ConsulteDashboardComponent } from './dashboard/consulte-dashboard/consulte-dashboard.component';
import { CreateDashboardComponent } from './dashboard/create-dashboard/create-dashboard.component';
import { EditDashboardComponent } from './dashboard/edit-dashboard/edit-dashboard.component';
import { AddComponent } from './manage/add/add.component';
import { UpdateComponent } from './manage/update/update.component';
import { UserComponent } from './manage/user/user.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
{path:"consulterChart",component:ConsulterComponent,canActivate:[AuthGuard]},
{path:"",component:LoginComponent},
{path:"createChart",component:CreateComponent,canActivate:[AuthGuard]},
{path:"consulterDashboard",component:ConsulteDashboardComponent,canActivate:[AuthGuard]},
{path:"createDashboard",component:CreateDashboardComponent,canActivate:[AuthGuard]},
{path:'chartListDashboard/:id',component:ConsulteChartComponent,canActivate:[AuthGuard]},
{path:'chartLoad/:id',component:LoadChartComponent,canActivate:[AuthGuard]},
{path:'editDashboard/:id',component:EditDashboardComponent,canActivate:[AuthGuard]},
{path:'parameterChart/:id',component:ParameterChartComponent,canActivate:[AuthGuard]},
{path:"config",component:ConfigDatabaseComponent,canActivate:[AuthGuard]},
{path:"allChart",component:AllChartsComponent,canActivate:[AuthGuard]},
{path:"specChart/:id",component:SpecChartComponent,canActivate:[AuthGuard]},
{path:"updateUser/:id",component:UpdateComponent,canActivate:[AuthGuard]},
{path:"users",component:UserComponent,canActivate:[AuthGuard]},
{path:"addUser",component:AddComponent,canActivate:[AuthGuard]},
{path:"signin",component:LoginComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
