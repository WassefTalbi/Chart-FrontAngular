import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteDashboardComponent } from './consulte-dashboard.component';

describe('ConsulteDashboardComponent', () => {
  let component: ConsulteDashboardComponent;
  let fixture: ComponentFixture<ConsulteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
