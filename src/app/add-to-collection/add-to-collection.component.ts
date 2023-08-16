import { Component } from '@angular/core';
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

  constructor(private recordService: RecordsService) {

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

  addRecordSubmit() {
    // this.record = this.recordService.addRecord();
  }
}
