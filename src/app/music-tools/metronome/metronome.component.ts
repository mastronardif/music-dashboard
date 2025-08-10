import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MetronomeService } from './metronome.service';

@Component({
  standalone: true,
  selector: 'app-metronome',
  imports: [CommonModule, FormsModule],
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent {
  bpm = 120;
  beatsPerMeasure = 4;
  subdivision = 1;
  volume = 0.5;
  running = false;

  constructor(private met: MetronomeService) {}

  toggle() {
    if (!this.running) {
      this.met.setTempo(this.bpm);
      this.met.setBeatsPerMeasure(this.beatsPerMeasure);
      this.met.setSubdivision(this.subdivision);
      this.met.setVolume(this.volume);
      this.met.start();
      this.running = true;
    } else {
      this.met.stop();
      this.running = false;
    }
  }

  onBpmChange() { this.met.setTempo(this.bpm); }
  onBeatsChange() { this.met.setBeatsPerMeasure(this.beatsPerMeasure); }
  onSubdivisionChange() { this.met.setSubdivision(this.subdivision); }
  onVolumeChange() { this.met.setVolume(this.volume); }
}
