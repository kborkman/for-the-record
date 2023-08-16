import { Component, Input } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { RecordsService } from '../../shared/records.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent {
  @Input() record: Record;
  @Input() index: number;

  constructor(private recordsService: RecordsService) { }

  onDelete(i) {
    this.recordsService.deleteRecord(i);
  }
}


