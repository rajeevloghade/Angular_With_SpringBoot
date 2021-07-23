import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];
  public employee: void;
  public loading: boolean = false;

  constructor(
    private _employeeService: EmployeeService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.loading = true;
    this._employeeService.getAllEmployees().subscribe(
      (employeeData) => {
        this.employees = employeeData;
        console.log(employeeData);
        this.loading = false;
      },
      (error) => console.log(error)
    );
  }

  deleteEmployee(employeeId: number) {
    this._employeeService.deleteEmployee(employeeId).subscribe(
      (response) => {
        console.log(response);
        this.getAllEmployee();
      },
      (error) => console.log(error)
    );
  }

  employeeDetails(id: number) {
    this.route.navigate(['employeeDetails', id]);
  }
  updateEmployee(id: number) {
    this.route.navigate(['updateEmployee', id]);
  }
  
}
