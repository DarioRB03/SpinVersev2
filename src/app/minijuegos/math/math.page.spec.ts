import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathPage } from './math.page';

describe('MathPage', () => {
  let component: MathPage;
  let fixture: ComponentFixture<MathPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MathPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
