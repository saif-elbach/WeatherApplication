import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingBackEndComponent } from './testing-back-end.component';

describe('TestingBackEndComponent', () => {
  let component: TestingBackEndComponent;
  let fixture: ComponentFixture<TestingBackEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingBackEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingBackEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
