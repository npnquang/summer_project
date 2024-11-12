import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioChildComponent } from './audio-child.component';

describe('AudioChildComponent', () => {
  let component: AudioChildComponent;
  let fixture: ComponentFixture<AudioChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
