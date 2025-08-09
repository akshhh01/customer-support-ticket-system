import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnlysisComponent } from './anlysis.component';

describe('AnlysisComponent', () => {
  let component: AnlysisComponent;
  let fixture: ComponentFixture<AnlysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnlysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnlysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
