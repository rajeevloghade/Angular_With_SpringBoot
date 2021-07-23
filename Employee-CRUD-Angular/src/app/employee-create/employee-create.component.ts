import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/employee';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  public employee = new Employee();
  submitted: boolean = false;
  constructor(private router:Router, private _employeeService: EmployeeService) {}

  ngOnInit(): void {}

  addEmployee() {
    this._employeeService.addEmployee(this.employee).subscribe(
      (response) => {
        console.log(response), this.reset();
        this.gotoList();
      },
      (error) => console.log(error)
    );
  }
  private reset() {
    console.log('Resetting');
    (this.employee.name = ''),
      (this.employee.department = ''),
      (this.employee.address = '');
  }
  onSubmit() {
    this.submitted=true;
    this.addEmployee();
  }
  gotoList() {
    this.router.navigate(['/employees']);
  }
}
