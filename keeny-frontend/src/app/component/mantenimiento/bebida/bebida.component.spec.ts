import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaComponent } from './bebida.component';

describe('BebidaComponent', () => {
  let component: BebidaComponent;
  let fixture: ComponentFixture<BebidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BebidaComponent]
    });
    fixture = TestBed.createComponent(BebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
