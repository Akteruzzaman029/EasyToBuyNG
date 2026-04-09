import { createFeature } from "@ngrx/store";
import { reducer } from "./category.reducer";

export const categoryTreeFeature = createFeature({
  name: 'categorytree',
  reducer,  
});

