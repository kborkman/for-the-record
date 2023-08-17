import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RecordsService } from '../shared/records.service';
import { Record } from '../shared/record.model';

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.scss']
})
export class AddToCollectionComponent {
  addToggle: boolean = false;
  record: Record;
  recordForm: FormGroup;

  constructor(private recordService: RecordsService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.recordService.addRecord(this.recordForm.value);
    this.addToggle = false;
  }

  modalToggle() {
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

  private initForm() {
    let artist = '';
    let record = '';
    let year = '';
    let imagePath = '';

    this.recordForm = new FormGroup({
      'artist': new FormControl(artist, Validators.required),
      'album': new FormControl(record, Validators.required),
      'year': new FormControl(year, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
    });
  }
}
