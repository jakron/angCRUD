import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeelistModule } from './resolved-employeelist.module';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  _searchTerm: string;
  error: string;
  // dataFromChild: Employee;
  // employeeToDisplay: Employee;
  // private arrayIndex = 1;

  public get searchTerm(): string {
    return this._searchTerm;
  }
  public set searchTerm(v: string) {
    this._searchTerm = v;
    this.filteredEmployees = this.filtereEmployees(v);
  }

  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {

    const resolvedData: Employee[] | string = this._route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(x => x.Id === id);
    if (i != -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
  ngOnInit(): void {
    // this._employeeService.getEmployees().subscribe(empList => {
    //   this.employees = empList;
    //   this._route.queryParamMap.subscribe(x => {
    //     if (x.has('searchTerm')) {
    //       this.searchTerm = x.get('searchTerm');
    //     } else {
    //       this.filteredEmployees = this.employees;
    //     }
    //   });
    // });
    console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.keys);
    console.log(this._route.snapshot.paramMap.keys);

    // this.employeeToDisplay = this.employees[0];
  }
  filtereEmployees(v: string): Employee[] {
    return this.employees.filter(x => x.Name.toLocaleLowerCase().indexOf(v.toLocaleLowerCase()) !== -1);
  }
  changeEmployeeName() {
    this.employees[0].Name = 'Jordan';
    this.filteredEmployees = this.filtereEmployees(this.searchTerm);
  }

  // onClick(employeeId: number): void {
  //   this._router.navigate(['/employee', employeeId], {
  //     queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
  //   });
  // }

  // handleNotify(eventData: Employee): void {
  //   this.dataFromChild = eventData;
  // }
  // nextEmployee(): void {
  //   if (this.arrayIndex <= 2) {
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   } else {
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }

}
