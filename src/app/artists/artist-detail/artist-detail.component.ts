import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordsService } from 'src/app/shared/records.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent {
  record: any;
  id: string;
  accessToken: string;
  artist: any;
  artistsAlbums: any;
  clientId: string = '98a85a2d677c4f67bd41a54b92bb98a5';
  clientSecret: string = '091159f6fec54d8db2fc858f49991140';
  faCheck = faCheck;
  albumsLimit: number = 16;
  albumsOffset: number = 0;
  seeMoreAlbumsCounter: number = 0;
  noMoreAlbums: boolean = false;

  httpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getId();
    this.tokenCreate();
  }

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async tokenCreate() {
    try {
      const results = await this.apiService.tokenCreate();
      console.log(results);

      if (results !== undefined && results !== null) {
        this.accessToken = results;
        this.findArtist();
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async getRecord() {
  //   try {
  //     const results = await this.apiService.getRecordSpotify(this.id);
  //     console.log(results);

  //     if (results !== undefined && results !== null) {
  //       this.artistId = results.artists[0].id;
  //       this.albumDetails = results;
  //       this.addTrackTime();
  //       this.findArtist();
  //       this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async findArtist() {
    try {
      const results = await this.apiService.getArtist(this.id, this.accessToken);
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
      const results = await this.apiService.getArtistAlbums(this.id, this.accessToken, offset, limit);
      console.log(results);

      if (results !== undefined && results !== null) {
        this.artistsAlbums = results;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // getRecordSpotify(id: string, token: string) {
  //   fetch('https://api.spotify.com/v1/albums/' + id, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': this.accessToken
  //     }
  //   })
  //     .then(result => result.json())
  //     .then(data => {
  //       this.artistId = data.artists[0].id;
  //       this.getArtistAlbums(this.artistId, this.accessToken);
  //       this.getArtist(this.artistId, this.accessToken);
  //       this.isImgLoaded = true;
  //       return this.albumDetails = data;
  //     });
  // }

  // getArtistAlbums(id: string, token: string) {
  //   fetch('https://api.spotify.com/v1/artists/' + id + '/albums?include_groups=album&offset=' + this.albumsOffset + '&limit=' + this.albumsLimit + '&locale=en-US,en;q=0.9', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': token
  //     }
  //   })
  //     .then(result => result.json())
  //     .then(data => {
  //       this.artistsAlbums = data.items;
  //       console.log(this.artistsAlbums);
  //       // this.addTrackTime();
  //       return this.artistsAlbums;
  //     });
  // }

  // getArtist(id: string, token: string) {
  //   fetch('https://api.spotify.com/v1/artists/' + id, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': token
  //     }
  //   })
  //     .then(result => result.json())
  //     .then(data => {
  //       console.log(data);
  //       return this.artist = data;
  //     });
  // }

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
