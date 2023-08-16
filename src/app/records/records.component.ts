import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Record } from '../shared/record.model';
import { RecordsService } from '../shared/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  records: Record[];
  subscription: Subscription;

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.subscription = this.recordsService.recordsChanged
      .subscribe(
        (records: Record[]) => {
          this.records = records;
        }
      )
    this.records = this.recordsService.getRecords();
  }

}
