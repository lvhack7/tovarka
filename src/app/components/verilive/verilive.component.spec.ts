import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeriliveComponent } from './verilive.component';

describe('VeriliveComponent', () => {
  let component: VeriliveComponent;
  let fixture: ComponentFixture<VeriliveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeriliveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeriliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
