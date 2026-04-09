import { createFeature } from "@ngrx/store";
import { reducer } from "./from.reducer";



export const fromFeature = createFeature({
  name: 'from',
  reducer,
});