import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceToSpeechComponent } from './licence-to-speech.component';

describe('LicenceToSpeechComponent', () => {
  let component: LicenceToSpeechComponent;
  let fixture: ComponentFixture<LicenceToSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenceToSpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenceToSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
