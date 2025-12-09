import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugSupporterComponent } from './debug-supporter.component';

describe('DebugSupporterComponent', () => {
  let component: DebugSupporterComponent;
  let fixture: ComponentFixture<DebugSupporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugSupporterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugSupporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
