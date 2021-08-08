import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalMarketComponent } from './animal-market.component';

describe('AnimalMarketComponent', () => {
  let component: AnimalMarketComponent;
  let fixture: ComponentFixture<AnimalMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
