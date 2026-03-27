import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-address.component.html',
  styleUrl: './my-address.component.scss'
})
export class MyAddressComponent {
  showAddressForm: boolean = false;

  onAddAddressClick() {
    this.showAddressForm = true;
  }

  onCloseForm() {
    this.showAddressForm = false;
  }
}
