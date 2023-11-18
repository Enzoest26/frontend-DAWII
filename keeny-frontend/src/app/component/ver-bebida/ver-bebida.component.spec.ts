import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBebidaComponent } from './ver-bebida.component';

describe('VerBebidaComponent', () => {
  let component: VerBebidaComponent;
  let fixture: ComponentFixture<VerBebidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerBebidaComponent]
    });
    fixture = TestBed.createComponent(VerBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
