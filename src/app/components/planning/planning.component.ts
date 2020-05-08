import {Component, OnInit} from '@angular/core';
import {ShiftService} from 'src/app/shared/services/api/shift/shift.service';
import {MatTableDataSource} from '@angular/material/table';
import {Shift} from 'src/app/shared/services/api/shift/shift';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  public shiftDataSource = new MatTableDataSource<Shift>();
  private userId: string;

  displayedColumns: string[] = ['date', 'start', 'end', 'department'];

  constructor(
    private shiftService: ShiftService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('uuid');
    if (!this.userId) {
      this.userId = JSON.parse(localStorage.getItem('user')).uid;
    }
    this.initShifts(this.userId);
  }

  private initShifts(id: string) {
    this.shiftService.getAllByEmployeeId(id).subscribe(res => {
      this.shiftDataSource.data = res;
    });
  }
}
