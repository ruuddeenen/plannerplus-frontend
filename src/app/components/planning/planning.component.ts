import { Component, OnInit } from '@angular/core';
import { ShiftService } from 'src/app/shared/services/api/shift/shift.service';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/shared/services/api/shift/shift';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private shiftDataSource = new MatTableDataSource<Shift>()
  private userId: string

  displayedColumns: string[] = ['date', 'start', 'end', 'department']
  constructor(
    private shiftService: ShiftService
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).uid
    this.initShifts()
  }

  private initShifts() {
    this.shiftService.getAllByEmployeeId(this.userId).subscribe(res => {
      this.shiftDataSource.data = res
    })
  }
}
