import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../counter.action';
import { Observable } from 'rxjs';
import { counterFeature } from '../counter.feature';
import { fromFeature } from '../../from/from.feature';
import { resetFrom, updateFromField } from '../../from/from.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counter$!: Observable<number>;
  from$!: Observable<{ name: string; email: string }>;

  constructor(private store: Store) {
    this.counter$ = this.store.select(counterFeature.selectCounterState);
    this.from$ = this.store.select(fromFeature.selectFromState);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }


  updateFromField(field: 'name' | 'email', value: any) {
    this.store.dispatch(updateFromField({ field, value: value?.target.value }));
  }

  resetFrom() {
    this.store.dispatch(resetFrom()); 
  }


}
