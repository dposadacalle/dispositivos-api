import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDispositivosComponent } from './mostrar-dispositivos.component';

describe('MostrarDispositivosComponent', () => {
  let component: MostrarDispositivosComponent;
  let fixture: ComponentFixture<MostrarDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarDispositivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
