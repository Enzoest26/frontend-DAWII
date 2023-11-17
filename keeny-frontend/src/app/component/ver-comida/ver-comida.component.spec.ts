import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComidaComponent } from './ver-comida.component';

describe('VerComidaComponent', () => {
  let component: VerComidaComponent;
  let fixture: ComponentFixture<VerComidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerComidaComponent]
    });
    fixture = TestBed.createComponent(VerComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
