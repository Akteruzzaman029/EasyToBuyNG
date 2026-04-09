import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.action';

export const initialState = 0;

// Reducer function to handle state changes based on dispatched actions
export const reducer = createReducer(
  initialState,

  // Define handlers for each action type
  on(increment, (state) => state + 1), // Increment the counter
  on(decrement, (state) => state - 1), // Decrement the counter
  on(reset, () => initialState), // Reset the counter to initial state
);
