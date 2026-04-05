import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../../Shared/pagination/pagination.component';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss',
    providers: [DatePipe]
})
export class OrderTrackingComponent {

}
