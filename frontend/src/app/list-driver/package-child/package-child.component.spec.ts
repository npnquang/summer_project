import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageChildComponent } from './package-child.component';

describe('PackageChildComponent', () => {
  let component: PackageChildComponent;
  let fixture: ComponentFixture<PackageChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
