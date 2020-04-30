import { Employee } from '../employee/employee';

export interface Department{
    employees: Employee[];
    id: number,
    name: String
}