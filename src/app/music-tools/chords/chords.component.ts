import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Chord = {
  name: string;
  strings: Array<number | 'x' | 0>;
  fingers?: Array<number | null>;
  barre?: { fret: number; fromString: number; toString: number } | null;
};

@Component({
  standalone: true,
  selector: 'app-chords',
  imports: [CommonModule],
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.css'],
})
export class ChordsComponent {
  chords: Chord[] = [
    {
      name: 'C',
      strings: ['x', 3, 2, 0, 1, 0],
      fingers: [null, 3, 2, null, 1, null],
    },
    {
      name: 'G',
      strings: [3, 2, 0, 0, 3, 3],
      fingers: [2, 1, null, null, 3, 4],
    },
    {
      name: 'D',
      strings: ['x', 'x', 0, 2, 3, 2],
      fingers: [null, null, null, 1, 3, 2],
    },
    {
      name: 'Em',
      strings: [0, 2, 2, 0, 0, 0],
      fingers: [null, 2, 3, null, null, null],
    },
    {
      name: 'Am',
      strings: ['x', 0, 2, 2, 1, 0],
      fingers: [null, null, 2, 3, 1, null],
    },
    {
      name: 'F',
      strings: [1, 3, 3, 2, 1, 1],
      fingers: [1, 3, 4, 2, 1, 1],
      barre: { fret: 1, fromString: 6, toString: 1 },
    },
  ];
  maxFret = 4;
  getTopFret(chord: Chord) {
    const nums = chord.strings.filter(
      (s) => typeof s === 'number' && s > 0
    ) as number[];
    return nums.length ? Math.max(...nums) : 1;
  }

isNumber(value: any): value is number {
  return typeof value === 'number';
}

  getCircleYPosition(s: number | 'x' | 0): number {
    if (typeof s === 'number') {
      return (s - 0.5) * 20;
    }
    return 0; // fallback for non-number values
  }
}
