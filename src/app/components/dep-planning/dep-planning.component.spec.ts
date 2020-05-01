import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepPlanningComponent } from './dep-planning.component';

describe('DepPlanningComponent', () => {
  let component: DepPlanningComponent;
  let fixture: ComponentFixture<DepPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
