import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../../Shared/pagination/pagination.component';

@Component({
  selector: 'app-order-delivery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './order-delivery.component.html',
  styleUrl: './order-delivery.component.scss',
  providers: [DatePipe],
})
export class OrderDeliveryComponent {}
