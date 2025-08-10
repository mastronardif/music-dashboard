import { Component } from '@angular/core';
import { MetronomeComponent } from './music-tools/metronome/metronome.component';
import { TimerComponent } from './music-tools/timer/timer.component';
import { ChordsComponent } from './music-tools/chords/chords.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MetronomeComponent, TimerComponent, ChordsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Music Dashboard';
}
