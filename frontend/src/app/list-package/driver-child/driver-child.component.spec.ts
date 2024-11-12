import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverChildComponent } from './driver-child.component';

describe('DriverChildComponent', () => {
  let component: DriverChildComponent;
  let fixture: ComponentFixture<DriverChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
