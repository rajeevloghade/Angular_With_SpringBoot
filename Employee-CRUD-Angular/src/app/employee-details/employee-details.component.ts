import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from 'src/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId!: number;
  employee: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.employeeId = parseInt(param.get('id') as string);
      this._employeeService.getEmployeeById(this.employeeId).subscribe(
        (employeeData) => {
          this.employee = employeeData as Employee;
          console.log('getDetails===>', employeeData);
        },
        (error) => console.log(error)
      );
    });
  }

  gotoList() {
    this.router.navigate(['employees']);
  }
}
