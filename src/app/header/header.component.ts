import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faSearch = faSearch;
  addToggle: boolean = false;
  title: string = 'for-the-record';
  clientId: string = '98a85a2d677c4f67bd41a54b92bb98a5';
  clientSecret: string = '091159f6fec54d8db2fc858f49991140';
  accessToken: string;
  selectedCategorySearch: FormGroup;
  searchResults: any;
  faMagnifying = faMagnifyingGlass;
  category: string = 'album';
  redirectPath: string;

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
    fetch('https://api.spotify.com/v1/search?q=' + this.selectedCategorySearch.value.selectedCategory + '&type=' + this.category, {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    })
      .then(result => result.json())
      .then(data => {
        if (this.category === 'album') {
          this.redirectPath = 'records';
          return this.searchResults = data.albums.items;
        } else if (this.category === 'artist') {
          console.log(data.artists);
          this.redirectPath = 'artists';
          return this.searchResults = data.artists.items;
        }
        // console.log(data);
        // return this.searchResults = data.albums.items;
      });
  }

  onSubmit() {
    this.searchAlbums();
    this.selectedCategorySearch.reset();
  }

  private initForm() {
    let selectedCategory = '';

    this.selectedCategorySearch = new FormGroup({
      'selectedCategory': new FormControl(selectedCategory, Validators.required)
    });
  }

  redirectTo(uri: string, id: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri, id]));
  }

  navigateToAlbum(id: string) {
    console.log(this.redirectPath);
    this.redirectTo(this.redirectPath, id);
    this.addToggle = !this.addToggle;
    this.searchResults = [];
    console.log(this.searchResults);
  }

  onCategorySelect(e) {
    const children = Array.from(e.target.parentNode.children);
    const target = e.target;
    this.category = target.innerText.toLowerCase();

    children.forEach(button => {
      if (button instanceof HTMLElement) {
        const classList = button.classList;
        classList.remove('is-active');
        target.classList.add('is-active');
      }
      // button.classList.contains('is-active').remove('is-active');
    });
    console.log(this.category);
    return this.category;
  }

  searchModalToggle() {
    const modalBackground = document.querySelectorAll('.modal-background, .modal-close');
    this.addToggle = !this.addToggle;
    if (this.addToggle) {
      modalBackground.forEach((close) => {
        const target = close.closest('.modal');

        close.addEventListener('click', () => {
          target.classList.remove('is-active');
          this.addToggle = false;
        });
      });
    }
  }
}
