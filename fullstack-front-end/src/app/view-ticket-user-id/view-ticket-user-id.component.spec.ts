import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketUserIdComponent } from './view-ticket-user-id.component';

describe('ViewTicketUserIdComponent', () => {
  let component: ViewTicketUserIdComponent;
  let fixture: ComponentFixture<ViewTicketUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTicketUserIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
