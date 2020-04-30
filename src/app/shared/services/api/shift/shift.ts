import { Time } from '@angular/common';
import { Employee } from '../employee/employee';
import { Department } from '../department/department';

export interface Shift {
    startTime: Time,
    endTime: Time,
    date: Date,
    employee: Employee,
    department: Department
}