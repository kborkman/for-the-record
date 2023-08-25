import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'for-the-record';
  clientId: string = '98a85a2d677c4f67bd41a54b92bb98a5';
  clientSecret: string = '091159f6fec54d8db2fc858f49991140';
  accessToken: string;
  albumSearch: FormGroup;
  searchResults: any;
  faMagnifying = faMagnifyingGlass;

  httpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.tokenCreate();
    this.initForm();
  }

  tokenCreate() {
    fetch('https://accounts.spotify.com/api/token', this.httpOptions)
      .then(result => result.json())
      .then(data => this.getToken(data.access_token));
  }

  getToken(data: string) {
    this.accessToken = 'Bearer ' + data;
    return this.accessToken;
  }

  searchAlbums() {
    this.tokenCreate();
    fetch('https://api.spotify.com/v1/search?q=' + this.albumSearch.value.album + '&type=album&album&limit=9', {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(data.albums.items);
        return this.searchResults = data.albums.items;
      });
  }

  onSubmit() {
    this.searchAlbums();
  }

  albumSelect() {
    this.searchResults = [];
    this.albumSearch.reset();
  }

  private initForm() {
    let album = '';

    this.albumSearch = new FormGroup({
      'album': new FormControl(album, Validators.required)
    });
  }

  // postData() {
  //   this.http.post('https://accounts.spotify.com/api/token', this.httpOptions)
  //     .subscribe(token => {
  //       console.log(token);
  //     });
  // }
}
