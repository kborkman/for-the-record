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
  tracks: any = [
    {
      'name': 'Thunder Road',
      'length': '6:02'
    },
    {
      'name': 'Tenth Avenue Freeze-Out',
      'length': '3:03'
    },
    {
      'name': 'Night',
      'length': '3:01'
    },
    {
      'name': 'Backstreets',
      'length': '6:30'
    },
    {
      'name': 'Born to Run',
      'length': '4:29'
    },
    {
      'name': 'Shes the One',
      'length': '6:44'
    },
    {
      'name': 'Meeting Across the River',
      'length': '3:19'
    },
    {
      'name': 'Jungleland',
      'length': '9:59'
    }
  ]

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


