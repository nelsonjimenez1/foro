import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerComentarioComponent } from './answer-comentario.component';

describe('AnswerComentarioComponent', () => {
  let component: AnswerComentarioComponent;
  let fixture: ComponentFixture<AnswerComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
