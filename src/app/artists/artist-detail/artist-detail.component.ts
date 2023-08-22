import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from 'src/app/shared/records.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent {
  record: any;
  id: number;
  artistAlbums: any = [
    {
      'name': 'Greetings From Asbury Park',
      'year': '1973'
    },
    {
      'name': 'The Wild the Innocent & the E-Street Shuffle',
      'year': '1973'
    },
    {
      'name': 'Darkness on the Edge of Town',
      'year': '1977'
    },
    {
      'name': 'The River',
      'year': '1980'
    },
    {
      'name': 'Nebraska',
      'year': '1982'
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
