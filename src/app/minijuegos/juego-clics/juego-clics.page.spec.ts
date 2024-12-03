import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegoClicsPage } from './juego-clics.page';

describe('JuegoClicsPage', () => {
  let component: JuegoClicsPage;
  let fixture: ComponentFixture<JuegoClicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoClicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
