import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingZoneComponent } from './playing-zone/playing-zone.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayingZoneComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'wordle-angular';
}
