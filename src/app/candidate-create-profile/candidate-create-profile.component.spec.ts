import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCreateProfileComponent } from './candidate-create-profile.component';

describe('CandidateCreateProfileComponent', () => {
  let component: CandidateCreateProfileComponent;
  let fixture: ComponentFixture<CandidateCreateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateCreateProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCreateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
