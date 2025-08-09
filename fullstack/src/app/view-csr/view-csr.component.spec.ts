import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCsrComponent } from './view-csr.component';

describe('ViewCsrComponent', () => {
  let component: ViewCsrComponent;
  let fixture: ComponentFixture<ViewCsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCsrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
