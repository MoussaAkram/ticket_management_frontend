import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFiltersComponent } from './demande-filters.component';

describe('DemandeFiltersComponent', () => {
  let component: DemandeFiltersComponent;
  let fixture: ComponentFixture<DemandeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
