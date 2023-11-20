import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarBoletaComponent } from './generar-boleta.component';

describe('GenerarBoletaComponent', () => {
  let component: GenerarBoletaComponent;
  let fixture: ComponentFixture<GenerarBoletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarBoletaComponent]
    });
    fixture = TestBed.createComponent(GenerarBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
