import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPanddingComponent } from './view-pandding.component';

describe('ViewPanddingComponent', () => {
  let component: ViewPanddingComponent;
  let fixture: ComponentFixture<ViewPanddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPanddingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPanddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
