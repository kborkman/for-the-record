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
      '1975',
      1
    ),
    new Record(
      'Bob Dylan',
      'Blonde on Blonde',
      'https://theband.hiof.no/band_pictures/blonde_on_blonde.jpg',
      '1966',
      2
    ),
    new Record(
      'The National',
      'Alligator',
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/TheNationalAlligator.gif/220px-TheNationalAlligator.gif',
      '2005',
      3
    ),
    new Record(
      'Titus Andronicus',
      'The Monitor',
      'https://upload.wikimedia.org/wikipedia/en/6/68/Titus_andronicus_The_Monitor_album_cover.jpg',
      '2010',
      4
    ),
    new Record(
      'Modest Mouse',
      'The Moon and Antarctica',
      'https://upload.wikimedia.org/wikipedia/en/0/00/TheMoonAntarctica.jpg',
      '2000',
      5
    ),
    new Record(
      'Kendrick Lamar',
      'To Pimp a Butterfly',
      'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=465&dpr=1&s=none',
      '2015',
      6
    )
  ];

  constructor() { }

  addRecord(record: Record) {
    this.records.push(record);
    this.recordsChanged.next(this.records.slice());
  }

  getRecords() {
    return this.records.slice();
  }

  getRecord(id: number) {
    return this.records[id - 1];
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }
}
