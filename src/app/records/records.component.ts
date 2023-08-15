import { Component, OnInit } from '@angular/core';

import { Record } from '../shared/record.model';
import { RecordsService } from './records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  records: Record[];

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.records = this.recordsService.getRecords();
  }

}
