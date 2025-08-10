import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-timer',
  imports: [CommonModule, FormsModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  running = false;
  startTime = 0;
  elapsed = 0;
  intervalId: any = null;

  countdownSeconds = 60;
  remaining = 0;
  countdownRunning = false;
  countdownId: any = null;

  format(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h ? h + ':' : ''}${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  startStopwatch() {
    if (this.running) { this.pauseStopwatch(); return; }
    this.running = true;
    this.startTime = performance.now() - this.elapsed;
    this.intervalId = setInterval(() => {
      this.elapsed = performance.now() - this.startTime;
    }, 100);
  }
  pauseStopwatch() {
    this.running = false;
    if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
  }
  resetStopwatch() {
    this.pauseStopwatch();
    this.elapsed = 0;
  }

  startCountdown() {
    if (this.countdownRunning) { this.stopCountdown(); return; }
    this.remaining = this.countdownSeconds;
    this.countdownRunning = true;
    this.countdownId = setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) {
        this.stopCountdown();
        alert('Countdown finished');
      }
    }, 1000);
  }
  stopCountdown() {
    this.countdownRunning = false;
    if (this.countdownId) { clearInterval(this.countdownId); this.countdownId = null; }
  }
  resetCountdown() {
    this.stopCountdown();
    this.remaining = this.countdownSeconds;
  }
}
