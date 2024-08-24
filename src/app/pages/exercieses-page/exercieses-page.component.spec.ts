import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciesesPageComponent } from './exercieses-page.component';

describe('ExerciesesPageComponent', () => {
  let component: ExerciesesPageComponent;
  let fixture: ComponentFixture<ExerciesesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciesesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciesesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
