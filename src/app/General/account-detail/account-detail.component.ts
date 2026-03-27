import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent {
  accountForm!: FormGroup;
  years: number[] = [];
  submitted = false;

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1950; i--) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [{ value: '8801511521015', disabled: true }],
      gender: [''],
      birthYear: ['']
    });
  }

  onSave() {
    this.submitted = true;
    if (this.accountForm.valid) {
      console.log('Form Submitted!', this.accountForm.value);
    }
  }
}
