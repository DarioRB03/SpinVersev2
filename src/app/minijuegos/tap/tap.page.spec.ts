import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TapPage } from './tap.page';

describe('TapPage', () => {
  let component: TapPage;
  let fixture: ComponentFixture<TapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
