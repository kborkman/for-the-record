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

  // tokenCreate(id: string) {
  //   fetch('https://accounts.spotify.com/api/token', this.httpOptions)
  //     .then(result => result.json())
  //     .then(data => this.getToken(data.access_token, id));
  // }

  async tokenCreate() {
    let response = await fetch('https://accounts.spotify.com/api/token', this.httpOptions);
    let json = await response.json();
    this.accessToken = 'Bearer ' + json.access_token;
    return this.accessToken;
  }

  // getToken(data: string, id: string) {
  //   this.accessToken = 'Bearer ' + data;
  //   console.log(this.accessToken);
  //   this.getRecordSpotify(id);
  // }

  async getRecordSpotify(id: string) {
    let response = await fetch('https://api.spotify.com/v1/albums/' + id, {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    });
    return await response.json();
    // this.artistId = json.artists[0].id;
    // console.log(this.artistId);
    // this.getArtistAlbums(this.artistId, this.accessToken);
    // this.getArtist(this.artistId, this.accessToken);
    // this.isImgLoaded = true;
  }


  async getArtistAlbums(id: string, token: string, offset: number, limit: number) {
    console.log(`id = ${id} and token = ${token}`);
    let response = await fetch('https://api.spotify.com/v1/artists/' + id + '/albums?include_groups=album&offset=' + offset + '&limit=' + limit + '&locale=en-US,en;q=0.9', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    return await response.json();
  }

  async getArtist(id: string, token: string) {
    let response = await fetch('https://api.spotify.com/v1/artists/' + id, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    return await response.json();
  }
}
