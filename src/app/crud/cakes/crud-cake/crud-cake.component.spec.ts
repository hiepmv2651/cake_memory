import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCakeComponent } from './crud-cake.component';

describe('CrudCakeComponent', () => {
  let component: CrudCakeComponent;
  let fixture: ComponentFixture<CrudCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
