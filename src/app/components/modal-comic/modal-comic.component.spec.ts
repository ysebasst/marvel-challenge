import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComicComponent } from './modal-comic.component';

describe('ModalComicComponent', () => {
  let component: ModalComicComponent;
  let fixture: ComponentFixture<ModalComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
