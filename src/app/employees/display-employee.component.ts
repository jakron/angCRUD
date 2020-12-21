import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  selectedEmployeeId: number;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  isHidden = false;
  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private _employeeService: EmployeeService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');

  }

  viewEmployee() {
    this._router.navigate(['/employee', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }
  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }
  getNameGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }
  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log('employee del ', this.employee.id),
      err => console.log('err', err)
    );
    this.notifyDelete.emit(this.employee.id);
  }
  // handleClick(): void {
  //   this.notify.emit(this.employee);
  // }

}
