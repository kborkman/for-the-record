import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
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
  accessToken: string;
  selectedCategorySearch: FormGroup;
  searchResults: any;
  faMagnifying = faMagnifyingGlass;
  category: string = 'album';
  redirectPath: string;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.tokenCreate();
    this.initForm();
  }

  async tokenCreate() {
    try {
      const results = await this.apiService.tokenCreate();
      console.log(results);

      if (results !== undefined && results !== null) {
        this.accessToken = results;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async searchAlbums() {
    this.tokenCreate();
    let response = await fetch('https://api.spotify.com/v1/search?q=' + this.selectedCategorySearch.value.selectedCategory + '&type=' + this.category + '&offset=0', {
      method: 'GET',
      headers: {
        'Authorization': this.accessToken
      }
    });
    let json = await response.json();
    console.log(json);
    if (this.category === 'album') {
      this.redirectPath = 'records';
      if (json.albums.items) {
        return this.searchResults = json.albums.items;
      }
    } else if (this.category === 'artist') {
      console.log(json.artists);
      this.redirectPath = 'artists';
      if (json.artists.items) {
        return this.searchResults = json.artists.items;
      }
    }
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
