import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetThreeComponent } from './widget-three.component';

describe('WidgetThreeComponent', () => {
  let component: WidgetThreeComponent;
  let fixture: ComponentFixture<WidgetThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetThreeComponent]
    });
    fixture = TestBed.createComponent(WidgetThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
