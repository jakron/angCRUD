import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [

  { path: 'employees', component: ListEmployeesComponent, resolve: { employeeList: EmployeeListResolverService } },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService] },
  { path: 'edit/:id', component: CreateEmployeeComponent },
  // { path: 'employee/:id/:gender', component: CreateEmployeeComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
