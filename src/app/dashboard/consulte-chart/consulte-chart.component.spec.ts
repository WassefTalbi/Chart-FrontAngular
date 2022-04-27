import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteChartComponent } from './consulte-chart.component';

describe('ConsulteChartComponent', () => {
  let component: ConsulteChartComponent;
  let fixture: ComponentFixture<ConsulteChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulteChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
