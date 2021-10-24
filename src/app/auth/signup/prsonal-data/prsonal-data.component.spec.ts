import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrsonalDataComponent } from './prsonal-data.component';

describe('PrsonalDataComponent', () => {
  let component: PrsonalDataComponent;
  let fixture: ComponentFixture<PrsonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrsonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrsonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
