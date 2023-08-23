import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

  httpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.tokenCreate();
  }

  tokenCreate() {
    fetch('https://accounts.spotify.com/api/token', this.httpOptions)
      .then(result => result.json())
      .then(data => this.getToken(data.access_token));
  }

  getToken(data) {
    this.accessToken = 'Bearer ' + data;
    return this.accessToken;
  }

  // postData() {
  //   this.http.post('https://accounts.spotify.com/api/token', this.httpOptions)
  //     .subscribe(token => {
  //       console.log(token);
  //     });
  // }
}
