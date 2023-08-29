import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  id: string;
  accessToken: string;
  clientId: string = '98a85a2d677c4f67bd41a54b92bb98a5';
  clientSecret: string = '091159f6fec54d8db2fc858f49991140';
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
  httpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
  }
  albumDetails: any;

  constructor(public route: ActivatedRoute) { }

  getRecordId() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  tokenCreate(id: string) {
    fetch('https://accounts.spotify.com/api/token', this.httpOptions)
      .then(result => result.json())
      .then(data => this.getToken(data.access_token, id));
  }

  getToken(data: string, id: string) {
    this.accessToken = 'Bearer ' + data;
    this.getRecordSpotify(id);
  }

  getRecordSpotify(id: string) {
    fetch('https://api.spotify.com/v1/albums/' + id, {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    })
      .then(result => result.json())
      .then(data => {
        this.artistId = data.artists[0].id;
        console.log(this.artistId);
        this.getArtistAlbums(this.artistId, this.accessToken);
        this.getArtist(this.artistId, this.accessToken);
        // this.isImgLoaded = true;
        return this.albumDetails = data;
      });
  }

  getArtistAlbums(id: string, token: string) {
    fetch('https://api.spotify.com/v1/artists/' + id + '/albums?include_groups=album&offset=' + this.albumsOffset + '&limit=' + this.albumsLimit + '&locale=en-US,en;q=0.9', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
      .then(result => result.json())
      .then(data => {
        this.artistsAlbums = data.items;
        console.log(this.artistsAlbums);
        if (this.albumDetails.tracks.items.trackTotal) {
          this.addTrackTime();
        }
        return this.artistsAlbums;
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
