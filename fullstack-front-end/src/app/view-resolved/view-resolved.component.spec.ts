import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResolvedComponent } from './view-resolved.component';

describe('ViewResolvedComponent', () => {
  let component: ViewResolvedComponent;
  let fixture: ComponentFixture<ViewResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResolvedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
