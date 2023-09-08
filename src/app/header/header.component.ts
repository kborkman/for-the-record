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
  redirectPath: string;
  topic: string = 'search';
  offset: number = 0;
  limit: number = 16;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.tokenCreate();
    this.initForm();
  }

  async tokenCreate() {
    try {
      const results = await this.apiService.tokenCreate();
      if (results !== undefined && results !== null) {
        this.accessToken = results;
      }
    } catch { (err => console.log(err)) };
  }

  async searchAlbums() {
    this.tokenCreate();
    try {
      const results = await this.apiService.searchMusic(this.selectedCategorySearch.value.selectedCategory, this.offset, this.limit, this.accessToken);
      if (results !== undefined && results !== null) {
        this.searchResults = results;
      }
    } catch { err => console.log(err) };
  }

  onSubmit() {
    this.searchAlbums();
    this.selectedCategorySearch.reset();
    document.querySelector('.see-more').classList.remove('hidden');
  }

  private initForm() {
    let selectedCategory = '';

    this.selectedCategorySearch = new FormGroup({
      'selectedCategory': new FormControl(selectedCategory, Validators.required)
    });
  }

  searchModalToggle() {
    const modalBackground = document.querySelectorAll('.modal-background, .modal-close');
    this.addToggle = !this.addToggle;
    document.querySelector('.see-more').classList.add('hidden');
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
