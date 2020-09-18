import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewForoComponent } from './view-foro.component';

describe('ViewForoComponent', () => {
  let component: ViewForoComponent;
  let fixture: ComponentFixture<ViewForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
