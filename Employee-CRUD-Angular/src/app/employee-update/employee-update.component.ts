import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit {
  employeeId!: number;
  employee: Employee = new Employee();
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employee = new Employee();
    this.employeeId = this.route.snapshot.params['id'];

    this._employeeService.getEmployeeById(this.employeeId).subscribe(
      (employeeById) => {
        (this.employee = employeeById as Employee), console.log("getEmployeeById==>",employeeById);
      },
      (error) => console.log(error)
    );
  }

  updateEmployee() {
    this._employeeService.updateEmployee(this.employee).subscribe(
      (employeeData) => {
        this.employee = employeeData;
        this.gotoList();
      },
      (error) => console.log(error)
    );
    this.employee = new Employee();
  }

  onSubmit() {
    this.submitted = true;
    this.updateEmployee();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
