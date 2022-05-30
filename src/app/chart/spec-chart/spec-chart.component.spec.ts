import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecChartComponent } from './spec-chart.component';

describe('SpecChartComponent', () => {
  let component: SpecChartComponent;
  let fixture: ComponentFixture<SpecChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
