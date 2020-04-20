import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemoryComponent } from './view-memory.component';

describe('ViewMemoryComponent', () => {
  let component: ViewMemoryComponent;
  let fixture: ComponentFixture<ViewMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
