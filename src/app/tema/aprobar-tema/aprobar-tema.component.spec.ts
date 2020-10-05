import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarTemaComponent } from './aprobar-tema.component';

describe('AprobarTemaComponent', () => {
  let component: AprobarTemaComponent;
  let fixture: ComponentFixture<AprobarTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarTemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
