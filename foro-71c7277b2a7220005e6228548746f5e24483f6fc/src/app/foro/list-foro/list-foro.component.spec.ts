import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForoComponent } from './list-foro.component';

describe('ListForoComponent', () => {
  let component: ListForoComponent;
  let fixture: ComponentFixture<ListForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
