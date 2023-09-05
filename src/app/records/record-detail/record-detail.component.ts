import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/shared/api.service';
import { Observable, map } from 'rxjs';


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
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

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
      console.log(results);

      if (results !== undefined && results !== null) {
        this.accessToken = results;
        this.getRecord();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getRecord() {
    try {
      const results = await this.apiService.getRecordSpotify(this.id);
      console.log(results);

      if (results !== undefined && results !== null) {
        this.artistId = results.artists[0].id;
        this.albumDetails = results;
        this.addTrackTime();
        this.findArtist();
        this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findArtist() {
    try {
      const results = await this.apiService.getArtist(this.artistId, this.accessToken);
      console.log(results);

      if (results !== undefined && results !== null) {
        console.log('we have an artist');
        this.artist = results;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findArtistAlbums(offset, limit) {
    try {
      const results = await this.apiService.getArtistAlbums(this.artistId, this.accessToken, offset, limit);
      // console.log(results);

      if (results !== undefined && results !== null) {
        this.artistsAlbums = results.items.filter((album) => {
          return album.name != this.albumDetails.name;
        });
        console.log(this.artistsAlbums);
      }
    } catch (err) {
      console.log(err);
    }
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

  redirectTo(uri: string, id: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri, id]));
  }

  navigateToAlbum(id: string) {
    this.redirectTo('/records', id);
  }

  seeMoreAlbums() {
    this.albumsOffset += this.albumsLimit;
    this.seeMoreAlbumsCounter++;
    this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
  }

  resetAlbums() {
    this.albumsOffset = 0;
    this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
    this.seeMoreAlbumsCounter = 0;
  }
}


