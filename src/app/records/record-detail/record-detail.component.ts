import { Component, Input } from '@angular/core';
import { Record } from 'src/app/shared/record.model';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent {
  @Input() record: Record;
}
