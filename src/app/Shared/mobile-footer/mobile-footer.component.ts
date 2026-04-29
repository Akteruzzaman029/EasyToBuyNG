import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonHelper } from '../Service/common-helper.service';

@Component({
  selector: 'app-mobile-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mobile-footer.component.html',
  styleUrl: './mobile-footer.component.scss',
})
export class MobileFooterComponent implements OnInit {
  @Input() cartItemsCount: number = 0;

  ngOnInit(): void {}
  
  reditect() {
    debugger
    CommonHelper.CommonButtonClick('offcanvasButton');
  }
}
