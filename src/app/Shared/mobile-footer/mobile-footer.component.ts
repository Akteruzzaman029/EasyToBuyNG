import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-footer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './mobile-footer.component.html',
  styleUrl: './mobile-footer.component.scss'
})
export class MobileFooterComponent {

}
