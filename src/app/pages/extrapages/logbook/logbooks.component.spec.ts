import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbooksComponent } from './logbooks.component';

describe('LogbooksComponent', () => {
  let component: LogbooksComponent;
  let fixture: ComponentFixture<LogbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
