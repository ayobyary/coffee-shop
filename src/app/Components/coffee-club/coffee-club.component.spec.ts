import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeClubComponent } from './coffee-club.component';

describe('CoffeeClubComponent', () => {
  let component: CoffeeClubComponent;
  let fixture: ComponentFixture<CoffeeClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeClubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

