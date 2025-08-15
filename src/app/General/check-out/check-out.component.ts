import { Component } from '@angular/core';
import { AddToCartItemComponent } from "../add-to-cart-item/add-to-cart-item.component";

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [AddToCartItemComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {

}
