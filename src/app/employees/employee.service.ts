import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { delay, catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Injectable()
export class EmployeeService {
    constructor(private _httpClient: HttpClient) {
    }

    // private listEmployees: Employee[] = [
    //     {
    //         id: 1,
    //         name: 'Mark',
    //         gender: 'Male',
    //         contactPreference: 'Email',
    //         email: 'mark@pragimtech.com',
    //         dateOfBirth: new Date('10/25/1988'),
    //         department: '1',
    //         isActive: true,
    //         photoPath: 'assets/images/mark.png',
    //         password: null,
    //         confirmPassword: null
    //     },
    //     {
    //         id: 2,
    //         name: 'Mary',
    //         gender: 'Female',
    //         contactPreference: 'Phone',
    //         phoneNumber: 2345978640,
    //         dateOfBirth: new Date('11/20/1979'),
    //         department: '2',
    //         isActive: true,
    //         photoPath: 'assets/images/mary.png',
    //         password: null,
    //         confirmPassword: null
    //     },
    //     {
    //         id: 3,
    //         name: 'John',
    //         gender: 'Male',
    //         contactPreference: 'Phone',
    //         phoneNumber: 5432978640,
    //         dateOfBirth: new Date('3/25/1976'),
    //         department: '3',
    //         isActive: false,
    //         photoPath: 'assets/images/john.png',
    //         password: null,
    //         confirmPassword: null
    //     },
    // ];

    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<Employee[]> {
        // return of(this.listEmployees).pipe(delay(1000));  local app db
        return this._httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
        // .catch(this.handleError);
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse instanceof ErrorEvent) {
            console.error('Client side error: ', errorResponse);
        } else {
            console.error('Server side error: ', errorResponse);
        }
        return throwError('asdfasdf');
    }
    getEmployee(id: number): Observable<Employee> {
        // return this.listEmployees.find(x => x.id === id);
        return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }
    addEmployee(employee: Employee): Observable<Employee> {
        // if (employee.id === null) {
        // const maxId = this.listEmployees.reduce(function (e1, e2) {
        //     return (e1.id > e2.id) ? e1 : e2;
        // }).id;
        // employee.id = maxId + 1;
        // this.listEmployees.push(employee);
        return this._httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
        // } else {
        //     const foundIndex = this.listEmployees.findIndex(x => x.id === employee.id);
        //     this.listEmployees[foundIndex] = employee;
        // }
    }
    updateEmployee(employee: Employee): Observable<void> {
        return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
    deleteEmployee(id: number): Observable<void> {
        // const i = this.listEmployees.findIndex(x => x.id === id);
        // if (i != -1) {
        //     this.listEmployees.splice(i, 1);
        // }
        return this._httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }
}
