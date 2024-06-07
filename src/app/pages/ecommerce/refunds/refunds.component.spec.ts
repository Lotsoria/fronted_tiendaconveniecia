import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsComponent } from './refunds.component';

describe('RefundsComponent', () => {
  let component: RefundsComponent;
  let fixture: ComponentFixture<RefundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefundsComponent]
    });
    fixture = TestBed.createComponent(RefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
