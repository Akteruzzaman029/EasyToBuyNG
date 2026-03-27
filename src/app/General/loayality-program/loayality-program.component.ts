import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loayality-program',
  standalone: true,
  imports: [],
  templateUrl: './loayality-program.component.html',
  styleUrl: './loayality-program.component.scss'
})
export class LoayalityProgramComponent {
  constructor(private router: Router) { }

  goToEvouchers() {
    this.router.navigate(['/account/e-vouchers']);
  }
}
