import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { RecordsService } from '../shared/records.service';
import { Record } from '../shared/record.model';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {
  records: Record[];
  subscription: Subscription;

  constructor(
    private recordsService: RecordsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.recordsService.recordsChanged
      .subscribe(
        (records: Record[]) => {
          this.records = records;
        }
      )
    this.records = this.recordsService.getRecords();
  }

  onDelete(i) {
    this.recordsService.deleteRecord(i);
  }
}
