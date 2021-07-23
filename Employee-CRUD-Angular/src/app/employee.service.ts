import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/employee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _httpService: HttpClient) {}

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server error');
  }

  getEmployeeById(employeeId: number) {
    return this._httpService.get(
      'http://localhost:8084/employee/getEmployeeById/' + employeeId
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    console.log('getAllEmployees invoked');
    return this._httpService
      .get<Employee[]>('http://localhost:8084/employee/getAllEmployee')
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(employee: Employee) {
    let body = JSON.stringify(employee);
    let headers = { 'content-type': 'application/json' };
    let options = { headers: headers };
    console.log(body);
    return this._httpService.post(
      'http://localhost:8084/employee/addEmployee',
      body,
      options
    );
  }

  deleteEmployee(employeeId: number) {
    return this._httpService.delete(
      'http://localhost:8084/employee/deleteEmployee/' + employeeId
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this._httpService
      .put('http://localhost:8084/employee/updateEmployee', employee)
      .pipe(catchError(this.errorHandler));
  }
}
