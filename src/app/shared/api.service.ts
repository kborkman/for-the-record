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
  albumDetails: any;

  constructor(public route: ActivatedRoute) { }

  // tokenCreate(id: string) {
  //   fetch('https://accounts.spotify.com/api/token', this.httpOptions)
  //     .then(result => result.json())
  //     .then(data => this.getToken(data.access_token, id));
  // }

  async tokenCreate() {
    let response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
    });
    let json = await response.json();
    this.accessToken = 'Bearer ' + json.access_token;
    return this.accessToken;
  }

  async getRecordSpotify(id: string) {
    let response = await fetch('https://api.spotify.com/v1/albums/' + id, {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    });
    return await response.json();
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
