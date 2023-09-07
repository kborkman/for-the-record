import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { ApiService } from 'src/app/shared/api.service';


@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent {
  record: any;
  id: string;
  accessToken: string;
  faCheck = faCheck;
  artistId: string;
  artistsAlbums: any;
  artist: any;
  trackTotal: number = 0;
  hours: number;
  minutes: any;
  seconds: any;
  albumsLimit: number = 16;
  albumsOffset: number = 0;
  seeMoreAlbumsCounter: number = 0;
  isImgLoaded: boolean = false;
  albumDetails: any;
  noMoreAlbums: boolean = false;
  apiAlbums: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecordId();
    this.tokenCreate();
  }

  getRecordId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async tokenCreate() {
    try {
      const results = await this.apiService.tokenCreate();
      if (results !== undefined && results !== null) {
        this.accessToken = results;
        this.getRecord();
      }
    } catch { (err => console.log(err)) };
  }

  async getRecord() {
    try {
      const results = await this.apiService.getRecordSpotify(this.id);
      if (results !== undefined && results !== null) {
        this.artistId = results.artists[0].id;
        this.albumDetails = results;
        this.addTrackTime();
        this.findArtist();
        this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
      }
    } catch { (err => console.log(err)) };
  }

  async findArtist() {
    try {
      const results = await this.apiService.getArtist(this.artistId, this.accessToken);
      if (results !== undefined && results !== null) {
        this.artist = results;
      }
    } catch { (err => console.log(err)) };
  }

  async findArtistAlbums(offset, limit) {
    try {
      const results = await this.apiService.getArtistAlbums(this.artistId, this.accessToken, offset, limit);
      if (results !== undefined && results !== null) {
        this.artistsAlbums = results.items.filter((album) => {
          return album.name != this.albumDetails.name;
        });
      }
    } catch { (err => console.log(err)) };
  }

  addTrackTime() {
    this.trackTotal = this.albumDetails.tracks.items.reduce((acc: number, track: any) => acc + track.duration_ms, 0);
    this.hours = Math.floor(this.trackTotal / (1000 * 60 * 60));
    this.minutes = Math.floor((this.trackTotal % (1000 * 60 * 60)) / (1000 * 60));
    if (this.minutes < 10) {
      this.minutes = this.minutes.toString().padStart(2, '0');
    }
    this.seconds = Math.floor((this.trackTotal % (1000 * 60)) / 1000);
    if (this.seconds < 10) {
      this.seconds = this.seconds.toString().padStart(2, '0');
    }
  }
}


