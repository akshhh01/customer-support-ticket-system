import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrDashbordComponent } from './csr-dashbord.component';

describe('CsrDashbordComponent', () => {
  let component: CsrDashbordComponent;
  let fixture: ComponentFixture<CsrDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsrDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsrDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
