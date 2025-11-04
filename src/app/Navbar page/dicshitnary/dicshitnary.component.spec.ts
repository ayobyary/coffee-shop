import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicshitnaryComponent } from './dicshitnary.component';

describe('DicshitnaryComponent', () => {
  let component: DicshitnaryComponent;
  let fixture: ComponentFixture<DicshitnaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicshitnaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DicshitnaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
