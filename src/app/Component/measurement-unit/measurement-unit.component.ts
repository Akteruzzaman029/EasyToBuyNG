import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';

@Component({
  selector: 'app-measurement-unit',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './measurement-unit.component.html',
  styleUrl: './measurement-unit.component.scss',
    providers: [DatePipe]
})
export class MeasurementUnitComponent {

}
