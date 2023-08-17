import { Component, Input } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { RecordsService } from '../../shared/records.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent {
  record: any;
  id: number;

  constructor(private recordsService: RecordsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecordId();
    console.log(this.id);
    this.getRecord(this.id);
  }

  getRecordId() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  getRecord(id) {
    this.record = this.recordsService.getRecord(id);
    console.log(this.record);
  }
}


