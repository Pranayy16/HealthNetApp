import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutbreakComponent } from './outbreak-component';

describe('OutbreakComponent', () => {
  let component: OutbreakComponent;
  let fixture: ComponentFixture<OutbreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutbreakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutbreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
