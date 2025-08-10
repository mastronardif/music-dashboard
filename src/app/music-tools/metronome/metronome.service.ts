import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetronomeService {
  private audioCtx!: AudioContext;
  private nextNoteTime = 0;
  private tempo = 120;
  private lookahead = 25.0; // ms
  private scheduleAheadTime = 0.1; // sec
  private timerID: any = null;
  private isRunning$ = new BehaviorSubject<boolean>(false);
  isRunning = this.isRunning$.asObservable();

  private gain = 0.5;
  private beatsPerMeasure = 4;
  private subdivision = 1;
  private beatCounter = 0;

  constructor() {}

  private initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setTempo(bpm: number) { this.tempo = Math.max(20, Math.min(300, Math.round(bpm))); }
  setBeatsPerMeasure(b: number) { this.beatsPerMeasure = Math.max(1, Math.round(b)); }
  setSubdivision(s: number) { this.subdivision = Math.max(1, Math.round(s)); }
  setVolume(v: number) { this.gain = Math.max(0, Math.min(1, v)); }
  getCurrentTempo() { return this.tempo; }

  start() {
    this.initAudio();
    if (this.timerID) return;
    this.nextNoteTime = this.audioCtx.currentTime + 0.05;
    this.beatCounter = 0;
    this.timerID = setInterval(() => this.scheduler(), this.lookahead);
    this.isRunning$.next(true);
  }

  stop() {
    if (this.timerID) { clearInterval(this.timerID); this.timerID = null; }
    this.isRunning$.next(false);
  }

  private scheduler() {
    while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
      this.scheduleClick(this.nextNoteTime, (this.beatCounter % this.beatsPerMeasure) === 0);
      const secondsPerBeat = 60.0 / this.tempo;
      this.nextNoteTime += secondsPerBeat / this.subdivision;
      this.beatCounter++;
    }
  }

  private scheduleClick(time: number, isAccent: boolean) {
    const osc = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = isAccent ? 1000 : 800;
    g.gain.value = this.gain * (isAccent ? 1.0 : 0.6);
    osc.connect(g);
    g.connect(this.audioCtx.destination);
    const duration = 0.05;
    osc.start(time);
    osc.stop(time + duration);
  }
}
