import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPollutionComponent } from './air-pollution.component';

describe('AirPollutionComponent', () => {
  let component: AirPollutionComponent;
  let fixture: ComponentFixture<AirPollutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirPollutionComponent]
    });
    fixture = TestBed.createComponent(AirPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
