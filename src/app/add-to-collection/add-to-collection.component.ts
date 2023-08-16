import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.scss']
})
export class AddToCollectionComponent {
  addToggle: boolean = false;

  modalToggle() {
    const modalBackground = document.querySelectorAll('.modal-background');
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
