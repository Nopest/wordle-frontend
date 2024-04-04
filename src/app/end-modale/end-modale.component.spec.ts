import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndModaleComponent } from './end-modale.component';

describe('EndModaleComponent', () => {
  let component: EndModaleComponent;
  let fixture: ComponentFixture<EndModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndModaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
