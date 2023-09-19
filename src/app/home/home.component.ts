import { Component } from '@angular/core';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faPersonChalkboard = faPersonChalkboard;
  accessToken: string;
  newAlbums: any;
  albumsLimit: number = 16;
  albumsOffset: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.tokenCreate();
  }

  async tokenCreate() {
    try {
      const results = await this.apiService.tokenCreate();
      if (results !== undefined && results !== null) {
        this.accessToken = results;
        console.log(this.accessToken);
        this.getNewReleases(this.accessToken);
      }
    } catch { (err => console.log(err)) };
  }

  async getNewReleases(token) {
    try {
      const results = await this.apiService.getNewReleases(token, this.albumsOffset, this.albumsLimit);
      this.newAlbums = results;
    } catch { (err => console.log(err)) };
  }

}
