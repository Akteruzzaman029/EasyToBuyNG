import { createFeature } from "@ngrx/store";
import { reducer } from "./counter.reducer";

export const counterFeature = createFeature({
    name:'counter',
    reducer
});