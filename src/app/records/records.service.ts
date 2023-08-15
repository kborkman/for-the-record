import { Injectable } from '@angular/core';

import { Record } from '../shared/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

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
    )
  ];

  constructor() { }

  getRecords() {
    return this.records.slice();
  }
}
