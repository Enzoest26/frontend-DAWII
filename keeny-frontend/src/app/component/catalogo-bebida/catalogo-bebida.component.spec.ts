import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBebidaComponent } from './catalogo-bebida.component';

describe('CatalogoBebidaComponent', () => {
  let component: CatalogoBebidaComponent;
  let fixture: ComponentFixture<CatalogoBebidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoBebidaComponent]
    });
    fixture = TestBed.createComponent(CatalogoBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
