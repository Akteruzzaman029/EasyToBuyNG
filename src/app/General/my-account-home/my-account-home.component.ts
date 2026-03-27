import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-account-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './my-account-home.component.html',
  styleUrl: './my-account-home.component.scss'
})
export class MyAccountHomeComponent {
  constructor(private route: Router) { }
  
  logOut() {
    localStorage.clear();
    this.route.navigate(["/"]);
  }
}
