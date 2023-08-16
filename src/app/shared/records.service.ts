import { Injectable } from '@angular/core';

import { Record } from './record.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  recordsChanged = new Subject<Record[]>;

  private records: Record[] = [
    new Record(
      'Bruce Springsteen',
      'Born to Run',
      'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Born_to_Run_%28Front_Cover%29.jpg/220px-Born_to_Run_%28Front_Cover%29.jpg',
      '1975'
    ),
    new Record(
      'Bob Dylan',
      'Blonde on Blonde',
      'https://theband.hiof.no/band_pictures/blonde_on_blonde.jpg',
      '1966'
    ),
    new Record(
      'The National',
      'Alligator',
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/TheNationalAlligator.gif/220px-TheNationalAlligator.gif',
      '2005'
    ),
    new Record(
      'Bruce Springsteen',
      'Born to Run',
      'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Born_to_Run_%28Front_Cover%29.jpg/220px-Born_to_Run_%28Front_Cover%29.jpg',
      '1975'
    ),
    new Record(
      'Bob Dylan',
      'Blonde on Blonde',
      'https://theband.hiof.no/band_pictures/blonde_on_blonde.jpg',
      '1966'
    ),
    new Record(
      'The National',
      'Alligator',
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/TheNationalAlligator.gif/220px-TheNationalAlligator.gif',
      '2005'
    )
  ];

  constructor() { }

  addRecord(
    artist,
    album,
    year,
    imagePath
  ) {
    this.records.push(
      artist,
      album,
      year,
      imagePath
    );
    this.recordsChanged.next(this.records.slice());
  }

  getRecords() {
    return this.records.slice();
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }
}
