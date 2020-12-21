import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id: number;

  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(x => {
      this._id = +x.get('id');
      this._employeeService.getEmployee(this._id).subscribe((data: Employee) => {
        this.employee = data;
      }, (err: any) => console.log('err', err));
    });
  }

  viewNextEmployee(): void {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }

    this._router.navigate(['/employee', this._id], {
      queryParamsHandling: 'preserve'
    });
  }

}
