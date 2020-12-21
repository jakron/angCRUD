import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(x => {
      const id = +x.get('id');
      this.getEmployee(id);
    });
  }

  getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: '',
        gender: 'male',
        contactPreference: '',
        phoneNumber: 1,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: false,
        photoPath: '',
        password: null,
        confirmPassword: null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      Object.assign({}, this._employeeService.getEmployee(id).subscribe((data: Employee) => {
        this.employee = data;
      }, (err: any) => console.log('err', err)));
    }
  }
  saveEmployee(): void {
    // const newEmployee: Employee = Object.assign({}, this.employee);  // make copy of obj not ref
    if (this.employee.id === null) {
      this._employeeService.addEmployee(this.employee).subscribe((data: Employee) => {
        this.createEmployeeForm.reset();
        this._router.navigate(['employees']);
      }, (err: any) => console.log('err', err));
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(() => {
        this.createEmployeeForm.reset();
        this._router.navigate(['employees']);
      }, (err: any) => console.log('err', err));
    }

  }
  togglePhotoPreview(): void {
    this.previewPhoto = !this.previewPhoto;
  }
}
