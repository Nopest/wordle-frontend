import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingZoneComponent } from './playing-zone.component';

describe('PlayingZoneComponent', () => {
  let component: PlayingZoneComponent;
  let fixture: ComponentFixture<PlayingZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayingZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
