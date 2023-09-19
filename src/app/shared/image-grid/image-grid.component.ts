import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent {
  @Input() artistId: string;
  @Input() details: any;
  @Input() currentAlbums: any;
  @Input() searchValue: string;
  @Input() topic: string;
  accessToken: string;
  albumsLimit: number = 16;
  albumsOffset: number = 0;
  seeMoreAlbumsCounter: number = 0;

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.tokenCreate();
  }

  async tokenCreate() {
    try {
      const results = await this.apiService.tokenCreate();
      if (results !== undefined && results !== null) {
        this.accessToken = results;
      }
    } catch { (err => console.log(err)) };
  }

  async onSearch(offset: number, limit: number) {
    try {
      const results = await this.apiService.searchMusic(this.searchValue, offset, limit, this.accessToken);
      return this.currentAlbums = results;
    } catch { (err => console.log(err)) };
  }

  async findArtistAlbums(offset: number, limit: number) {
    try {
      const results = await this.apiService.getArtistAlbums(this.artistId, this.accessToken, offset, limit);

      if (results !== undefined && results !== null) {
        this.currentAlbums = results.items.filter((album) => {
          return album.name != this.details.name;
        });
      }
    } catch { (err => console.log(err)) };
  }

  async getNewReleases() {
    try {
      const results = await this.apiService.getNewReleases(this.accessToken, this.albumsOffset, this.albumsLimit);
      this.currentAlbums = results;
    } catch { (err => console.log(err)) };
  }

  redirectTo(uri: string, id: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri, id]));
  }

  navigateToAlbum(id: string) {
    this.redirectTo('/records', id);
    this.currentAlbums = [];
    document.querySelector('.modal').classList.remove('is-active');
    document.querySelector('.see-more').classList.remove('hidden');
  }

  seeMoreAlbums() {
    this.albumsOffset += this.albumsLimit;
    this.seeMoreAlbumsCounter++;
    if (this.topic === 'search') {
      this.onSearch(this.albumsOffset, this.albumsLimit);
    } else if (this.topic === 'new') {
      this.getNewReleases();
    } else {
      this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
    }
  }

  resetAlbums() {
    this.albumsOffset = 0;
    if (this.topic === 'search') {
      this.onSearch(this.albumsOffset, this.albumsLimit);
    } else if (this.topic === 'new') {
      this.getNewReleases();
    } else {
      this.findArtistAlbums(this.albumsOffset, this.albumsLimit);
    }
    this.seeMoreAlbumsCounter = 0;
  }
}
