import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceChildComponent } from './distance-child.component';

describe('DistanceChildComponent', () => {
  let component: DistanceChildComponent;
  let fixture: ComponentFixture<DistanceChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistanceChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistanceChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
