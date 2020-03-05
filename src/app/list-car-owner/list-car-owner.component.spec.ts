import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarOwnerComponent } from './list-car-owner.component';

describe('ListCarOwnerComponent', () => {
  let component: ListCarOwnerComponent;
  let fixture: ComponentFixture<ListCarOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCarOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
