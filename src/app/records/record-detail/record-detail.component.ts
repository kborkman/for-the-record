import { Component, Input } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { RecordsService } from '../../shared/records.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent {
  record: any;
  id: string;
  accessToken: string;
  clientId: string = '98a85a2d677c4f67bd41a54b92bb98a5';
  clientSecret: string = '091159f6fec54d8db2fc858f49991140';
  faCheck = faCheck;
  artistId: string;
  artistsAlbums: any;
  artist: any;
  trackTotal: number = 0;
  hours: number;
  minutes: number;
  seconds: number;
  httpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
  }
  albumDetails: any;

  constructor(private recordsService: RecordsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecordId();
    this.tokenCreate();
    // this.getRecordSpotify(this.id);
    // this.getArtistAlbums(this.artistId, this.accessToken);
  }

  getRecordId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  // getRecord(id: string) {
  //   this.record = this.recordsService.getRecord(id);
  // }

  tokenCreate() {
    fetch('https://accounts.spotify.com/api/token', this.httpOptions)
      .then(result => result.json())
      .then(data => this.getToken(data.access_token));
  }

  getToken(data: string) {
    this.accessToken = 'Bearer ' + data;
    this.getRecordSpotify(this.id, this.accessToken);
  }

  getRecordSpotify(id: string, token: string) {
    fetch('https://api.spotify.com/v1/albums/' + id, {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(this.accessToken);
        this.artistId = data.artists[0].id;
        this.getArtistAlbums(this.artistId, this.accessToken);
        this.getArtist(this.artistId, this.accessToken);
        return this.albumDetails = data;
      });
  }

  getArtistAlbums(id: string, token: string) {
    fetch('https://api.spotify.com/v1/artists/' + id + '/albums', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(data);
        this.addTrackTime();
        return this.artistsAlbums = data;
      });
  }

  getArtist(id: string, token: string) {
    fetch('https://api.spotify.com/v1/artists/' + id, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(data);
        return this.artist = data;
      });
  }

  addTrackTime() {
    this.trackTotal = this.albumDetails.tracks.items.reduce((acc, track) => acc + track.duration_ms, 0);
    this.hours = Math.floor(this.trackTotal / (1000 * 60 * 60));
    this.minutes = Math.floor((this.trackTotal % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.trackTotal % (1000 * 60)) / 1000);
  }
}


