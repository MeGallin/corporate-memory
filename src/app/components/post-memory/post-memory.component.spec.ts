import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMemoryComponent } from './post-memory.component';

describe('PostMemoryComponent', () => {
  let component: PostMemoryComponent;
  let fixture: ComponentFixture<PostMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
