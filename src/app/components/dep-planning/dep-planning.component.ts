import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/shared/services/api/shift/shift';
import { ShiftService } from 'src/app/shared/services/api/shift/shift.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/shared/services/api/department/department';
import { DepartmentService } from 'src/app/shared/services/api/department/department.service';
import { Week } from 'src/app/shared/week/week';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-dep-planning',
  templateUrl: './dep-planning.component.html',
  styleUrls: ['./dep-planning.component.css']
})
export class DepPlanningComponent implements OnInit {

  private selectedValueDepartment: number
  private selectedValueWeek: Week
  private selectedValueDay: Date

  private shiftDataSource = new MatTableDataSource<Shift>()

  private departments: Department[]
  private weeks: Week[] = []

  displayedColumns: string[] = ['employee', 'start', 'end']

  constructor(
    private shiftService: ShiftService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.initDepartments()
    this.initDays()
  }

  handleChange(event: any) {
    console.log(event.source._id)
    console.log(this.selectedValueWeek)
  }

  private initDepartments() {
    this.departmentService.getAll().subscribe(res => {
      this.departments = res
    })
  }

  private initDays() {
    for (var week = -1; week < 4; week++) {
      const time = new Date().getTime()
      const date = new Date(time + (week * 86400000 * 7))

      const dayOfWeek = DateTime.fromJSDate(date).weekday

      const tempWeek: Week = {
        days: [],
        number: DateTime.fromJSDate(date).weekNumber
      }
      for (let i = 1; i < 8; i++) {
        tempWeek.days.push(
          getDay(i)
        )
      }
      this.weeks.push(tempWeek)

      // Set current week
      if (week === 0){
        this.selectedValueWeek = tempWeek
      }
      // Get day of the week where x = 1 equals monday etc..
      function getDay(x: number): Date {
        return new Date(date.getTime() - (86400000 * (dayOfWeek - x)))
      }
    }
  }
}
