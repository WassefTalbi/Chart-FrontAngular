import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigDatabaseComponent } from './chart/config-database/config-database.component';
import { ConsulterComponent } from './chart/consulter/consulter.component';
import { CreateComponent } from './chart/create/create.component';
import { LoadChartComponent } from './chart/load-chart/load-chart.component';
import { ParameterChartComponent } from './chart/parameter-chart/parameter-chart.component';
import { ConsulteChartComponent } from './dashboard/consulte-chart/consulte-chart.component';
import { ConsulteDashboardComponent } from './dashboard/consulte-dashboard/consulte-dashboard.component';
import { CreateDashboardComponent } from './dashboard/create-dashboard/create-dashboard.component';
import { EditDashboardComponent } from './dashboard/edit-dashboard/edit-dashboard.component';

const routes: Routes = [
{path:"consulterChart",component:ConsulterComponent},
{path:"createChart",component:CreateComponent},
{path:"consulterDashboard",component:ConsulteDashboardComponent},
{path:"createDashboard",component:CreateDashboardComponent},
{path:'chartListDashboard/:id',component:ConsulteChartComponent},
{path:'chartLoad/:id',component:LoadChartComponent},
{path:'editDashboard/:id',component:EditDashboardComponent},
{path:'parameterChart/:id',component:ParameterChartComponent},
{path:"config",component:ConfigDatabaseComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
